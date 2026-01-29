// 11st (11번가) API Integration

const ELEVENST_API_KEY = process.env.ELEVENST_API_KEY

interface ElevenstSearchResult {
  ProductSearchResponse: {
    Products: {
      Total: number
      Product: ElevenstProduct[]
    }
  }
}

interface ElevenstProduct {
  ProductCode: string
  ProductName: string
  ProductPrice: string
  SalePrice: string
  Rating: string
  DetailPageUrl: string
  ProductImage: string
  SellerNick: string
  Seller: string
  BuySatisfy: string
}

export interface ElevenstProductInfo {
  name: string
  price: number
  originalPrice: number
  imageUrl: string
  productUrl: string
  productCode: string
  sellerName: string
  rating: number
}

/**
 * Search products on 11st
 */
export async function searchElevenstProducts(
  keyword: string,
  options?: {
    pageNum?: number
    pageSize?: number
    sortCd?: 'CP' | 'HL' | 'LH' | 'RK' // CP=인기순, HL=높은가격, LH=낮은가격, RK=최신순
  }
): Promise<ElevenstProductInfo[]> {
  if (!ELEVENST_API_KEY) {
    console.warn('11st API key not configured')
    return []
  }

  const { pageNum = 1, pageSize = 20, sortCd = 'CP' } = options || {}

  try {
    const url = new URL('http://openapi.11st.co.kr/openapi/OpenApiService.tmall')
    url.searchParams.set('key', ELEVENST_API_KEY)
    url.searchParams.set('apiCode', 'ProductSearch')
    url.searchParams.set('keyword', keyword)
    url.searchParams.set('pageNum', pageNum.toString())
    url.searchParams.set('pageSize', pageSize.toString())
    url.searchParams.set('sortCd', sortCd)

    const response = await fetch(url.toString())

    if (!response.ok) {
      throw new Error(`11st API error: ${response.status}`)
    }

    const text = await response.text()
    // Parse XML response (11st API returns XML)
    const data = parseElevenstXML(text)

    if (!data?.ProductSearchResponse?.Products?.Product) {
      return []
    }

    const products = Array.isArray(data.ProductSearchResponse.Products.Product)
      ? data.ProductSearchResponse.Products.Product
      : [data.ProductSearchResponse.Products.Product]

    return products.map((item: ElevenstProduct) => ({
      name: item.ProductName,
      price: parseInt(item.SalePrice, 10),
      originalPrice: parseInt(item.ProductPrice, 10),
      imageUrl: item.ProductImage,
      productUrl: item.DetailPageUrl,
      productCode: item.ProductCode,
      sellerName: item.SellerNick || item.Seller,
      rating: parseFloat(item.Rating || '0'),
    }))
  } catch (error) {
    console.error('Error searching 11st products:', error)
    return []
  }
}

/**
 * Simple XML parser for 11st API response
 */
function parseElevenstXML(xml: string): any {
  // This is a simplified parser. In production, use a proper XML parser like 'fast-xml-parser'
  try {
    const parser = new DOMParser()
    const doc = parser.parseFromString(xml, 'text/xml')

    const parseNode = (node: Element): any => {
      const result: any = {}

      // Handle child elements
      for (const child of Array.from(node.children)) {
        const value = child.children.length > 0 ? parseNode(child) : child.textContent

        if (result[child.tagName]) {
          if (!Array.isArray(result[child.tagName])) {
            result[child.tagName] = [result[child.tagName]]
          }
          result[child.tagName].push(value)
        } else {
          result[child.tagName] = value
        }
      }

      return result
    }

    return parseNode(doc.documentElement)
  } catch (error) {
    console.error('Error parsing XML:', error)
    return null
  }
}

/**
 * Generate 11st affiliate link
 * Note: Requires 11st Partner registration
 */
export function generateElevenstAffiliateLink(
  productUrl: string,
  affiliateCode?: string
): string {
  if (!affiliateCode) {
    return productUrl
  }
  const url = new URL(productUrl)
  url.searchParams.set('trCtag', affiliateCode)
  return url.toString()
}
