/**
 * Naver Shopping API를 사용한 상품 수집
 * - 네이버 API로 상품 정보 수집
 * - 쿠팡 검색 링크 자동 생성
 * - Supabase에 직접 업로드
 *
 * Usage:
 *   npm run fetch:naver
 *   npx tsx scripts/fetch-products-naver.ts --category=humidifier
 */

import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })
dotenv.config({ path: '.env' })

const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID
const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

// 카테고리별 검색 키워드
const CATEGORY_KEYWORDS: Record<string, { keywords: string[]; nameKo: string }> = {
  'humidifier': {
    keywords: ['가습기', '스마트 가습기', '초음파 가습기'],
    nameKo: '가습기',
  },
  'air-fryer': {
    keywords: ['에어프라이어', '대용량 에어프라이어'],
    nameKo: '에어프라이어',
  },
  'air-purifier': {
    keywords: ['공기청정기', '헤파 공기청정기'],
    nameKo: '공기청정기',
  },
  'bluetooth-earphone': {
    keywords: ['블루투스 이어폰', '무선 이어폰 노이즈캔슬링'],
    nameKo: '블루투스 이어폰',
  },
  'robot-vacuum': {
    keywords: ['로봇청소기', '물걸레 로봇청소기'],
    nameKo: '로봇청소기',
  },
}

interface NaverProduct {
  title: string
  link: string
  image: string
  lprice: string
  hprice: string
  mallName: string
  productId: string
  productType: string
  brand: string
  maker: string
  category1: string
  category2: string
  category3: string
  category4: string
}

interface ProcessedProduct {
  name: string
  brand: string
  price: number
  imageUrl: string
  naverUrl: string
  coupangSearchUrl: string
  mallName: string
  category: string
  tags: string[]
}

async function searchNaverProducts(
  query: string,
  display: number = 20
): Promise<NaverProduct[]> {
  if (!NAVER_CLIENT_ID || !NAVER_CLIENT_SECRET) {
    console.error('Naver API credentials not found in .env.local')
    console.error('Required: NAVER_CLIENT_ID, NAVER_CLIENT_SECRET')
    return []
  }

  const url = `https://openapi.naver.com/v1/search/shop.json?query=${encodeURIComponent(query)}&display=${display}&sort=sim`

  try {
    const response = await fetch(url, {
      headers: {
        'X-Naver-Client-Id': NAVER_CLIENT_ID,
        'X-Naver-Client-Secret': NAVER_CLIENT_SECRET,
      },
    })

    if (!response.ok) {
      console.error(`Naver API error: ${response.status}`)
      return []
    }

    const data = await response.json()
    return data.items || []
  } catch (error) {
    console.error('Naver API request failed:', error)
    return []
  }
}

function cleanProductName(name: string): string {
  return name
    .replace(/<[^>]*>/g, '') // HTML 태그 제거
    .replace(/\s+/g, ' ')
    .trim()
}

function generateTags(product: NaverProduct, category: string): string[] {
  const tags: string[] = []
  const price = parseInt(product.lprice)
  const name = product.title.toLowerCase()

  // 가격대
  if (price < 50000) tags.push('budget')
  else if (price < 150000) tags.push('mid_range')
  else if (price < 300000) tags.push('premium')
  else tags.push('luxury')

  // 브랜드
  const brand = (product.brand || product.maker || '').toLowerCase()
  if (brand.includes('삼성') || brand.includes('samsung')) tags.push('samsung')
  if (brand.includes('lg') || brand.includes('엘지')) tags.push('lg')
  if (brand.includes('샤오미') || brand.includes('xiaomi')) tags.push('xiaomi')
  if (brand.includes('필립스') || brand.includes('philips')) tags.push('philips')
  if (brand.includes('다이슨') || brand.includes('dyson')) tags.push('dyson')
  if (brand.includes('애플') || brand.includes('apple')) tags.push('apple')
  if (brand.includes('소니') || brand.includes('sony')) tags.push('sony')

  // 기능
  if (name.includes('스마트') || name.includes('앱연동')) tags.push('smart')
  if (name.includes('저소음') || name.includes('무소음')) tags.push('quiet')
  if (name.includes('대용량')) tags.push('large_capacity')
  if (name.includes('미니') || name.includes('소형')) tags.push('compact')

  // 카테고리별 태그
  if (category === 'bluetooth-earphone') {
    if (name.includes('노이즈캔슬링') || name.includes('anc')) tags.push('anc')
    if (name.includes('오픈형')) tags.push('open_type')
  }
  if (category === 'robot-vacuum') {
    if (name.includes('물걸레')) tags.push('mop')
    if (name.includes('자동')) tags.push('auto_empty')
  }

  return [...new Set(tags)]
}

function generateCoupangSearchUrl(productName: string): string {
  // 검색어 정리 (브랜드 + 핵심 키워드만)
  const cleanName = productName
    .replace(/<[^>]*>/g, '')
    .replace(/\([^)]*\)/g, '')
    .replace(/\[[^\]]*\]/g, '')
    .replace(/[^\w\s가-힣]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .slice(0, 5) // 앞 5단어만
    .join(' ')

  return `https://www.coupang.com/np/search?q=${encodeURIComponent(cleanName)}`
}

async function processCategory(
  categorySlug: string,
  categoryInfo: { keywords: string[]; nameKo: string }
): Promise<ProcessedProduct[]> {
  console.log(`\n=== ${categoryInfo.nameKo} (${categorySlug}) ===`)

  const allProducts: ProcessedProduct[] = []
  const seenProducts = new Set<string>()

  for (const keyword of categoryInfo.keywords) {
    console.log(`Searching: ${keyword}`)
    const products = await searchNaverProducts(keyword, 15)
    console.log(`  Found ${products.length} products`)

    for (const product of products) {
      // 중복 체크 (상품명 기준)
      const cleanName = cleanProductName(product.title)
      const key = cleanName.toLowerCase().slice(0, 30)

      if (seenProducts.has(key)) continue
      seenProducts.add(key)

      allProducts.push({
        name: cleanName,
        brand: product.brand || product.maker || '',
        price: parseInt(product.lprice),
        imageUrl: product.image,
        naverUrl: product.link,
        coupangSearchUrl: generateCoupangSearchUrl(product.title),
        mallName: product.mallName,
        category: categorySlug,
        tags: generateTags(product, categorySlug),
      })
    }

    // Rate limiting
    await new Promise(r => setTimeout(r, 500))
  }

  // 가격순 정렬 후 상위 10개
  return allProducts
    .sort((a, b) => b.price - a.price) // 고가순 (다양한 가격대 포함하기 위해)
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

  // 기존 상품 비활성화
  await supabase.from('products').update({ is_active: false }).eq('is_active', true)

  console.log('\nImporting to Supabase...')

  let imported = 0
  for (const product of products) {
    const categoryId = categoryMap.get(product.category)
    if (!categoryId) continue

    const { error } = await supabase.from('products').insert({
      category_id: categoryId,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image_url: product.imageUrl,
      naver_url: product.naverUrl,
      coupang_url: product.coupangSearchUrl, // 일단 검색 URL로 저장
      tags: product.tags,
      is_active: true,
    } as any)

    if (!error) imported++
  }

  console.log(`Imported ${imported} products to Supabase`)
}

function saveToFiles(products: ProcessedProduct[]): void {
  const outputDir = path.join(process.cwd(), 'scripts', 'output')
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  const timestamp = new Date().toISOString().split('T')[0]

  // JSON 저장
  const jsonPath = path.join(outputDir, `naver-products-${timestamp}.json`)
  fs.writeFileSync(jsonPath, JSON.stringify(products, null, 2))
  console.log(`\nJSON saved: ${jsonPath}`)

  // 쿠팡 검색 링크 목록 저장 (수동 어필리에이트 링크 생성용)
  const linksContent = products
    .map(
      (p, i) =>
        `${i + 1}. ${p.name}\n` +
        `   가격: ${p.price.toLocaleString()}원\n` +
        `   쿠팡 검색: ${p.coupangSearchUrl}\n`
    )
    .join('\n')

  const linksPath = path.join(outputDir, `coupang-links-${timestamp}.txt`)
  fs.writeFileSync(linksPath, linksContent)
  console.log(`Coupang links saved: ${linksPath}`)

  // SQL 저장
  const sqlContent = generateSQL(products)
  const sqlPath = path.join(outputDir, `naver-products-${timestamp}.sql`)
  fs.writeFileSync(sqlPath, sqlContent)
  console.log(`SQL saved: ${sqlPath}`)
}

function generateSQL(products: ProcessedProduct[]): string {
  let sql = `-- Naver Shopping API Products\n-- Generated: ${new Date().toISOString()}\n\n`
  sql += `UPDATE products SET is_active = false;\n\n`

  for (const product of products) {
    const escapedName = product.name.replace(/'/g, "''")
    sql += `INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '${escapedName}', '${product.brand.replace(/'/g, "''")}', ${product.price}, '${product.imageUrl}', '${product.naverUrl}', '${product.coupangSearchUrl}', '${JSON.stringify(product.tags)}'::jsonb, true
FROM categories c WHERE c.slug = '${product.category}';\n\n`
  }

  return sql
}

async function main(): Promise<void> {
  console.log('Naver Shopping Product Fetcher')
  console.log('==============================')

  if (!NAVER_CLIENT_ID || !NAVER_CLIENT_SECRET) {
    console.error('\n❌ Naver API credentials required!')
    console.error('Add to .env.local:')
    console.error('  NAVER_CLIENT_ID=your_client_id')
    console.error('  NAVER_CLIENT_SECRET=your_client_secret')
    console.error('\nGet credentials at: https://developers.naver.com/apps/')
    process.exit(1)
  }

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

  // 파일 저장
  saveToFiles(allProducts)

  // DB 저장
  if (!skipDb) {
    await saveToSupabase(allProducts)
  }

  console.log('\n✅ Done!')
  console.log('\n📋 Next steps:')
  console.log('1. Open scripts/output/coupang-links-*.txt')
  console.log('2. Search each product on Coupang Partners')
  console.log('3. Generate affiliate links and update coupang_url in database')
}

main().catch(console.error)
