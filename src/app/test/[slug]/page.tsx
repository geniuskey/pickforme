import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { TestContainer } from '@/components/test/TestContainer'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createServerSupabaseClient()

  const { data: category } = await supabase
    .from('categories')
    .select('name_ko, description')
    .eq('slug', slug)
    .single()

  if (!category) {
    return { title: '테스트를 찾을 수 없습니다' }
  }

  return {
    title: `나에게 맞는 ${category.name_ko} 찾기`,
    description: category.description || `${category.name_ko} 추천 테스트`,
    openGraph: {
      title: `나에게 맞는 ${category.name_ko} 찾기 | PickForMe`,
      description: category.description || `${category.name_ko} 추천 테스트`,
    },
  }
}

async function getTestData(slug: string) {
  const supabase = await createServerSupabaseClient()

  // Get category
  const { data: category, error: categoryError } = await supabase
    .from('categories')
    .select('id, name_ko, name_en, icon, description')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (categoryError || !category) {
    return null
  }

  // Get questions
  const { data: questions, error: questionsError } = await supabase
    .from('questions')
    .select('id, order_num, question_text, question_type, options, tags_yes, tags_no')
    .eq('category_id', category.id)
    .order('order_num', { ascending: true })

  if (questionsError || !questions || questions.length === 0) {
    return null
  }

  // Increment view count (fire and forget)
  supabase.rpc('increment_view_count', { category_slug: slug })

  return { category, questions }
}

export default async function TestPage({ params }: Props) {
  const { slug } = await params
  const data = await getTestData(slug)

  if (!data) {
    notFound()
  }

  return (
    <div className="min-h-screen gradient-bg">
      <TestContainer
        category={data.category}
        questions={data.questions}
        slug={slug}
      />
    </div>
  )
}
