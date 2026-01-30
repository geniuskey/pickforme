/**
 * AliExpress 상품 수집 스크립트
 *
 * Usage:
 *   npm run fetch:ali
 *   npm run fetch:ali -- --category=humidifier
 */

import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const ALI_APP_KEY = process.env.ALIEXPRESS_APP_KEY
const ALI_APP_SECRET = process.env.ALIEXPRESS_APP_SECRET
const ALI_TRACKING_ID = process.env.ALIEXPRESS_TRACKING_ID

// Dynamic import for aliexpress module
async function getAliModule() {
  return await import('../src/lib/platforms/aliexpress')
}

interface ProcessedProduct {
  name: string
  price: number
  originalPrice: number
  imageUrl: string
  affiliateUrl: string
  productId: string
  discount: number
  orders: number
  category: string
  tags: string[]
}

// 카테고리별 검색 키워드
const CATEGORY_KEYWORDS: Record<string, { keywords: string[]; nameKo: string }> = {
  'humidifier': {
    keywords: ['humidifier', 'ultrasonic humidifier', 'smart humidifier'],
    nameKo: '가습기',
  },
  'air-fryer': {
    keywords: ['air fryer', 'oil free fryer', 'electric air fryer'],
    nameKo: '에어프라이어',
  },
  'air-purifier': {
    keywords: ['air purifier', 'HEPA air purifier', 'home air cleaner'],
    nameKo: '공기청정기',
  },
  'earbuds': {
    keywords: ['bluetooth earbuds', 'TWS earphones', 'wireless earbuds ANC'],
    nameKo: '블루투스 이어폰',
  },
  'robot-vacuum': {
    keywords: ['robot vacuum', 'robot vacuum mop', 'smart vacuum cleaner'],
    nameKo: '로봇청소기',
  },
}

function generateTags(product: any, category: string): string[] {
  const tags: string[] = []
  const price = product.salePrice || product.price || 0

  // 가격대 (원화 기준)
  if (price < 30000) tags.push('budget')
  else if (price < 100000) tags.push('mid_range')
  else if (price < 300000) tags.push('premium')
  else tags.push('luxury')

  // 할인
  if (product.discount > 30) tags.push('big_sale')
  if (product.discount > 0) tags.push('on_sale')

  // 인기
  if (product.orders > 1000) tags.push('bestseller')
  if (product.orders > 100) tags.push('popular')

  // 해외직구
  tags.push('aliexpress', 'overseas')

  return [...new Set(tags)]
}

async function processCategory(
  categorySlug: string,
  categoryInfo: { keywords: string[]; nameKo: string }
): Promise<ProcessedProduct[]> {
  console.log(`\n=== ${categoryInfo.nameKo} (${categorySlug}) ===`)

  const ali = await getAliModule()
  const allProducts: ProcessedProduct[] = []
  const seenProducts = new Set<string>()

  for (const keyword of categoryInfo.keywords) {
    console.log(`Searching: ${keyword}`)

    const result = await ali.searchAliProducts(keyword, {
      pageSize: 10,
      sort: 'LAST_VOLUME_DESC',
    })

    if (!result) {
      console.log('  No results')
      continue
    }

    console.log(`  Found ${result.products.length} products`)

    for (const product of result.products) {
      if (seenProducts.has(product.productId)) continue
      seenProducts.add(product.productId)

      allProducts.push({
        name: product.productTitle,
        price: product.salePrice,
        originalPrice: product.originalPrice,
        imageUrl: product.imageUrl,
        affiliateUrl: product.affiliateUrl,
        productId: product.productId,
        discount: product.discount,
        orders: product.orders,
        category: categorySlug,
        tags: generateTags(product, categorySlug),
      })
    }

    // Rate limiting
    await new Promise(r => setTimeout(r, 1000))
  }

  // 주문 많은 순으로 정렬 후 상위 10개
  return allProducts
    .sort((a, b) => b.orders - a.orders)
    .slice(0, 10)
}

async function saveToSupabase(products: ProcessedProduct[]): Promise<void> {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    console.log('\nSupabase credentials not found. Skipping database import.')
    return
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

  // 카테고리 ID 가져오기
  const { data: categories } = await supabase.from('categories').select('id, slug')
  const categoryMap = new Map(categories?.map(c => [c.slug, c.id]) || [])

  console.log('\nImporting to Supabase...')

  let imported = 0
  let errors: string[] = []

  for (const product of products) {
    const categoryId = categoryMap.get(product.category)
    if (!categoryId) {
      errors.push(`Category not found: ${product.category}`)
      continue
    }

    const { error } = await supabase.from('products').insert({
      category_id: categoryId,
      name: product.name,
      price: Math.round(product.price),
      image_url: product.imageUrl,
      coupang_url: product.affiliateUrl, // aliexpress URL을 coupang_url 필드에 저장
      elevenst_url: product.affiliateUrl, // 또는 별도 필드
      tags: [...product.tags, 'aliexpress'],
      is_active: true,
    } as any)

    if (error) {
      errors.push(`${product.name.slice(0, 30)}: ${error.message}`)
    } else {
      imported++
    }
  }

  console.log(`Imported ${imported} products to Supabase`)
  if (errors.length > 0) {
    console.log(`Errors: ${errors.length}`)
    errors.slice(0, 3).forEach(e => console.log(`  - ${e}`))
  }
}

function saveToFiles(products: ProcessedProduct[]): void {
  const outputDir = path.join(process.cwd(), 'scripts', 'output')
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  const timestamp = new Date().toISOString().split('T')[0]

  // JSON 저장
  const jsonPath = path.join(outputDir, `ali-products-${timestamp}.json`)
  fs.writeFileSync(jsonPath, JSON.stringify(products, null, 2))
  console.log(`\nJSON saved: ${jsonPath}`)

  // 상품 목록
  const listContent = products
    .map((p, i) =>
      `${i + 1}. ${p.name.slice(0, 50)}\n` +
      `   💰 ${p.price.toLocaleString()}원 (${p.discount}% 할인)\n` +
      `   📦 ${p.orders.toLocaleString()}개 판매\n` +
      `   🔗 ${p.affiliateUrl}\n`
    )
    .join('\n')

  const listPath = path.join(outputDir, `ali-products-${timestamp}.txt`)
  fs.writeFileSync(listPath, listContent)
  console.log(`Product list saved: ${listPath}`)
}

async function main(): Promise<void> {
  console.log('AliExpress Product Fetcher')
  console.log('=' .repeat(50))

  if (!ALI_APP_KEY || !ALI_APP_SECRET) {
    console.error('\n❌ AliExpress API credentials required!')
    console.error('Add to .env.local:')
    console.error('  ALIEXPRESS_APP_KEY=your_app_key')
    console.error('  ALIEXPRESS_APP_SECRET=your_app_secret')
    console.error('  ALIEXPRESS_TRACKING_ID=your_tracking_id')
    console.error('\nGet credentials at: https://portals.aliexpress.com')
    process.exit(1)
  }

  console.log(`Tracking ID: ${ALI_TRACKING_ID}`)

  const args = process.argv.slice(2)
  const categoryArg = args.find(a => a.startsWith('--category='))?.split('=')[1]
  const skipDb = args.includes('--skip-db')

  const categoriesToProcess = categoryArg
    ? { [categoryArg]: CATEGORY_KEYWORDS[categoryArg] }
    : CATEGORY_KEYWORDS

  const allProducts: ProcessedProduct[] = []

  for (const [slug, info] of Object.entries(categoriesToProcess)) {
    if (!info) {
      console.log(`Unknown category: ${slug}`)
      continue
    }
    const products = await processCategory(slug, info)
    allProducts.push(...products)
  }

  console.log(`\n=== Total: ${allProducts.length} products ===`)

  saveToFiles(allProducts)

  if (!skipDb) {
    await saveToSupabase(allProducts)
  }

  console.log('\n✅ Done!')
}

main().catch(console.error)
