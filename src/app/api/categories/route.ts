import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { CategoriesResponse } from '@/types/api'

export const revalidate = 3600 // Cache for 1 hour

export async function GET() {
  try {
    const supabase = await createServerSupabaseClient()

    const { data: categories, error } = await supabase
      .from('categories')
      .select('id, slug, name_ko, name_en, icon, view_count, description')
      .eq('is_active', true)
      .order('view_count', { ascending: false })

    if (error) {
      console.error('Error fetching categories:', error)
      return NextResponse.json(
        { error: 'Failed to fetch categories', message: error.message },
        { status: 500 }
      )
    }

    const response: CategoriesResponse = {
      categories: categories || [],
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error', message: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
