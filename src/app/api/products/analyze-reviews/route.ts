import { NextRequest, NextResponse } from 'next/server'
import { analyzeReviews, autoGenerateTags } from '@/lib/reviewAnalysis'

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
    const { productName, reviews, mode = 'full' } = body

    if (!productName || !reviews || !Array.isArray(reviews)) {
      return NextResponse.json(
        { error: 'Missing fields', message: 'productName and reviews array are required' },
        { status: 400 }
      )
    }

    if (mode === 'tags') {
      const tags = await autoGenerateTags(productName, reviews)
      return NextResponse.json({ tags })
    } else {
      const analysis = await analyzeReviews(productName, reviews)
      return NextResponse.json({ analysis })
    }
  } catch (error) {
    console.error('Error analyzing reviews:', error)
    return NextResponse.json(
      { error: 'Failed to analyze reviews', message: String(error) },
      { status: 500 }
    )
  }
}
