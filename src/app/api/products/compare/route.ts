import { NextRequest, NextResponse } from 'next/server'
import { searchMultiPlatform, comparePrices } from '@/lib/platforms'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const productName = searchParams.get('name')
    const mode = searchParams.get('mode') || 'compare' // 'search' or 'compare'

    if (!productName) {
      return NextResponse.json(
        { error: 'Missing product name', message: 'Product name is required' },
        { status: 400 }
      )
    }

    if (mode === 'search') {
      const results = await searchMultiPlatform(productName)
      return NextResponse.json({ products: results })
    } else {
      const comparison = await comparePrices(productName)
      return NextResponse.json({ comparison })
    }
  } catch (error) {
    console.error('Error comparing products:', error)
    return NextResponse.json(
      { error: 'Failed to compare products', message: String(error) },
      { status: 500 }
    )
  }
}
