// Coupang Partners API Integration
// Documentation: https://partners.coupang.com

import crypto from 'crypto'

const COUPANG_ACCESS_KEY = process.env.COUPANG_ACCESS_KEY
const COUPANG_SECRET_KEY = process.env.COUPANG_SECRET_KEY
const COUPANG_VENDOR_ID = process.env.COUPANG_VENDOR_ID || ''

const COUPANG_DOMAIN = 'https://api-gateway.coupang.com'

export interface CoupangProduct {
  productId: string
  productName: string
  productPrice: number
  productImage: string
  productUrl: string
  categoryName: string
  rank: number
  isRocket: boolean
  isFreeShipping: boolean
}

export interface CoupangDeepLink {
  originalUrl: string
  shortenUrl: string
  landingUrl: string
}

/**
 * Generate HMAC signature for Coupang API
 */
function generateHmacSignature(
  method: string,
  url: string,
  secretKey: string,
  accessKey: string
): { authorization: string; datetime: string } {
  const datetime = new Date().toISOString().replace(/[:-]|\.\d{3}/g, '').slice(0, 15) + 'Z'

  const message = datetime + method + url.split(COUPANG_DOMAIN)[1]?.split('?')[0] || url

  const signature = crypto
    .createHmac('sha256', secretKey)
    .update(message)
    .digest('hex')

  const authorization = `CEA algorithm=HmacSHA256, access-key=${accessKey}, signed-date=${datetime}, signature=${signature}`

  return { authorization, datetime }
}

/**
 * Make authenticated request to Coupang API
 */
async function coupangApiRequest<T>(
  method: string,
  endpoint: string,
  body?: object
): Promise<T | null> {
  if (!COUPANG_ACCESS_KEY || !COUPANG_SECRET_KEY) {
    console.warn('Coupang API credentials not configured')
    return null
  }

  const url = `${COUPANG_DOMAIN}${endpoint}`
  const { authorization } = generateHmacSignature(method, url, COUPANG_SECRET_KEY, COUPANG_ACCESS_KEY)

  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: authorization,
      },
      body: body ? JSON.stringify(body) : undefined,
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Coupang API error:', response.status, errorText)
      return null
    }

    return await response.json()
  } catch (error) {
    console.error('Coupang API request failed:', error)
    return null
  }
}

/**
 * Search products on Coupang
 */
export async function searchCoupangProducts(
  keyword: string,
  options?: {
    limit?: number
    subId?: string
  }
): Promise<CoupangProduct[]> {
  const { limit = 20, subId = 'pickforme' } = options || {}

  // Coupang Partners API - 상품 검색
  const endpoint = `/v2/providers/affiliate_open_api/apis/openapi/products/search?keyword=${encodeURIComponent(keyword)}&limit=${limit}&subId=${subId}`

  interface SearchResponse {
    rCode: string
    rMessage: string
    data: {
      productId: number
      productName: string
      productPrice: number
      productImage: string
      productUrl: string
      categoryName: string
      rank: number
      isRocket: boolean
      isFreeShipping: boolean
    }[]
  }

  const result = await coupangApiRequest<SearchResponse>('GET', endpoint)

  if (!result || result.rCode !== '0' || !result.data) {
    return []
  }

  return result.data.map((item) => ({
    productId: String(item.productId),
    productName: item.productName,
    productPrice: item.productPrice,
    productImage: item.productImage,
    productUrl: item.productUrl,
    categoryName: item.categoryName,
    rank: item.rank,
    isRocket: item.isRocket,
    isFreeShipping: item.isFreeShipping,
  }))
}

/**
 * Get best category products (골드박스)
 */
export async function getCoupangGoldBoxProducts(
  categoryId?: string,
  limit: number = 20
): Promise<CoupangProduct[]> {
  const endpoint = categoryId
    ? `/v2/providers/affiliate_open_api/apis/openapi/products/goldbox?categoryId=${categoryId}&limit=${limit}`
    : `/v2/providers/affiliate_open_api/apis/openapi/products/goldbox?limit=${limit}`

  interface GoldBoxResponse {
    rCode: string
    rMessage: string
    data: {
      productId: number
      productName: string
      productPrice: number
      productImage: string
      productUrl: string
      categoryName: string
      rank: number
      isRocket: boolean
      isFreeShipping: boolean
    }[]
  }

  const result = await coupangApiRequest<GoldBoxResponse>('GET', endpoint)

  if (!result || result.rCode !== '0' || !result.data) {
    return []
  }

  return result.data.map((item) => ({
    productId: String(item.productId),
    productName: item.productName,
    productPrice: item.productPrice,
    productImage: item.productImage,
    productUrl: item.productUrl,
    categoryName: item.categoryName,
    rank: item.rank,
    isRocket: item.isRocket,
    isFreeShipping: item.isFreeShipping,
  }))
}

/**
 * Convert URL to Coupang affiliate deep link
 */
export async function createCoupangDeepLink(
  originalUrl: string,
  subId?: string
): Promise<CoupangDeepLink | null> {
  const endpoint = '/v2/providers/affiliate_open_api/apis/openapi/v1/deeplink'

  interface DeepLinkResponse {
    rCode: string
    rMessage: string
    data: {
      originalUrl: string
      shortenUrl: string
      landingUrl: string
    }[]
  }

  const body = {
    coupangUrls: [originalUrl],
    subId: subId || 'pickforme',
  }

  const result = await coupangApiRequest<DeepLinkResponse>('POST', endpoint, body)

  if (!result || result.rCode !== '0' || !result.data || result.data.length === 0) {
    return null
  }

  return result.data[0]
}

/**
 * Batch convert URLs to affiliate deep links
 */
export async function createCoupangDeepLinks(
  originalUrls: string[],
  subId?: string
): Promise<CoupangDeepLink[]> {
  const endpoint = '/v2/providers/affiliate_open_api/apis/openapi/v1/deeplink'

  interface DeepLinkResponse {
    rCode: string
    rMessage: string
    data: {
      originalUrl: string
      shortenUrl: string
      landingUrl: string
    }[]
  }

  const body = {
    coupangUrls: originalUrls,
    subId: subId || 'pickforme',
  }

  const result = await coupangApiRequest<DeepLinkResponse>('POST', endpoint, body)

  if (!result || result.rCode !== '0' || !result.data) {
    return []
  }

  return result.data
}

/**
 * Get product info for display
 */
export interface CoupangProductInfo {
  name: string
  price: number
  imageUrl: string
  productUrl: string
  affiliateUrl: string
  isRocket: boolean
  isFreeShipping: boolean
  productId: string
}

export async function getCoupangProductsForCategory(
  keyword: string,
  limit: number = 10
): Promise<CoupangProductInfo[]> {
  const products = await searchCoupangProducts(keyword, { limit })

  if (products.length === 0) {
    return []
  }

  // Create affiliate links for all products
  const urls = products.map((p) => p.productUrl)
  const deepLinks = await createCoupangDeepLinks(urls)

  // Map deep links back to products
  const deepLinkMap = new Map(deepLinks.map((d) => [d.originalUrl, d]))

  return products.map((product) => {
    const deepLink = deepLinkMap.get(product.productUrl)
    return {
      name: product.productName,
      price: product.productPrice,
      imageUrl: product.productImage,
      productUrl: product.productUrl,
      affiliateUrl: deepLink?.shortenUrl || product.productUrl,
      isRocket: product.isRocket,
      isFreeShipping: product.isFreeShipping,
      productId: product.productId,
    }
  })
}
