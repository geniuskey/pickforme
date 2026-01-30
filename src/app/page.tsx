import { Suspense } from 'react'
import { HeroSection } from '@/components/home/HeroSection'
import { CategoryGrid } from '@/components/home/CategoryGrid'
import { PopularTests } from '@/components/home/PopularTests'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { createServerSupabaseClient } from '@/lib/supabase/server'

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
