/**
 * Coupang Product Scraper
 * 쿠팡 상품 자동 수집 스크립트
 *
 * Usage:
 *   npx ts-node scripts/scrape-coupang.ts
 *   npx ts-node scripts/scrape-coupang.ts --category=humidifier
 *   npx ts-node scripts/scrape-coupang.ts --keyword="가습기 추천"
 */

import puppeteer, { Browser, Page } from 'puppeteer'
import * as fs from 'fs'
import * as path from 'path'

// 어필리에이트 ID
const AFFILIATE_ID = 'AF4340778'

// 카테고리별 검색 키워드
const CATEGORY_KEYWORDS: Record<string, string[]> = {
  'humidifier': ['가습기 추천 2024', '가습기 인기순위'],
  'air-fryer': ['에어프라이어 추천 2024', '에어프라이어 인기순위'],
  'air-purifier': ['공기청정기 추천 2024', '공기청정기 인기순위'],
  'bluetooth-earphone': ['블루투스 이어폰 추천 2024', '무선이어폰 인기'],
  'robot-vacuum': ['로봇청소기 추천 2024', '로봇청소기 인기순위'],
}

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

async function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function scrapeSearchResults(page: Page, keyword: string, category: string): Promise<ScrapedProduct[]> {
  const products: ScrapedProduct[] = []

  try {
    // 쿠팡 검색 페이지로 이동
    const searchUrl = `https://www.coupang.com/np/search?component=&q=${encodeURIComponent(keyword)}&channel=user`
    console.log(`Searching: ${keyword}`)

    // 타임아웃 늘리고 domcontentloaded로 변경
    await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 60000 })
    await delay(3000)

    // 페이지 로드 대기
    await page.waitForSelector('li.search-product, .search-content, #productList', { timeout: 15000 }).catch(() => {})

    // 디버깅: 페이지 상태 확인
    const pageTitle = await page.title()
    console.log(`  Page title: ${pageTitle}`)

    // 디버깅용 스크린샷 저장
    const screenshotPath = path.join(process.cwd(), 'scripts', 'output', `debug-${category}.png`)
    await page.screenshot({ path: screenshotPath, fullPage: false })

    // 스크롤하여 더 많은 상품 로드
    await autoScroll(page)
    await delay(2000)

    // 상품 목록 추출 (여러 셀렉터 시도)
    const items = await page.evaluate(() => {
      // 다양한 셀렉터 시도
      let productElements = document.querySelectorAll('li.search-product')
      if (productElements.length === 0) {
        productElements = document.querySelectorAll('[class*="search-product"]')
      }
      if (productElements.length === 0) {
        productElements = document.querySelectorAll('.search-content li')
      }
      if (productElements.length === 0) {
        productElements = document.querySelectorAll('#productList li')
      }

      console.log(`Found ${productElements.length} product elements`)

      const results: any[] = []

      productElements.forEach((el, index) => {
        if (index >= 20) return // 최대 20개

        // 다양한 셀렉터로 이름 찾기
        const nameEl = el.querySelector('.name, .product-name, [class*="name"], dt, .title')
        // 가격 셀렉터
        const priceEl = el.querySelector('.price-value, .price, [class*="price"]:not([class*="base"]), strong em')
        const originalPriceEl = el.querySelector('.base-price, [class*="base-price"], del')
        // 이미지 셀렉터
        const imageEl = el.querySelector('img') as HTMLImageElement
        // 링크 셀렉터
        const linkEl = el.querySelector('a[href*="products"], a[href*="vp/"]') as HTMLAnchorElement

        if (nameEl && linkEl) {
          const href = linkEl.getAttribute('href') || ''
          const productIdMatch = href.match(/products\/(\d+)/)

          const priceText = priceEl?.textContent?.replace(/[^0-9]/g, '') || '0'
          const price = parseInt(priceText) || 0

          if (price > 0) {
            results.push({
              name: nameEl.textContent?.trim() || '',
              price: price,
              originalPrice: originalPriceEl ? parseInt(originalPriceEl.textContent?.replace(/[^0-9]/g, '') || '0') : undefined,
              imageUrl: imageEl?.src || imageEl?.getAttribute('data-img-src') || imageEl?.getAttribute('data-src') || '',
              productUrl: href.startsWith('http') ? href : `https://www.coupang.com${href}`,
              productId: productIdMatch ? productIdMatch[1] : '',
              isRocket: !!el.querySelector('[class*="rocket"], [class*="Rocket"]'),
              isFreeShipping: !!el.querySelector('[class*="free-shipping"], [class*="free-delivery"]'),
              rating: 0,
              reviewCount: 0,
            })
          }
        }
      })

      return results
    })

    // 카테고리 정보 추가
    items.forEach(item => {
      if (item.productId) {
        products.push({
          ...item,
          category,
        })
      }
    })

    console.log(`Found ${products.length} products for "${keyword}"`)

  } catch (error) {
    console.error(`Error scraping "${keyword}":`, error)
  }

  return products
}

async function autoScroll(page: Page): Promise<void> {
  await page.evaluate(async () => {
    await new Promise<void>((resolve) => {
      let totalHeight = 0
      const distance = 500
      const maxScrolls = 5
      let scrollCount = 0

      const timer = setInterval(() => {
        window.scrollBy(0, distance)
        totalHeight += distance
        scrollCount++

        if (scrollCount >= maxScrolls || totalHeight >= document.body.scrollHeight) {
          clearInterval(timer)
          resolve()
        }
      }, 300)
    })
  })
}

function generateTags(product: ScrapedProduct): string[] {
  const tags: string[] = []
  const nameLower = product.name.toLowerCase()

  // 가격대 태그
  if (product.price < 50000) tags.push('budget')
  else if (product.price < 150000) tags.push('mid_range')
  else if (product.price < 300000) tags.push('premium')
  else tags.push('luxury')

  // 배송 태그
  if (product.isRocket) tags.push('fast_delivery', 'rocket')
  if (product.isFreeShipping) tags.push('free_shipping')

  // 브랜드/특성 감지
  if (nameLower.includes('삼성') || nameLower.includes('samsung')) tags.push('samsung')
  if (nameLower.includes('lg') || nameLower.includes('엘지')) tags.push('lg')
  if (nameLower.includes('샤오미') || nameLower.includes('xiaomi')) tags.push('xiaomi')
  if (nameLower.includes('필립스') || nameLower.includes('philips')) tags.push('philips')
  if (nameLower.includes('애플') || nameLower.includes('apple')) tags.push('apple')
  if (nameLower.includes('소니') || nameLower.includes('sony')) tags.push('sony')

  // 기능 태그
  if (nameLower.includes('스마트') || nameLower.includes('smart') || nameLower.includes('앱')) tags.push('smart')
  if (nameLower.includes('무소음') || nameLower.includes('저소음') || nameLower.includes('quiet')) tags.push('quiet')
  if (nameLower.includes('대용량') || nameLower.includes('대형')) tags.push('large_capacity')
  if (nameLower.includes('소형') || nameLower.includes('미니') || nameLower.includes('컴팩트')) tags.push('compact')
  if (nameLower.includes('프리미엄') || nameLower.includes('프로')) tags.push('premium')

  return [...new Set(tags)] // 중복 제거
}

function generateSQL(products: ScrapedProduct[]): string {
  const productsByCategory = products.reduce((acc, p) => {
    if (!acc[p.category]) acc[p.category] = []
    acc[p.category].push(p)
    return acc
  }, {} as Record<string, ScrapedProduct[]>)

  let sql = `-- Auto-generated Coupang Products
-- Generated at: ${new Date().toISOString()}
-- Affiliate ID: ${AFFILIATE_ID}

-- 기존 상품 비활성화
UPDATE products SET is_active = false;

`

  for (const [category, categoryProducts] of Object.entries(productsByCategory)) {
    sql += `-- =============================================\n`
    sql += `-- ${category} (${categoryProducts.length} products)\n`
    sql += `-- =============================================\n`

    for (const product of categoryProducts) {
      const tags = generateTags(product)
      const escapedName = product.name.replace(/'/g, "''")

      sql += `INSERT INTO products (category_id, name, price, image_url, coupang_url, coupang_product_id, tags, is_active, is_rocket, rating, review_count)
SELECT c.id, '${escapedName}', ${product.price}, '${product.imageUrl}', '${product.productUrl}', '${product.productId}', '${JSON.stringify(tags)}'::jsonb, true, ${product.isRocket}, ${product.rating || 'NULL'}, ${product.reviewCount || 'NULL'}
FROM categories c WHERE c.slug = '${category}';

`
    }
  }

  sql += `-- 결과 확인
SELECT c.name_ko, COUNT(*) as count
FROM products p
JOIN categories c ON p.category_id = c.id
WHERE p.is_active = true
GROUP BY c.name_ko;`

  return sql
}

function generateJSON(products: ScrapedProduct[]): string {
  return JSON.stringify(products, null, 2)
}

async function main() {
  const args = process.argv.slice(2)
  const categoryArg = args.find(a => a.startsWith('--category='))?.split('=')[1]
  const keywordArg = args.find(a => a.startsWith('--keyword='))?.split('=')[1]

  console.log('Starting Coupang scraper...')
  console.log(`Affiliate ID: ${AFFILIATE_ID}`)

  // headless: false로 설정하면 브라우저가 보이며 봇 탐지 우회 가능
  const isHeadless = process.argv.includes('--headless')

  const browser: Browser = await puppeteer.launch({
    headless: isHeadless,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu',
      '--window-size=1920,1080',
      '--disable-blink-features=AutomationControlled',
      '--disable-infobars',
      '--start-maximized',
    ],
  })

  console.log(`Browser mode: ${isHeadless ? 'headless' : 'visible'}`)

  const page = await browser.newPage()

  // User agent 설정 (봇 감지 우회)
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')
  await page.setViewport({ width: 1920, height: 1080 })

  // 봇 탐지 우회
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => false })
    Object.defineProperty(navigator, 'plugins', { get: () => [1, 2, 3, 4, 5] })
    Object.defineProperty(navigator, 'languages', { get: () => ['ko-KR', 'ko', 'en-US', 'en'] })
  })

  const allProducts: ScrapedProduct[] = []

  try {
    if (keywordArg) {
      // 단일 키워드 검색
      const products = await scrapeSearchResults(page, keywordArg, 'custom')
      allProducts.push(...products)
    } else {
      // 카테고리별 검색
      const categories = categoryArg ? [categoryArg] : Object.keys(CATEGORY_KEYWORDS)

      for (const category of categories) {
        const keywords = CATEGORY_KEYWORDS[category]
        if (!keywords) {
          console.log(`Unknown category: ${category}`)
          continue
        }

        console.log(`\n=== Processing category: ${category} ===`)

        for (const keyword of keywords) {
          const products = await scrapeSearchResults(page, keyword, category)
          allProducts.push(...products)
          await delay(3000) // Rate limiting
        }
      }
    }

    // 중복 제거 (productId 기준)
    const uniqueProducts = Array.from(
      new Map(allProducts.map(p => [p.productId, p])).values()
    )

    console.log(`\n=== Total unique products: ${uniqueProducts.length} ===`)

    // 파일 저장
    const outputDir = path.join(process.cwd(), 'scripts', 'output')
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    const timestamp = new Date().toISOString().split('T')[0]

    // SQL 파일 저장
    const sqlContent = generateSQL(uniqueProducts)
    const sqlPath = path.join(outputDir, `products-${timestamp}.sql`)
    fs.writeFileSync(sqlPath, sqlContent)
    console.log(`SQL saved to: ${sqlPath}`)

    // JSON 파일 저장
    const jsonContent = generateJSON(uniqueProducts)
    const jsonPath = path.join(outputDir, `products-${timestamp}.json`)
    fs.writeFileSync(jsonPath, jsonContent)
    console.log(`JSON saved to: ${jsonPath}`)

  } catch (error) {
    console.error('Scraping error:', error)
  } finally {
    await browser.close()
  }
}

main().catch(console.error)
