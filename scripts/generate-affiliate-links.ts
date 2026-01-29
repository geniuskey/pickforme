/**
 * 어필리에이트 링크 업데이트 도구
 *
 * 1. DB에서 상품 목록 출력
 * 2. 쿠팡 파트너스에서 링크 생성
 * 3. 생성된 링크를 CSV로 준비하여 DB 업데이트
 *
 * Usage:
 *   npx tsx scripts/generate-affiliate-links.ts export    # 상품 목록 내보내기
 *   npx tsx scripts/generate-affiliate-links.ts import    # 어필리에이트 링크 가져오기
 */

import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!
const AFFILIATE_ID = 'AF4340778'

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

const outputDir = path.join(process.cwd(), 'scripts', 'output')

async function exportProducts(): Promise<void> {
  console.log('Exporting products for affiliate link generation...\n')

  const { data: products, error } = await supabase
    .from('products')
    .select(`
      id,
      name,
      price,
      coupang_url,
      categories (slug, name_ko)
    `)
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error || !products) {
    console.error('Error fetching products:', error)
    return
  }

  console.log(`Found ${products.length} products\n`)

  // 1. 쿠팡 파트너스용 URL 목록 (복사해서 붙여넣기용)
  const urlList = products.map((p: any) => {
    // coupang_url이 검색 URL이면 그대로, 아니면 검색 쿼리 생성
    const searchQuery = encodeURIComponent(p.name.slice(0, 50))
    return `https://www.coupang.com/np/search?q=${searchQuery}`
  }).join('\n')

  const urlListPath = path.join(outputDir, 'coupang-urls-for-partners.txt')
  fs.writeFileSync(urlListPath, urlList)
  console.log(`✅ URL list saved: ${urlListPath}`)
  console.log('   → 이 URL들을 쿠팡 파트너스 "링크 생성"에 붙여넣으세요\n')

  // 2. CSV 템플릿 (어필리에이트 링크 입력용)
  const csvHeader = 'product_id,name,price,category,affiliate_url'
  const csvRows = products.map((p: any) => {
    const category = (p.categories as any)?.name_ko || ''
    const escapedName = `"${p.name.replace(/"/g, '""')}"`
    return `${p.id},${escapedName},${p.price},${category},`
  })

  const csvContent = [csvHeader, ...csvRows].join('\n')
  const csvPath = path.join(outputDir, 'affiliate-links-template.csv')
  fs.writeFileSync(csvPath, '\ufeff' + csvContent) // BOM for Excel
  console.log(`✅ CSV template saved: ${csvPath}`)
  console.log('   → 어필리에이트 링크를 마지막 컬럼에 입력하세요\n')

  // 3. 상품별 안내
  console.log('='.repeat(60))
  console.log('상품 목록 (쿠팡 파트너스에서 검색하세요)')
  console.log('='.repeat(60))

  const byCategory = products.reduce((acc: any, p: any) => {
    const cat = (p.categories as any)?.name_ko || 'Unknown'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(p)
    return acc
  }, {})

  for (const [category, prods] of Object.entries(byCategory)) {
    console.log(`\n📁 ${category}`)
    ;(prods as any[]).forEach((p, i) => {
      console.log(`   ${i + 1}. ${p.name.slice(0, 40)}... (${p.price?.toLocaleString()}원)`)
    })
  }

  console.log('\n' + '='.repeat(60))
  console.log('📋 다음 단계:')
  console.log('1. https://partners.coupang.com 로그인')
  console.log('2. "링크 생성" 메뉴 클릭')
  console.log('3. 상품 검색 후 어필리에이트 링크 생성')
  console.log('4. affiliate-links-template.csv 파일에 링크 입력')
  console.log('5. npx tsx scripts/generate-affiliate-links.ts import 실행')
  console.log('='.repeat(60))
}

async function importAffiliateLinks(): Promise<void> {
  const csvPath = path.join(outputDir, 'affiliate-links-template.csv')

  if (!fs.existsSync(csvPath)) {
    console.error(`File not found: ${csvPath}`)
    console.log('Run "export" first to generate the template.')
    return
  }

  console.log('Importing affiliate links from CSV...\n')

  const content = fs.readFileSync(csvPath, 'utf-8')
  const lines = content.split('\n').slice(1) // Skip header

  let updated = 0
  let skipped = 0

  for (const line of lines) {
    if (!line.trim()) continue

    // Parse CSV line (handle quoted fields)
    const match = line.match(/^([^,]+),"([^"]+)",([^,]+),([^,]*),(.*)$/)
    if (!match) {
      skipped++
      continue
    }

    const [, productId, , , , affiliateUrl] = match

    if (!affiliateUrl || !affiliateUrl.startsWith('http')) {
      skipped++
      continue
    }

    const { error } = await supabase
      .from('products')
      .update({ coupang_url: affiliateUrl.trim() })
      .eq('id', productId)

    if (error) {
      console.error(`Error updating ${productId}:`, error.message)
      skipped++
    } else {
      updated++
    }
  }

  console.log(`✅ Updated: ${updated} products`)
  console.log(`⏭️  Skipped: ${skipped} (no affiliate URL)`)
}

// Quick update - 단일 상품 업데이트
async function updateSingle(productId: string, affiliateUrl: string): Promise<void> {
  const { error } = await supabase
    .from('products')
    .update({ coupang_url: affiliateUrl })
    .eq('id', productId)

  if (error) {
    console.error('Error:', error.message)
  } else {
    console.log('✅ Updated successfully')
  }
}

async function main(): Promise<void> {
  const command = process.argv[2]

  switch (command) {
    case 'export':
      await exportProducts()
      break
    case 'import':
      await importAffiliateLinks()
      break
    case 'update':
      const productId = process.argv[3]
      const url = process.argv[4]
      if (!productId || !url) {
        console.log('Usage: npx tsx scripts/generate-affiliate-links.ts update <product_id> <affiliate_url>')
        return
      }
      await updateSingle(productId, url)
      break
    default:
      console.log('Coupang Affiliate Link Generator')
      console.log(`Partner ID: ${AFFILIATE_ID}\n`)
      console.log('Commands:')
      console.log('  export  - Export products for affiliate link generation')
      console.log('  import  - Import affiliate links from CSV')
      console.log('  update <id> <url> - Update single product')
  }
}

main().catch(console.error)
