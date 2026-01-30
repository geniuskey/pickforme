/**
 * AliExpress Affiliate API Integration
 * https://portals.aliexpress.com
 *
 * 수수료: 3~9% (카테고리별 상이)
 * API 문서: https://developers.aliexpress.com/en/doc.htm
 */

import crypto from 'crypto'

const ALI_APP_KEY = process.env.ALIEXPRESS_APP_KEY
const ALI_APP_SECRET = process.env.ALIEXPRESS_APP_SECRET
const ALI_TRACKING_ID = process.env.ALIEXPRESS_TRACKING_ID

const API_URL = 'https://api-sg.aliexpress.com/sync'

export interface AliProduct {
  productId: string
  productTitle: string
  productUrl: string
  affiliateUrl: string
  imageUrl: string
  originalPrice: number
  salePrice: number
  currency: string
  discount: number
  shopName: string
  shopUrl: string
  commissionRate: string
  hotProductCommissionRate: string
  shippingInfo: string
  evaluateScore: string
  orders: number
}

export interface AliSearchResult {
  products: AliProduct[]
  totalCount: number
  currentPage: number
}

/**
 * Generate signature for AliExpress API
 */
function generateSignature(params: Record<string, string>, secret: string): string {
  const sortedKeys = Object.keys(params).sort()
  let signStr = secret

  for (const key of sortedKeys) {
    signStr += key + params[key]
  }
  signStr += secret

  return crypto.createHash('md5').update(signStr).digest('hex').toUpperCase()
}

/**
 * Make API request to AliExpress
 */
async function aliApiRequest<T>(method: string, params: Record<string, any>): Promise<T | null> {
  if (!ALI_APP_KEY || !ALI_APP_SECRET) {
    console.warn('AliExpress API credentials not configured')
    return null
  }

  const timestamp = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14)

  const baseParams: Record<string, string> = {
    app_key: ALI_APP_KEY,
    method,
    sign_method: 'md5',
    timestamp,
    v: '2.0',
    ...Object.fromEntries(
      Object.entries(params).map(([k, v]) => [k, String(v)])
    ),
  }

  const sign = generateSignature(baseParams, ALI_APP_SECRET)
  baseParams.sign = sign

  try {
    const queryString = new URLSearchParams(baseParams).toString()
    const response = await fetch(`${API_URL}?${queryString}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    if (!response.ok) {
      console.error('AliExpress API error:', response.status)
      return null
    }

    const data = await response.json()

    if (data.error_response) {
      console.error('AliExpress API error:', data.error_response)
      return null
    }

    return data
  } catch (error) {
    console.error('AliExpress API request failed:', error)
    return null
  }
}

/**
 * Search products on AliExpress
 */
export async function searchAliProducts(
  keyword: string,
  options?: {
    pageNo?: number
    pageSize?: number
    sort?: 'SALE_PRICE_ASC' | 'SALE_PRICE_DESC' | 'LAST_VOLUME_DESC'
    minPrice?: number
    maxPrice?: number
    shipToCountry?: string
  }
): Promise<AliSearchResult | null> {
  const {
    pageNo = 1,
    pageSize = 20,
    sort = 'LAST_VOLUME_DESC',
    minPrice,
    maxPrice,
    shipToCountry = 'KR',
  } = options || {}

  const params: Record<string, any> = {
    keywords: keyword,
    page_no: pageNo,
    page_size: pageSize,
    sort,
    target_currency: 'KRW',
    target_language: 'KO',
    ship_to_country: shipToCountry,
    tracking_id: ALI_TRACKING_ID || '',
  }

  if (minPrice) params.min_sale_price = minPrice
  if (maxPrice) params.max_sale_price = maxPrice

  interface SearchResponse {
    aliexpress_affiliate_product_query_response?: {
      resp_result?: {
        result?: {
          products?: {
            product?: any[]
          }
          total_record_count?: number
          current_page_no?: number
        }
      }
    }
  }

  const response = await aliApiRequest<SearchResponse>(
    'aliexpress.affiliate.product.query',
    params
  )

  if (!response?.aliexpress_affiliate_product_query_response?.resp_result?.result) {
    return null
  }

  const result = response.aliexpress_affiliate_product_query_response.resp_result.result
  const products = result.products?.product || []

  return {
    products: products.map((p: any) => ({
      productId: p.product_id,
      productTitle: p.product_title,
      productUrl: p.product_detail_url,
      affiliateUrl: p.promotion_link,
      imageUrl: p.product_main_image_url,
      originalPrice: parseFloat(p.original_price || '0'),
      salePrice: parseFloat(p.sale_price || '0'),
      currency: p.target_sale_price_currency || 'KRW',
      discount: parseInt(p.discount || '0'),
      shopName: p.shop_name || '',
      shopUrl: p.shop_url || '',
      commissionRate: p.commission_rate || '',
      hotProductCommissionRate: p.hot_product_commission_rate || '',
      shippingInfo: p.logistics_info_dto?.logistics_type || '',
      evaluateScore: p.evaluate_rate || '',
      orders: parseInt(p.lastest_volume || '0'),
    })),
    totalCount: result.total_record_count || 0,
    currentPage: result.current_page_no || 1,
  }
}

/**
 * Generate affiliate link for a product URL
 */
export async function generateAliAffiliateLink(
  productUrl: string
): Promise<string | null> {
  const params = {
    promotion_link_type: '0',
    source_values: productUrl,
    tracking_id: ALI_TRACKING_ID || '',
  }

  interface LinkResponse {
    aliexpress_affiliate_link_generate_response?: {
      resp_result?: {
        result?: {
          promotion_links?: {
            promotion_link?: {
              promotion_link?: string
            }[]
          }
        }
      }
    }
  }

  const response = await aliApiRequest<LinkResponse>(
    'aliexpress.affiliate.link.generate',
    params
  )

  const links = response?.aliexpress_affiliate_link_generate_response?.resp_result?.result?.promotion_links?.promotion_link

  if (links && links.length > 0) {
    return links[0].promotion_link || null
  }

  return null
}

/**
 * Get hot products (trending)
 */
export async function getAliHotProducts(
  categoryIds?: string,
  pageSize: number = 20
): Promise<AliProduct[]> {
  const params: Record<string, any> = {
    page_size: pageSize,
    target_currency: 'KRW',
    target_language: 'KO',
    ship_to_country: 'KR',
    tracking_id: ALI_TRACKING_ID || '',
  }

  if (categoryIds) {
    params.category_ids = categoryIds
  }

  interface HotProductResponse {
    aliexpress_affiliate_hotproduct_query_response?: {
      resp_result?: {
        result?: {
          products?: {
            product?: any[]
          }
        }
      }
    }
  }

  const response = await aliApiRequest<HotProductResponse>(
    'aliexpress.affiliate.hotproduct.query',
    params
  )

  const products = response?.aliexpress_affiliate_hotproduct_query_response?.resp_result?.result?.products?.product || []

  return products.map((p: any) => ({
    productId: p.product_id,
    productTitle: p.product_title,
    productUrl: p.product_detail_url,
    affiliateUrl: p.promotion_link,
    imageUrl: p.product_main_image_url,
    originalPrice: parseFloat(p.original_price || '0'),
    salePrice: parseFloat(p.sale_price || '0'),
    currency: p.target_sale_price_currency || 'KRW',
    discount: parseInt(p.discount || '0'),
    shopName: p.shop_name || '',
    shopUrl: p.shop_url || '',
    commissionRate: p.commission_rate || '',
    hotProductCommissionRate: p.hot_product_commission_rate || '',
    shippingInfo: p.logistics_info_dto?.logistics_type || '',
    evaluateScore: p.evaluate_rate || '',
    orders: parseInt(p.lastest_volume || '0'),
  }))
}

/**
 * Category mapping for AliExpress (주요 카테고리)
 */
export const ALI_CATEGORIES = {
  electronics: '44', // 전자제품
  phones: '509', // 휴대폰 & 액세서리
  computers: '7', // 컴퓨터 & 사무용품
  homeAppliances: '6', // 가전제품
  homeImprovement: '13', // 홈 인테리어
  sports: '18', // 스포츠 & 아웃도어
  beauty: '66', // 뷰티 & 헬스
  fashion: '3', // 의류
  jewelry: '36', // 주얼리 & 시계
  toys: '26', // 완구 & 취미
}

/**
 * Get products for PickForMe categories
 */
export async function getAliProductsForCategory(
  category: string,
  limit: number = 10
): Promise<AliProduct[]> {
  const keywordMap: Record<string, string> = {
    'humidifier': 'humidifier ultrasonic',
    'air-fryer': 'air fryer large capacity',
    'air-purifier': 'air purifier HEPA',
    'earbuds': 'bluetooth earbuds TWS',
    'robot-vacuum': 'robot vacuum cleaner',
  }

  const keyword = keywordMap[category] || category

  const result = await searchAliProducts(keyword, {
    pageSize: limit,
    sort: 'LAST_VOLUME_DESC',
  })

  return result?.products || []
}
