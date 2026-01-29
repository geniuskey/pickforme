import { Metadata } from 'next'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { CategoryGrid } from '@/components/home/CategoryGrid'

export const metadata: Metadata = {
  title: '카테고리',
  description: '나에게 맞는 제품을 찾아보세요. 다양한 카테고리의 맞춤 추천 테스트',
}

export const revalidate = 3600

async function getCategories() {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('categories')
    .select('id, slug, name_ko, name_en, icon, view_count, description')
    .eq('is_active', true)
    .order('view_count', { ascending: false })

  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }

  return data || []
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="min-h-screen gradient-bg py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            어떤 제품을 찾고 계세요?
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            간단한 테스트로 나에게 딱 맞는 제품을 찾아보세요.
            각 카테고리별 맞춤 추천 TOP 10을 제공합니다.
          </p>
        </div>

        <CategoryGrid categories={categories} />

        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500">
            더 많은 카테고리가 계속 추가됩니다!
          </p>
        </div>
      </div>
    </div>
  )
}
