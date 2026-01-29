import { NextRequest, NextResponse } from 'next/server'
import { getPriceHistory, recordPrice } from '@/lib/priceTracking'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get('productId')
    const platform = searchParams.get('platform') as 'coupang' | 'naver' | 'elevenst' | null
    const days = parseInt(searchParams.get('days') || '30', 10)

    if (!productId) {
      return NextResponse.json(
        { error: 'Missing productId', message: 'Product ID is required' },
        { status: 400 }
      )
    }

    const history = await getPriceHistory(
      productId,
      platform || undefined,
      days
    )

    if (!history) {
      return NextResponse.json(
        { error: 'No price history', message: 'No price history found for this product' },
        { status: 404 }
      )
    }

    return NextResponse.json({ priceStats: history })
  } catch (error) {
    console.error('Error fetching price history:', error)
    return NextResponse.json(
      { error: 'Failed to fetch price history', message: String(error) },
      { status: 500 }
    )
  }
}

// Record new price (admin only)
export async function POST(request: NextRequest) {
  try {
    const apiKey = request.headers.get('x-api-key')
    if (apiKey !== process.env.ADMIN_API_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { productId, platform, price } = body

    if (!productId || !platform || !price) {
      return NextResponse.json(
        { error: 'Missing fields', message: 'productId, platform, and price are required' },
        { status: 400 }
      )
    }

    await recordPrice(productId, platform, price)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error recording price:', error)
    return NextResponse.json(
      { error: 'Failed to record price', message: String(error) },
      { status: 500 }
    )
  }
}
