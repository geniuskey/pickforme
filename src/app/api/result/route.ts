import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { ResultRequest, ResultResponse } from '@/types/api'
import { extractUserTags, rankProducts, determineResultType } from '@/lib/scoring'
import { Question, Product, ResultType } from '@/types/database'

export async function POST(request: NextRequest) {
  try {
    const body: ResultRequest = await request.json()
    const { category_id, answers } = body

    if (!category_id || !answers || answers.length === 0) {
      return NextResponse.json(
        { error: 'Invalid request', message: 'category_id and answers are required' },
        { status: 400 }
      )
    }

    const supabase = await createServerSupabaseClient()

    // Get questions with tags
    const { data: questions, error: questionsError } = await supabase
      .from('questions')
      .select('id, tags_yes, tags_no')
      .eq('category_id', category_id)

    if (questionsError || !questions) {
      console.error('Error fetching questions:', questionsError)
      return NextResponse.json(
        { error: 'Failed to fetch questions', message: questionsError?.message || 'Unknown error' },
        { status: 500 }
      )
    }

    // Extract user tags from answers
    const userTags = extractUserTags(answers, questions as Question[])

    // Get products for this category
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*')
      .eq('category_id', category_id)
      .eq('is_active', true)

    if (productsError || !products) {
      console.error('Error fetching products:', productsError)
      return NextResponse.json(
        { error: 'Failed to fetch products', message: productsError?.message || 'Unknown error' },
        { status: 500 }
      )
    }

    // Get result types for this category
    const { data: resultTypes, error: resultTypesError } = await supabase
      .from('result_types')
      .select('*')
      .eq('category_id', category_id)
      .order('priority', { ascending: false })

    if (resultTypesError || !resultTypes || resultTypes.length === 0) {
      console.error('Error fetching result types:', resultTypesError)
      return NextResponse.json(
        { error: 'Failed to fetch result types', message: resultTypesError?.message || 'No result types found' },
        { status: 500 }
      )
    }

    // Calculate result type
    const resultType = determineResultType(userTags, resultTypes as ResultType[])

    if (!resultType) {
      return NextResponse.json(
        { error: 'Could not determine result type', message: 'No matching result type found' },
        { status: 500 }
      )
    }

    // Rank products
    const rankedProducts = rankProducts(products as Product[], userTags)

    // Save test session (optional, for analytics)
    await supabase.from('test_sessions').insert({
      category_id,
      answers,
      result_type_id: resultType.id,
      completed: true,
    })

    const response: ResultResponse = {
      result_type: {
        type_name: resultType.type_name,
        type_code: resultType.type_code,
        description: resultType.description,
        emoji: resultType.emoji,
      },
      products: rankedProducts,
      user_tags: userTags,
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
