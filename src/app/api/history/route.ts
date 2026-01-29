import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()

    // Check if user is authenticated
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Please login to save history' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { category_id, result_type_id, result_image_url } = body

    if (!category_id || !result_type_id) {
      return NextResponse.json(
        { error: 'Invalid request', message: 'category_id and result_type_id are required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('user_history')
      .insert({
        user_id: user.id,
        category_id,
        result_type_id,
        result_image_url,
      } as any)
      .select()
      .single()

    if (error) {
      console.error('Error saving history:', error)
      return NextResponse.json(
        { error: 'Failed to save history', message: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, history: data })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error', message: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const supabase = await createServerSupabaseClient()

    // Check if user is authenticated
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Please login to view history' },
        { status: 401 }
      )
    }

    const { data, error } = await supabase
      .from('user_history')
      .select(`
        *,
        categories (name_ko, icon, slug),
        result_types (type_name, emoji)
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(50)

    if (error) {
      console.error('Error fetching history:', error)
      return NextResponse.json(
        { error: 'Failed to fetch history', message: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ history: data })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error', message: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
