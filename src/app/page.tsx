import { Suspense } from 'react'
import { HeroSection } from '@/components/home/HeroSection'
import { CategoryGrid } from '@/components/home/CategoryGrid'
import { PopularTests } from '@/components/home/PopularTests'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { createServerSupabaseClient } from '@/lib/supabase/server'

async function getCategories() {
  const supabase = await createServerSupabaseClient()

  // 카테고리 가져오기
  const { data: categories, error } = await supabase
    .from('categories')
    .select('id, slug, name_ko, name_en, icon, description')
    .eq('is_active', true)

  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }

  if (!categories || categories.length === 0) {
    return []
  }

  // 각 카테고리별 실제 테스트 완료 수 가져오기
  const categoriesWithCounts = await Promise.all(
    categories.map(async (category) => {
      const { count } = await supabase
        .from('test_sessions')
        .select('*', { count: 'exact', head: true })
        .eq('category_id', category.id)
        .eq('completed', true)

      return {
        ...category,
        view_count: count || 0,
      }
    })
  )

  // 참여 수 기준 정렬
  return categoriesWithCounts.sort((a, b) => b.view_count - a.view_count)
}

async function getStats() {
  const supabase = await createServerSupabaseClient()

  // 카테고리 수
  const { count: categoryCount } = await supabase
    .from('categories')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true)

  // 상품 수
  const { count: productCount } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true)

  // 테스트 완료 수
  const { count: testCount } = await supabase
    .from('test_sessions')
    .select('*', { count: 'exact', head: true })
    .eq('completed', true)

  return {
    categories: categoryCount || 0,
    products: productCount || 0,
    tests: testCount || 0,
  }
}

export const revalidate = 3600 // ISR: 1시간마다 재생성

export default async function HomePage() {
  const [categories, stats] = await Promise.all([getCategories(), getStats()])
  const popularCategories = categories.slice(0, 3)

  return (
    <div className="gradient-bg min-h-screen">
      <HeroSection stats={stats} />

      <section className="container mx-auto px-4 py-12">
        <Suspense fallback={<LoadingSpinner />}>
          <PopularTests categories={popularCategories} />
        </Suspense>
      </section>

      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          어떤 제품을 찾고 계세요?
        </h2>
        <Suspense fallback={<LoadingSpinner />}>
          <CategoryGrid categories={categories} />
        </Suspense>
      </section>
    </div>
  )
}
