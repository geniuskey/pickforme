/**
 * Import scraped products to Supabase
 * 스크래핑한 상품을 Supabase에 자동 업로드
 *
 * Usage:
 *   npm run import:products
 *   npx tsx scripts/import-products.ts --file=output/products-2024-01-01.json
 */

import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'
import * as dotenv from 'dotenv'

// .env.local 로드
dotenv.config({ path: '.env.local' })
dotenv.config({ path: '.env' })

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('Missing Supabase credentials in .env.local')
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

interface ScrapedProduct {
  name: string
  price: number
  originalPrice?: number
  imageUrl: string
  productUrl: string
  productId: string
  isRocket: boolean
  isFreeShipping: boolean
  rating?: number
  reviewCount?: number
  category: string
}

function generateTags(product: ScrapedProduct): string[] {
  const tags: string[] = []
  const nameLower = product.name.toLowerCase()

  if (product.price < 50000) tags.push('budget')
  else if (product.price < 150000) tags.push('mid_range')
  else if (product.price < 300000) tags.push('premium')
  else tags.push('luxury')

  if (product.isRocket) tags.push('fast_delivery', 'rocket')
  if (product.isFreeShipping) tags.push('free_shipping')

  if (nameLower.includes('삼성') || nameLower.includes('samsung')) tags.push('samsung')
  if (nameLower.includes('lg') || nameLower.includes('엘지')) tags.push('lg')
  if (nameLower.includes('샤오미') || nameLower.includes('xiaomi')) tags.push('xiaomi')
  if (nameLower.includes('스마트') || nameLower.includes('앱')) tags.push('smart')
  if (nameLower.includes('무소음') || nameLower.includes('저소음')) tags.push('quiet')
  if (nameLower.includes('대용량')) tags.push('large_capacity')
  if (nameLower.includes('소형') || nameLower.includes('미니')) tags.push('compact')

  return [...new Set(tags)]
}

async function getCategories(): Promise<Map<string, string>> {
  const { data, error } = await supabase
    .from('categories')
    .select('id, slug')

  if (error) {
    console.error('Error fetching categories:', error)
    return new Map()
  }

  return new Map(data.map(c => [c.slug, c.id]))
}

async function importProducts(products: ScrapedProduct[]): Promise<void> {
  console.log(`\nImporting ${products.length} products to Supabase...`)

  // 카테고리 ID 맵 가져오기
  const categoryMap = await getCategories()
  console.log(`Found ${categoryMap.size} categories`)

  // 기존 상품 비활성화
  const { error: deactivateError } = await supabase
    .from('products')
    .update({ is_active: false })
    .eq('is_active', true)

  if (deactivateError) {
    console.error('Error deactivating products:', deactivateError)
  } else {
    console.log('Deactivated existing products')
  }

  // 카테고리별로 그룹화
  const productsByCategory = products.reduce((acc, p) => {
    if (!acc[p.category]) acc[p.category] = []
    acc[p.category].push(p)
    return acc
  }, {} as Record<string, ScrapedProduct[]>)

  let totalImported = 0
  let totalErrors = 0

  for (const [category, categoryProducts] of Object.entries(productsByCategory)) {
    const categoryId = categoryMap.get(category)

    if (!categoryId) {
      console.log(`⚠️ Category not found: ${category} (${categoryProducts.length} products skipped)`)
      continue
    }

    console.log(`\nImporting ${categoryProducts.length} products for ${category}...`)

    // 배치 처리 (10개씩)
    const batchSize = 10
    for (let i = 0; i < categoryProducts.length; i += batchSize) {
      const batch = categoryProducts.slice(i, i + batchSize)

      const insertData = batch.map((product, index) => ({
        category_id: categoryId,
        name: product.name,
        price: product.price,
        image_url: product.imageUrl,
        coupang_url: product.productUrl,
        coupang_product_id: product.productId,
        tags: generateTags(product),
        is_active: true,
        is_rocket: product.isRocket,
        rating: product.rating || null,
        review_count: product.reviewCount || null,
        display_order: i + index + 1,
      }))

      const { data, error } = await supabase
        .from('products')
        .insert(insertData as any)
        .select('id')

      if (error) {
        console.error(`Error inserting batch:`, error.message)
        totalErrors += batch.length
      } else {
        totalImported += data?.length || 0
        process.stdout.write('.')
      }
    }

    console.log(` ✓ ${category} done`)
  }

  console.log(`\n=== Import Complete ===`)
  console.log(`✓ Imported: ${totalImported}`)
  console.log(`✗ Errors: ${totalErrors}`)
}

async function main(): Promise<void> {
  const args = process.argv.slice(2)
  const fileArg = args.find(a => a.startsWith('--file='))?.split('=')[1]

  // 파일 경로 결정
  let jsonPath: string

  if (fileArg) {
    jsonPath = path.resolve(fileArg)
  } else {
    // 가장 최근 파일 찾기
    const outputDir = path.join(process.cwd(), 'scripts', 'output')

    if (!fs.existsSync(outputDir)) {
      console.error('No output directory found. Run scraping first:')
      console.error('  npm run scrape')
      process.exit(1)
    }

    const files = fs.readdirSync(outputDir)
      .filter(f => f.endsWith('.json'))
      .sort()
      .reverse()

    if (files.length === 0) {
      console.error('No JSON files found. Run scraping first:')
      console.error('  npm run scrape')
      process.exit(1)
    }

    jsonPath = path.join(outputDir, files[0])
  }

  console.log(`Reading: ${jsonPath}`)

  if (!fs.existsSync(jsonPath)) {
    console.error(`File not found: ${jsonPath}`)
    process.exit(1)
  }

  const content = fs.readFileSync(jsonPath, 'utf-8')
  const products: ScrapedProduct[] = JSON.parse(content)

  console.log(`Found ${products.length} products in file`)

  await importProducts(products)
}

main().catch(error => {
  console.error('Fatal error:', error)
  process.exit(1)
})
