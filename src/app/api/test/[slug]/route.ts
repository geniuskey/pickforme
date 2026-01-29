import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { TestResponse } from '@/types/api'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const supabase = await createServerSupabaseClient()

    // Get category
    const { data: category, error: categoryError } = await supabase
      .from('categories')
      .select('id, name_ko, name_en, icon, description')
      .eq('slug', slug)
      .eq('is_active', true)
      .single()

    if (categoryError || !category) {
      return NextResponse.json(
        { error: 'Category not found', message: `No category found with slug: ${slug}` },
        { status: 404 }
      )
    }

    // Get questions
    const { data: questions, error: questionsError } = await supabase
      .from('questions')
      .select('id, order_num, question_text, question_type, options')
      .eq('category_id', category.id)
      .order('order_num', { ascending: true })

    if (questionsError) {
      console.error('Error fetching questions:', questionsError)
      return NextResponse.json(
        { error: 'Failed to fetch questions', message: questionsError.message },
        { status: 500 }
      )
    }

    if (!questions || questions.length === 0) {
      return NextResponse.json(
        { error: 'No questions found', message: 'This category has no questions yet' },
        { status: 404 }
      )
    }

    // Increment view count (fire and forget)
    supabase.rpc('increment_view_count', { category_slug: slug })

    const response: TestResponse = {
      category,
      questions,
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
