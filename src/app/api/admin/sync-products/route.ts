import { NextRequest, NextResponse } from 'next/server'
import { createServiceRoleClient } from '@/lib/supabase/server'
import { getCoupangProductsForCategory, createCoupangDeepLink } from '@/lib/platforms/coupang'

const ADMIN_API_KEY = process.env.ADMIN_API_KEY

// Category keyword mapping for Coupang search
const CATEGORY_KEYWORDS: Record<string, string[]> = {
  'humidifier': ['가습기 추천', '가습기 인기'],
  'air-fryer': ['에어프라이어 추천', '에어프라이어 인기'],
  'air-purifier': ['공기청정기 추천', '공기청정기 인기'],
  'bluetooth-earphone': ['블루투스 이어폰 추천', '무선이어폰 인기'],
  'robot-vacuum': ['로봇청소기 추천', '로봇청소기 인기'],
}

export async function POST(request: NextRequest) {
  try {
    // Verify admin API key
    const authHeader = request.headers.get('authorization')
    if (!authHeader || authHeader !== `Bearer ${ADMIN_API_KEY}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { categorySlug, limit = 10 } = body

    const supabase = createServiceRoleClient()

    // Get category
    let categories
    if (categorySlug) {
      const { data } = await supabase
        .from('categories')
        .select('id, slug, name_ko')
        .eq('slug', categorySlug)
        .single()
      categories = data ? [data] : []
    } else {
      const { data } = await supabase
        .from('categories')
        .select('id, slug, name_ko')
      categories = data || []
    }

    if (!categories || categories.length === 0) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      )
    }

    const results: any[] = []

    for (const category of categories) {
      const keywords = CATEGORY_KEYWORDS[category.slug] || [category.name_ko]

      // Search products with the first keyword
      const products = await getCoupangProductsForCategory(keywords[0], limit)

      if (products.length === 0) {
        results.push({
          category: category.slug,
          status: 'no_products',
          count: 0,
        })
        continue
      }

      // Deactivate existing products for this category
      await supabase
        .from('products')
        .update({ is_active: false })
        .eq('category_id', category.id)

      // Insert new products
      const productInserts = products.map((product, index) => ({
        category_id: category.id,
        name: product.name,
        description: `${product.isRocket ? '🚀 로켓배송 | ' : ''}${product.isFreeShipping ? '무료배송' : ''}`,
        price: product.price,
        image_url: product.imageUrl,
        coupang_url: product.affiliateUrl,
        coupang_product_id: product.productId,
        tags: generateProductTags(product),
        is_rocket: product.isRocket,
        is_active: true,
        display_order: index + 1,
      }))

      const { data: inserted, error } = await supabase
        .from('products')
        .insert(productInserts as any)
        .select()

      if (error) {
        results.push({
          category: category.slug,
          status: 'error',
          error: error.message,
        })
      } else {
        results.push({
          category: category.slug,
          status: 'success',
          count: inserted?.length || 0,
        })
      }
    }

    return NextResponse.json({
      success: true,
      results,
    })
  } catch (error) {
    console.error('Sync products error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * Generate tags based on product attributes
 */
function generateProductTags(product: {
  name: string
  isRocket: boolean
  isFreeShipping: boolean
  price: number
}): string[] {
  const tags: string[] = []
  const nameLower = product.name.toLowerCase()

  // Delivery tags
  if (product.isRocket) tags.push('fast_delivery')
  if (product.isFreeShipping) tags.push('free_shipping')

  // Price tags
  if (product.price < 50000) tags.push('budget')
  else if (product.price < 150000) tags.push('mid_range')
  else tags.push('premium')

  // Feature detection from name
  if (nameLower.includes('무소음') || nameLower.includes('저소음')) tags.push('quiet')
  if (nameLower.includes('대용량') || nameLower.includes('대형')) tags.push('large_capacity')
  if (nameLower.includes('소형') || nameLower.includes('미니')) tags.push('compact')
  if (nameLower.includes('스마트') || nameLower.includes('앱')) tags.push('smart')
  if (nameLower.includes('절전') || nameLower.includes('에너지')) tags.push('energy_efficient')

  return tags
}

// GET endpoint to check sync status
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader || authHeader !== `Bearer ${ADMIN_API_KEY}`) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  const supabase = createServiceRoleClient()

  const { data: stats } = await supabase
    .from('products')
    .select('category_id, is_active, coupang_product_id')

  const activeProducts = stats?.filter((p: any) => p.is_active).length || 0
  const coupangProducts = stats?.filter((p: any) => p.coupang_product_id).length || 0

  return NextResponse.json({
    totalProducts: stats?.length || 0,
    activeProducts,
    coupangProducts,
  })
}
