import { MetadataRoute } from 'next'
import { createServiceRoleClient } from '@/lib/supabase/server'

const BASE_URL = 'https://pickforme.vercel.app'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createServiceRoleClient()

  // 카테고리 가져오기
  const { data: categories } = await supabase
    .from('categories')
    .select('slug, updated_at')
    .eq('is_active', true)

  // 정적 페이지
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date('2024-01-01'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date('2024-01-01'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // 테스트 페이지 (카테고리별)
  const testPages: MetadataRoute.Sitemap = (categories || []).map((category: any) => ({
    url: `${BASE_URL}/test/${category.slug}`,
    lastModified: new Date(category.updated_at || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  return [...staticPages, ...testPages]
}
