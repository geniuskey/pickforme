// Multi-platform product search and comparison

import { searchNaverProducts, NaverProductInfo } from './naver'
import { searchElevenstProducts, ElevenstProductInfo } from './elevenst'

export interface MultiPlatformProduct {
  name: string
  prices: {
    coupang?: number
    naver?: number
    elevenst?: number
  }
  urls: {
    coupang?: string
    naver?: string
    elevenst?: string
  }
  lowestPrice: number
  lowestPlatform: 'coupang' | 'naver' | 'elevenst'
  priceHistory?: {
    platform: string
    price: number
    recordedAt: string
  }[]
}

/**
 * Search product across multiple platforms
 */
export async function searchMultiPlatform(
  query: string
): Promise<MultiPlatformProduct[]> {
  // Search all platforms in parallel
  const [naverResults, elevenstResults] = await Promise.all([
    searchNaverProducts(query, { display: 10 }),
    searchElevenstProducts(query, { pageSize: 10 }),
  ])

  // Combine results (simplified - in production, would need smarter matching)
  const productMap = new Map<string, MultiPlatformProduct>()

  // Process Naver results
  for (const product of naverResults) {
    const key = normalizeProductName(product.name)
    const existing = productMap.get(key)

    if (existing) {
      existing.prices.naver = product.price
      existing.urls.naver = product.productUrl
      updateLowestPrice(existing)
    } else {
      productMap.set(key, {
        name: product.name,
        prices: { naver: product.price },
        urls: { naver: product.productUrl },
        lowestPrice: product.price,
        lowestPlatform: 'naver',
      })
    }
  }

  // Process 11st results
  for (const product of elevenstResults) {
    const key = normalizeProductName(product.name)
    const existing = productMap.get(key)

    if (existing) {
      existing.prices.elevenst = product.price
      existing.urls.elevenst = product.productUrl
      updateLowestPrice(existing)
    } else {
      productMap.set(key, {
        name: product.name,
        prices: { elevenst: product.price },
        urls: { elevenst: product.productUrl },
        lowestPrice: product.price,
        lowestPlatform: 'elevenst',
      })
    }
  }

  return Array.from(productMap.values())
}

/**
 * Normalize product name for matching across platforms
 */
function normalizeProductName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^\w\s가-힣]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 50) // Use first 50 chars for matching
}

/**
 * Update lowest price information
 */
function updateLowestPrice(product: MultiPlatformProduct): void {
  const prices = Object.entries(product.prices).filter(([_, price]) => price !== undefined)

  if (prices.length === 0) return

  let lowest = prices[0]
  for (const [platform, price] of prices) {
    if (price! < lowest[1]!) {
      lowest = [platform, price]
    }
  }

  product.lowestPrice = lowest[1]!
  product.lowestPlatform = lowest[0] as 'coupang' | 'naver' | 'elevenst'
}

/**
 * Compare prices across platforms for a specific product
 */
export async function comparePrices(productName: string): Promise<{
  coupang?: { price: number; url: string }
  naver?: { price: number; url: string }
  elevenst?: { price: number; url: string }
  savings?: number
  recommendation?: 'coupang' | 'naver' | 'elevenst'
}> {
  const results = await searchMultiPlatform(productName)

  if (results.length === 0) {
    return {}
  }

  // Find best matching product
  const bestMatch = results[0]

  const comparison: any = {}

  if (bestMatch.prices.coupang) {
    comparison.coupang = {
      price: bestMatch.prices.coupang,
      url: bestMatch.urls.coupang,
    }
  }
  if (bestMatch.prices.naver) {
    comparison.naver = {
      price: bestMatch.prices.naver,
      url: bestMatch.urls.naver,
    }
  }
  if (bestMatch.prices.elevenst) {
    comparison.elevenst = {
      price: bestMatch.prices.elevenst,
      url: bestMatch.urls.elevenst,
    }
  }

  // Calculate potential savings
  const prices = Object.values(bestMatch.prices).filter(p => p !== undefined) as number[]
  if (prices.length >= 2) {
    const max = Math.max(...prices)
    const min = Math.min(...prices)
    comparison.savings = max - min
    comparison.recommendation = bestMatch.lowestPlatform
  }

  return comparison
}
