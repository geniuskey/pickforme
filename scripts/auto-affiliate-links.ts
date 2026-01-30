/**
 * 쿠팡 파트너스 어필리에이트 링크 자동 생성
 * Playwright를 사용하여 자동화
 *
 * Usage:
 *   npm run affiliate:auto           # 전체 상품 처리
 *   npm run affiliate:auto -- --test # 테스트 (1개만)
 */

import { chromium, Browser, Page, BrowserContext } from 'playwright'
import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'
import * as dotenv from 'dotenv'
import * as readline from 'readline'

dotenv.config({ path: '.env.local' })

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!
const COUPANG_PARTNERS_URL = 'https://partners.coupang.com'

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

// 사용자 데이터 디렉토리 (로그인 세션 유지)
const USER_DATA_DIR = path.join(process.cwd(), '.playwright-data')

interface Product {
  id: string
  name: string
  price: number
  coupang_url: string
}

async function prompt(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close()
      resolve(answer)
    })
  })
}

async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function getProductsToProcess(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('id, name, price, coupang_url')
    .eq('is_active', true)
    .order('created_at', { ascending: true })

  if (error || !data) {
    console.error('Error fetching products:', error)
    return []
  }

  // 이미 어필리에이트 링크가 있는 상품 제외
  return data.filter(p =>
    !p.coupang_url?.includes('link.coupang.com') &&
    !p.coupang_url?.includes('coupa.ng')
  )
}

async function updateProductUrl(productId: string, affiliateUrl: string): Promise<boolean> {
  const { error } = await supabase
    .from('products')
    .update({ coupang_url: affiliateUrl })
    .eq('id', productId)

  return !error
}

async function waitForLogin(page: Page): Promise<boolean> {
  console.log('\n🔐 쿠팡 파트너스 로그인이 필요합니다.')
  console.log('   브라우저에서 로그인해주세요...')
  console.log('   로그인 완료 후 Enter를 눌러주세요...')

  // 사용자가 Enter 누를 때까지 대기
  await prompt('')

  // 로그인 확인
  const currentUrl = page.url()
  console.log(`   현재 URL: ${currentUrl}`)

  // 로그인 페이지가 아니면 성공으로 간주
  if (!currentUrl.includes('/login') && !currentUrl.includes('/signin')) {
    console.log('✅ 로그인 완료!')
    return true
  }

  console.log('❌ 아직 로그인되지 않았습니다')
  return false
}

async function generateAffiliateLink(page: Page, productName: string): Promise<string | null> {
  try {
    // 링크 생성 페이지로 이동
    await page.goto(`${COUPANG_PARTNERS_URL}/link-generation`, { waitUntil: 'networkidle' })
    await delay(1000)

    // 검색어 입력 (상품명 앞 30자)
    const searchQuery = productName.slice(0, 30).trim()

    // 검색 입력창 찾기 (여러 셀렉터 시도)
    const searchInput = await page.$('input[type="text"], input[placeholder*="검색"], input[name*="search"], .search-input')

    if (!searchInput) {
      console.log('   ⚠️ 검색창을 찾을 수 없습니다')
      return null
    }

    await searchInput.fill(searchQuery)
    await delay(500)

    // 검색 버튼 클릭 또는 Enter
    const searchButton = await page.$('button[type="submit"], .search-button, button:has-text("검색")')
    if (searchButton) {
      await searchButton.click()
    } else {
      await searchInput.press('Enter')
    }

    await delay(2000)

    // 검색 결과에서 첫 번째 상품의 링크 생성 버튼 클릭
    const linkButton = await page.$('button:has-text("링크 생성"), .link-generate-btn, button:has-text("Link"), a:has-text("링크")')

    if (!linkButton) {
      console.log('   ⚠️ 링크 생성 버튼을 찾을 수 없습니다')
      return null
    }

    await linkButton.click()
    await delay(2000)

    // 생성된 링크 복사 (여러 방법 시도)
    // 1. 클립보드에서 가져오기
    // 2. 입력창에서 가져오기
    // 3. 텍스트에서 추출

    // 링크가 표시되는 입력창 찾기
    const linkInput = await page.$('input[readonly], input[value*="link.coupang.com"], input[value*="coupa.ng"], .generated-link input')

    if (linkInput) {
      const link = await linkInput.inputValue()
      if (link && (link.includes('link.coupang.com') || link.includes('coupa.ng'))) {
        return link
      }
    }

    // 모달이나 팝업에서 링크 찾기
    const linkText = await page.$eval(
      '[class*="link"], [class*="url"], .modal-body',
      (el) => {
        const text = el.textContent || ''
        const match = text.match(/(https?:\/\/(?:link\.coupang\.com|coupa\.ng)[^\s"'<>]+)/)
        return match ? match[1] : null
      }
    ).catch(() => null)

    if (linkText) {
      return linkText
    }

    console.log('   ⚠️ 생성된 링크를 찾을 수 없습니다')
    return null

  } catch (error) {
    console.log('   ❌ 링크 생성 실패:', (error as Error).message)
    return null
  }
}

async function manualLinkGeneration(page: Page, products: Product[]): Promise<void> {
  console.log('\n' + '='.repeat(60))
  console.log('📋 반자동 모드')
  console.log('='.repeat(60))
  console.log('\n사용 방법:')
  console.log('1. 브라우저에서 쿠팡 파트너스 "링크 생성" 페이지가 열립니다')
  console.log('2. 상품을 직접 검색하세요 (브랜드명 + 모델명 추천)')
  console.log('3. 링크 생성 후, 생성된 URL을 복사하세요')
  console.log('4. 터미널에 붙여넣고 Enter')
  console.log('5. 다음 상품으로 넘어갑니다\n')

  // 링크 생성 페이지로 이동
  await page.goto(`${COUPANG_PARTNERS_URL}`, { waitUntil: 'domcontentloaded' })
  await delay(2000)

  let saved = 0
  let skipped = 0

  for (let i = 0; i < products.length; i++) {
    const product = products[i]
    const progress = `[${i + 1}/${products.length}]`

    console.log('\n' + '-'.repeat(60))
    console.log(`${progress} 상품 정보:`)
    console.log(`   📦 ${product.name}`)
    console.log(`   💰 ${product.price?.toLocaleString()}원`)

    // 검색 힌트 (브랜드 + 핵심 단어)
    const searchHint = extractSearchKeywords(product.name)
    console.log(`   🔍 검색 힌트: ${searchHint}`)

    const answer = await prompt('\n   어필리에이트 링크 붙여넣기 (Enter=스킵, q=종료): ')

    if (answer.toLowerCase() === 'q') {
      console.log('\n작업 종료')
      break
    }

    if (answer && (answer.includes('link.coupang.com') || answer.includes('coupa.ng') || answer.includes('coupang.com'))) {
      const success = await updateProductUrl(product.id, answer.trim())
      if (success) {
        console.log('   ✅ 저장 완료!')
        saved++
      } else {
        console.log('   ❌ 저장 실패')
      }
    } else {
      console.log('   ⏭️ 건너뜀')
      skipped++
    }
  }

  console.log('\n' + '='.repeat(60))
  console.log(`완료! ✅ 저장: ${saved}개, ⏭️ 스킵: ${skipped}개`)
  console.log('='.repeat(60))
}

// 검색용 키워드 추출 (브랜드 + 핵심 단어)
function extractSearchKeywords(name: string): string {
  // 브랜드명 추출 시도
  const brands = [
    '삼성', 'LG', '샤오미', '다이슨', '필립스', '소니', '애플', '보스',
    '에코백스', '로보락', '드리미', '위닉스', '쿠쿠', '발뮤다', '신일',
    'QCY', '브리츠', '젠하이저', '에어팟', '갤럭시', '라쿠진', '스테나'
  ]

  let brand = ''
  for (const b of brands) {
    if (name.includes(b)) {
      brand = b
      break
    }
  }

  // 모델명/핵심 키워드 추출 (영문+숫자 조합)
  const modelMatch = name.match(/[A-Za-z0-9]+-?[A-Za-z0-9]+/g)
  const model = modelMatch ? modelMatch[0] : ''

  // 제품 카테고리 키워드
  const categories = ['가습기', '에어프라이어', '공기청정기', '이어폰', '로봇청소기', '청소기']
  let category = ''
  for (const c of categories) {
    if (name.includes(c)) {
      category = c
      break
    }
  }

  return [brand, model, category].filter(Boolean).join(' ') || name.slice(0, 20)
}

async function autoLinkGeneration(page: Page, products: Product[]): Promise<void> {
  console.log('\n🤖 자동 모드: 어필리에이트 링크를 자동 생성합니다\n')

  let success = 0
  let failed = 0

  for (let i = 0; i < products.length; i++) {
    const product = products[i]
    process.stdout.write(`[${i + 1}/${products.length}] ${product.name.slice(0, 35)}... `)

    const affiliateUrl = await generateAffiliateLink(page, product.name)

    if (affiliateUrl) {
      const updated = await updateProductUrl(product.id, affiliateUrl)
      if (updated) {
        console.log('✅')
        success++
      } else {
        console.log('❌ DB 저장 실패')
        failed++
      }
    } else {
      console.log('⏭️ 스킵')
      failed++
    }

    // Rate limiting
    await delay(2000)
  }

  console.log(`\n완료: ✅ ${success}개 성공, ❌ ${failed}개 실패`)
}

async function main(): Promise<void> {
  const args = process.argv.slice(2)
  const isTest = args.includes('--test')
  const isManual = args.includes('--manual')

  console.log('🚀 쿠팡 파트너스 어필리에이트 링크 자동화')
  console.log('=' .repeat(50))

  // 처리할 상품 가져오기
  let products = await getProductsToProcess()

  if (products.length === 0) {
    console.log('\n✅ 모든 상품에 어필리에이트 링크가 설정되어 있습니다!')
    return
  }

  console.log(`\n📦 처리할 상품: ${products.length}개`)

  if (isTest) {
    products = products.slice(0, 1)
    console.log('   (테스트 모드: 1개만 처리)')
  }

  // 브라우저 시작 (사용자 데이터 유지)
  const browser = await chromium.launchPersistentContext(USER_DATA_DIR, {
    headless: false, // 브라우저 보이기
    viewport: { width: 1280, height: 800 },
    args: ['--disable-blink-features=AutomationControlled'],
  })

  const page = await browser.newPage()

  try {
    // 쿠팡 파트너스 접속
    await page.goto(COUPANG_PARTNERS_URL, { waitUntil: 'networkidle' })

    // 로그인 확인 (여러 셀렉터 시도)
    await delay(2000)
    const isLoggedIn = await page.$('a[href*="logout"], button:has-text("로그아웃"), .user-menu, .gnb-user, [class*="user"], [class*="profile"], [class*="mypage"]')

    if (!isLoggedIn) {
      const loggedIn = await waitForLogin(page)
      if (!loggedIn) {
        console.log('로그인이 필요합니다. 다시 시도해주세요.')
        await browser.close()
        return
      }
    } else {
      console.log('✅ 이미 로그인되어 있습니다')
    }

    await delay(1000)

    // 링크 생성 (반자동 모드가 기본)
    await manualLinkGeneration(page, products)

  } catch (error) {
    console.error('Error:', error)
  } finally {
    console.log('\n브라우저를 닫으려면 아무 키나 누르세요...')
    await prompt('')
    await browser.close()
  }
}

main().catch(console.error)
