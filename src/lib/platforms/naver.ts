// Naver Shopping API Integration

const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID
const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET

interface NaverSearchResult {
  lastBuildDate: string
  total: number
  start: number
  display: number
  items: NaverProduct[]
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

export interface NaverProductInfo {
  name: string
  price: number
  imageUrl: string
  productUrl: string
  mallName: string
  brand: string
  productId: string
}

/**
 * Search products on Naver Shopping
 */
export async function searchNaverProducts(
  query: string,
  options?: {
    display?: number
    start?: number
    sort?: 'sim' | 'date' | 'asc' | 'dsc'
  }
): Promise<NaverProductInfo[]> {
  if (!NAVER_CLIENT_ID || !NAVER_CLIENT_SECRET) {
    console.warn('Naver API credentials not configured')
    return []
  }

  const { display = 20, start = 1, sort = 'sim' } = options || {}

  try {
    const url = new URL('https://openapi.naver.com/v1/search/shop.json')
    url.searchParams.set('query', query)
    url.searchParams.set('display', display.toString())
    url.searchParams.set('start', start.toString())
    url.searchParams.set('sort', sort)

    const response = await fetch(url.toString(), {
      headers: {
        'X-Naver-Client-Id': NAVER_CLIENT_ID,
        'X-Naver-Client-Secret': NAVER_CLIENT_SECRET,
      },
    })

    if (!response.ok) {
      throw new Error(`Naver API error: ${response.status}`)
    }

    const data: NaverSearchResult = await response.json()

    return data.items.map((item) => ({
      name: item.title.replace(/<[^>]*>/g, ''), // Remove HTML tags
      price: parseInt(item.lprice, 10),
      imageUrl: item.image,
      productUrl: item.link,
      mallName: item.mallName,
      brand: item.brand,
      productId: item.productId,
    }))
  } catch (error) {
    console.error('Error searching Naver products:', error)
    return []
  }
}

/**
 * Get product details from Naver
 */
export async function getNaverProductDetails(productId: string): Promise<NaverProductInfo | null> {
  // Note: Naver doesn't have a direct product detail API in their open API
  // This would need to use web scraping or their official partner API
  console.warn('Naver product detail API requires partner access')
  return null
}

/**
 * Generate Naver affiliate link
 * Note: Requires Naver Partner registration
 */
export function generateNaverAffiliateLink(productUrl: string, affiliateId?: string): string {
  if (!affiliateId) {
    return productUrl
  }
  // Naver affiliate link format varies by partnership type
  const url = new URL(productUrl)
  url.searchParams.set('nv_mid', affiliateId)
  return url.toString()
}
