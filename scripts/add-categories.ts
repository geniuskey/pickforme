/**
 * 새 카테고리 추가 스크립트
 *
 * Usage:
 *   npx tsx scripts/add-categories.ts
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })
dotenv.config({ path: '.env' })

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

// 새로 추가할 카테고리들
const NEW_CATEGORIES = [
  {
    slug: 'smart-watch',
    name_ko: '스마트워치',
    name_en: 'Smart Watch',
    icon: '⌚',
    description: '나에게 맞는 스마트워치를 찾아보세요',
  },
  {
    slug: 'coffee-machine',
    name_ko: '커피머신',
    name_en: 'Coffee Machine',
    icon: '☕',
    description: '홈카페를 위한 완벽한 커피머신',
  },
  {
    slug: 'monitor',
    name_ko: '모니터',
    name_en: 'Monitor',
    icon: '🖥️',
    description: '업무와 게임에 최적화된 모니터',
  },
  {
    slug: 'keyboard',
    name_ko: '키보드',
    name_en: 'Keyboard',
    icon: '⌨️',
    description: '타이핑이 즐거워지는 키보드',
  },
  {
    slug: 'speaker',
    name_ko: '블루투스 스피커',
    name_en: 'Bluetooth Speaker',
    icon: '🔊',
    description: '어디서나 좋은 음질을',
  },
]

async function main() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    console.error('❌ Supabase credentials not found!')
    process.exit(1)
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

  console.log('Adding new categories...\n')

  for (const category of NEW_CATEGORIES) {
    // 이미 존재하는지 확인
    const { data: existing } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', category.slug)
      .single()

    if (existing) {
      console.log(`⏭️  ${category.name_ko} (${category.slug}) - already exists`)
      continue
    }

    const { error } = await supabase.from('categories').insert({
      ...category,
      is_active: true,
      view_count: 0,
    })

    if (error) {
      console.log(`❌ ${category.name_ko}: ${error.message}`)
    } else {
      console.log(`✅ ${category.name_ko} (${category.slug}) - added`)
    }
  }

  // 전체 카테고리 목록 출력
  const { data: allCategories } = await supabase
    .from('categories')
    .select('slug, name_ko, icon')
    .eq('is_active', true)
    .order('name_ko')

  console.log('\n=== All Categories ===')
  allCategories?.forEach(c => {
    console.log(`  ${c.icon} ${c.name_ko} (${c.slug})`)
  })

  console.log('\n✅ Done!')
}

main().catch(console.error)
