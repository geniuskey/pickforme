// Price History Tracking System

import { createServiceRoleClient } from './supabase/server'

export interface PriceRecord {
  productId: string
  platform: 'coupang' | 'naver' | 'elevenst'
  price: number
  recordedAt: Date
}

export interface PriceStats {
  current: number
  lowest: number
  highest: number
  average: number
  trend: 'up' | 'down' | 'stable'
  lowestDate: Date
  history: { date: string; price: number }[]
}

/**
 * Record current price for a product
 */
export async function recordPrice(
  productId: string,
  platform: 'coupang' | 'naver' | 'elevenst',
  price: number
): Promise<void> {
  const supabase = createServiceRoleClient()

  await supabase.from('price_history').insert({
    product_id: productId,
    platform,
    price,
    recorded_at: new Date().toISOString(),
  })
}

/**
 * Get price history for a product
 */
export async function getPriceHistory(
  productId: string,
  platform?: 'coupang' | 'naver' | 'elevenst',
  days: number = 30
): Promise<PriceStats | null> {
  const supabase = createServiceRoleClient()

  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  let query = supabase
    .from('price_history')
    .select('*')
    .eq('product_id', productId)
    .gte('recorded_at', startDate.toISOString())
    .order('recorded_at', { ascending: true })

  if (platform) {
    query = query.eq('platform', platform)
  }

  const { data, error } = await query

  if (error || !data || data.length === 0) {
    return null
  }

  // Calculate stats
  const prices = data.map((d) => d.price)
  const current = prices[prices.length - 1]
  const lowest = Math.min(...prices)
  const highest = Math.max(...prices)
  const average = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length)

  // Determine trend (compare last 7 days average to previous 7 days)
  let trend: 'up' | 'down' | 'stable' = 'stable'
  if (data.length >= 14) {
    const recent = data.slice(-7)
    const previous = data.slice(-14, -7)
    const recentAvg = recent.reduce((a, b) => a + b.price, 0) / recent.length
    const previousAvg = previous.reduce((a, b) => a + b.price, 0) / previous.length

    if (recentAvg > previousAvg * 1.05) trend = 'up'
    else if (recentAvg < previousAvg * 0.95) trend = 'down'
  }

  const lowestRecord = data.find((d) => d.price === lowest)

  return {
    current,
    lowest,
    highest,
    average,
    trend,
    lowestDate: new Date(lowestRecord!.recorded_at),
    history: data.map((d) => ({
      date: new Date(d.recorded_at).toISOString().split('T')[0],
      price: d.price,
    })),
  }
}

/**
 * Check if current price is at or near lowest
 */
export async function isPriceAtLowest(
  productId: string,
  currentPrice: number,
  threshold: number = 0.05 // 5% threshold
): Promise<boolean> {
  const stats = await getPriceHistory(productId)

  if (!stats) return false

  return currentPrice <= stats.lowest * (1 + threshold)
}

/**
 * Get price alerts for a user
 * (Would need additional user_price_alerts table)
 */
export async function getPriceAlerts(userId: string): Promise<
  {
    productId: string
    productName: string
    targetPrice: number
    currentPrice: number
    triggered: boolean
  }[]
> {
  // This would require a user_price_alerts table
  // For now, return empty array
  return []
}

/**
 * Daily price update job (called by cron)
 */
export async function updateAllPrices(): Promise<void> {
  const supabase = createServiceRoleClient()

  // Get all active products
  const { data: products } = await supabase
    .from('products')
    .select('id, coupang_url, naver_url, elevenst_url')
    .eq('is_active', true)

  if (!products) return

  // In production, this would:
  // 1. Scrape/fetch current prices from each platform
  // 2. Record new price entries
  // 3. Check for price alerts to trigger

  console.log(`Price tracking: Would update ${products.length} products`)
}
