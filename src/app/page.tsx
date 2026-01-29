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

export const revalidate = 3600 // ISR: 1시간마다 재생성

export default async function HomePage() {
  const categories = await getCategories()
  const popularCategories = categories.slice(0, 3)

  return (
    <div className="gradient-bg min-h-screen">
      <HeroSection />

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
