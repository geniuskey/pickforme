import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { createServiceRoleClient } from '@/lib/supabase/server'
import { GenerateRequest, GenerateResponse } from '@/types/api'

const ADMIN_API_KEY = process.env.ADMIN_API_KEY
const GEMINI_API_KEY = process.env.GEMINI_API_KEY

export async function POST(request: NextRequest) {
  try {
    const body: GenerateRequest = await request.json()
    const { category_name, api_key } = body

    // Validate admin API key
    if (!ADMIN_API_KEY || api_key !== ADMIN_API_KEY) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    if (!category_name) {
      return NextResponse.json(
        { success: false, message: 'category_name is required' },
        { status: 400 }
      )
    }

    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        { success: false, message: 'Gemini API key not configured' },
        { status: 500 }
      )
    }

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    // Generate questions
    const questionsPrompt = `당신은 쇼핑 전문가입니다. "${category_name}" 구매 시 고려해야 할 핵심 요소를 파악하고,
사용자의 니즈를 파악할 수 있는 Yes/No 질문 6개를 만들어주세요.

요구사항:
1. 질문은 친근하고 캐주얼한 말투로 (반말 사용)
2. 각 질문은 특정 제품 특성(태그)과 연결되어야 함
3. 태그는 영어 소문자와 언더스코어만 사용 (예: large_capacity, easy_clean)
4. 질문 순서는 중요도 순

출력 형식 (JSON만 출력, 다른 텍스트 없이):
{
  "questions": [
    {
      "question_text": "질문 내용?",
      "tags_yes": ["tag1", "tag2"],
      "tags_no": ["tag3"]
    }
  ]
}`

    const questionsResult = await model.generateContent(questionsPrompt)
    const questionsText = questionsResult.response.text()
    const questionsJson = JSON.parse(questionsText.replace(/```json\n?|\n?```/g, ''))

    // Generate result types
    const allTags = new Set<string>()
    questionsJson.questions.forEach((q: any) => {
      q.tags_yes.forEach((t: string) => allTags.add(t))
      q.tags_no.forEach((t: string) => allTags.add(t))
    })

    const resultTypesPrompt = `다음 태그들을 조합하여 "${category_name}" 구매자 유형 4가지를 만들어주세요.

사용 가능한 태그: ${Array.from(allTags).join(', ')}

요구사항:
1. MZ세대가 공감할 수 있는 유머러스한 타입명 (한글)
2. 2-3문장의 공감가는 설명
3. SNS에 공유하고 싶을 정도로 찰떡인 표현
4. 각 유형은 2-4개의 태그 조합으로 구성
5. type_code는 영어 소문자와 언더스코어만 사용

출력 형식 (JSON만 출력, 다른 텍스트 없이):
{
  "result_types": [
    {
      "type_code": "example_type",
      "type_name": "예시 타입명",
      "description": "유형 설명 2-3문장",
      "tag_conditions": ["tag1", "tag2"],
      "emoji": "🎯"
    }
  ]
}`

    const resultTypesResult = await model.generateContent(resultTypesPrompt)
    const resultTypesText = resultTypesResult.response.text()
    const resultTypesJson = JSON.parse(resultTypesText.replace(/```json\n?|\n?```/g, ''))

    // Save to database
    const supabase = createServiceRoleClient()

    // Create category
    const slug = category_name
      .toLowerCase()
      .replace(/[가-힣]/g, (char) => {
        // Simple Korean to slug mapping
        return char
      })
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      || `category-${Date.now()}`

    const { data: category, error: categoryError } = await supabase
      .from('categories')
      .insert({
        slug: slug,
        name_ko: category_name,
        name_en: category_name,
        description: `나에게 맞는 ${category_name}를 찾아보세요`,
        icon: '📦',
        is_active: true,
      })
      .select()
      .single()

    if (categoryError) {
      console.error('Error creating category:', categoryError)
      return NextResponse.json(
        { success: false, message: `Failed to create category: ${categoryError.message}` },
        { status: 500 }
      )
    }

    // Insert questions
    const questionsToInsert = questionsJson.questions.map((q: any, index: number) => ({
      category_id: category.id,
      order_num: index + 1,
      question_text: q.question_text,
      question_type: 'yes_no',
      tags_yes: q.tags_yes,
      tags_no: q.tags_no,
      weight: 1,
    }))

    const { error: questionsInsertError } = await supabase
      .from('questions')
      .insert(questionsToInsert)

    if (questionsInsertError) {
      console.error('Error inserting questions:', questionsInsertError)
    }

    // Insert result types
    const resultTypesToInsert = resultTypesJson.result_types.map((rt: any, index: number) => ({
      category_id: category.id,
      type_code: rt.type_code,
      type_name: rt.type_name,
      description: rt.description,
      tag_conditions: rt.tag_conditions,
      emoji: rt.emoji,
      priority: resultTypesJson.result_types.length - index,
    }))

    const { error: resultTypesInsertError } = await supabase
      .from('result_types')
      .insert(resultTypesToInsert)

    if (resultTypesInsertError) {
      console.error('Error inserting result types:', resultTypesInsertError)
    }

    const response: GenerateResponse = {
      success: true,
      category_id: category.id,
      message: `Successfully generated category "${category_name}" with ${questionsJson.questions.length} questions and ${resultTypesJson.result_types.length} result types`,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error generating category:', error)
    return NextResponse.json(
      { success: false, message: `Generation failed: ${error}` },
      { status: 500 }
    )
  }
}
