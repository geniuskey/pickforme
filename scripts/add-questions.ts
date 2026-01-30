/**
 * 새 카테고리에 질문 추가
 *
 * Usage:
 *   npx tsx scripts/add-questions.ts
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })
dotenv.config({ path: '.env' })

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

interface Question {
  order_num: number
  question_text: string
  question_type: 'binary' | 'choice'
  options?: { label: string; value: string; tags: string[] }[]
  tags_yes?: string[]
  tags_no?: string[]
}

// 카테고리별 질문
const CATEGORY_QUESTIONS: Record<string, Question[]> = {
  'smart-watch': [
    {
      order_num: 1,
      question_text: '운동 기록이 중요한가요?',
      question_type: 'binary',
      tags_yes: ['fitness', 'health'],
      tags_no: ['basic'],
    },
    {
      order_num: 2,
      question_text: '예산이 어느 정도인가요?',
      question_type: 'choice',
      options: [
        { label: '20만원 이하', value: 'budget', tags: ['budget', 'xiaomi'] },
        { label: '20-40만원', value: 'mid', tags: ['mid_range', 'samsung'] },
        { label: '40만원 이상', value: 'premium', tags: ['premium', 'apple'] },
      ],
    },
    {
      order_num: 3,
      question_text: '스마트폰은 어떤 걸 쓰시나요?',
      question_type: 'choice',
      options: [
        { label: '아이폰', value: 'iphone', tags: ['apple'] },
        { label: '갤럭시', value: 'galaxy', tags: ['samsung'] },
        { label: '기타 안드로이드', value: 'android', tags: ['xiaomi', 'mid_range'] },
      ],
    },
    {
      order_num: 4,
      question_text: '배터리 오래가는 게 중요한가요?',
      question_type: 'binary',
      tags_yes: ['long_battery'],
      tags_no: ['compact'],
    },
    {
      order_num: 5,
      question_text: '세련된 디자인이 중요한가요?',
      question_type: 'binary',
      tags_yes: ['premium', 'apple'],
      tags_no: ['budget', 'basic'],
    },
  ],
  'coffee-machine': [
    {
      order_num: 1,
      question_text: '어떤 커피를 주로 드시나요?',
      question_type: 'choice',
      options: [
        { label: '에스프레소/아메리카노', value: 'espresso', tags: ['espresso'] },
        { label: '라떼/카푸치노', value: 'latte', tags: ['milk_frother', 'premium'] },
        { label: '드립커피', value: 'drip', tags: ['drip', 'budget'] },
      ],
    },
    {
      order_num: 2,
      question_text: '간편함이 중요한가요?',
      question_type: 'binary',
      tags_yes: ['auto', 'capsule'],
      tags_no: ['manual', 'espresso'],
    },
    {
      order_num: 3,
      question_text: '예산이 어느 정도인가요?',
      question_type: 'choice',
      options: [
        { label: '20만원 이하', value: 'budget', tags: ['budget', 'drip'] },
        { label: '20-50만원', value: 'mid', tags: ['mid_range', 'capsule'] },
        { label: '50만원 이상', value: 'premium', tags: ['premium', 'auto'] },
      ],
    },
    {
      order_num: 4,
      question_text: '우유 거품 기능이 필요한가요?',
      question_type: 'binary',
      tags_yes: ['milk_frother'],
      tags_no: ['basic'],
    },
    {
      order_num: 5,
      question_text: '청소 간편한 게 좋은가요?',
      question_type: 'binary',
      tags_yes: ['auto', 'capsule'],
      tags_no: ['manual'],
    },
  ],
  'monitor': [
    {
      order_num: 1,
      question_text: '주 용도가 무엇인가요?',
      question_type: 'choice',
      options: [
        { label: '게임', value: 'gaming', tags: ['gaming', 'high_refresh'] },
        { label: '업무/사무', value: 'work', tags: ['work', 'eye_care'] },
        { label: '영상 편집/디자인', value: 'creative', tags: ['4k', 'color_accuracy'] },
      ],
    },
    {
      order_num: 2,
      question_text: '선호하는 화면 크기는?',
      question_type: 'choice',
      options: [
        { label: '24인치 이하', value: 'small', tags: ['compact', 'budget'] },
        { label: '27인치', value: 'medium', tags: ['27inch'] },
        { label: '32인치 이상', value: 'large', tags: ['large', '32inch'] },
      ],
    },
    {
      order_num: 3,
      question_text: '고해상도(4K)가 필요한가요?',
      question_type: 'binary',
      tags_yes: ['4k', 'premium'],
      tags_no: ['fhd', 'budget'],
    },
    {
      order_num: 4,
      question_text: '예산이 어느 정도인가요?',
      question_type: 'choice',
      options: [
        { label: '30만원 이하', value: 'budget', tags: ['budget'] },
        { label: '30-60만원', value: 'mid', tags: ['mid_range'] },
        { label: '60만원 이상', value: 'premium', tags: ['premium', 'lg', 'samsung'] },
      ],
    },
    {
      order_num: 5,
      question_text: '커브드 모니터에 관심 있나요?',
      question_type: 'binary',
      tags_yes: ['curved', 'gaming'],
      tags_no: ['flat'],
    },
  ],
  'keyboard': [
    {
      order_num: 1,
      question_text: '주 용도가 무엇인가요?',
      question_type: 'choice',
      options: [
        { label: '타이핑/코딩', value: 'typing', tags: ['tactile', 'quiet'] },
        { label: '게임', value: 'gaming', tags: ['gaming', 'linear'] },
        { label: '사무', value: 'office', tags: ['quiet', 'membrane'] },
      ],
    },
    {
      order_num: 2,
      question_text: '무선 키보드를 원하시나요?',
      question_type: 'binary',
      tags_yes: ['wireless', 'bluetooth'],
      tags_no: ['wired'],
    },
    {
      order_num: 3,
      question_text: '기계식 키보드에 관심 있나요?',
      question_type: 'binary',
      tags_yes: ['mechanical'],
      tags_no: ['membrane', 'budget'],
    },
    {
      order_num: 4,
      question_text: '예산이 어느 정도인가요?',
      question_type: 'choice',
      options: [
        { label: '5만원 이하', value: 'budget', tags: ['budget', 'membrane'] },
        { label: '5-15만원', value: 'mid', tags: ['mid_range', 'mechanical'] },
        { label: '15만원 이상', value: 'premium', tags: ['premium', 'custom'] },
      ],
    },
    {
      order_num: 5,
      question_text: 'RGB 조명이 필요한가요?',
      question_type: 'binary',
      tags_yes: ['rgb', 'gaming'],
      tags_no: ['minimal'],
    },
  ],
  'speaker': [
    {
      order_num: 1,
      question_text: '주로 어디서 사용하시나요?',
      question_type: 'choice',
      options: [
        { label: '집에서', value: 'home', tags: ['home', 'large'] },
        { label: '야외/캠핑', value: 'outdoor', tags: ['portable', 'waterproof'] },
        { label: '이동 중', value: 'travel', tags: ['compact', 'mini'] },
      ],
    },
    {
      order_num: 2,
      question_text: '방수 기능이 필요한가요?',
      question_type: 'binary',
      tags_yes: ['waterproof', 'outdoor'],
      tags_no: ['home'],
    },
    {
      order_num: 3,
      question_text: '예산이 어느 정도인가요?',
      question_type: 'choice',
      options: [
        { label: '5만원 이하', value: 'budget', tags: ['budget'] },
        { label: '5-15만원', value: 'mid', tags: ['mid_range', 'jbl'] },
        { label: '15만원 이상', value: 'premium', tags: ['premium', 'bose', 'sony'] },
      ],
    },
    {
      order_num: 4,
      question_text: '강력한 베이스가 중요한가요?',
      question_type: 'binary',
      tags_yes: ['bass', 'jbl'],
      tags_no: ['balanced'],
    },
    {
      order_num: 5,
      question_text: '배터리 오래가는 게 중요한가요?',
      question_type: 'binary',
      tags_yes: ['long_battery'],
      tags_no: ['compact'],
    },
  ],
}

async function main() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    console.error('❌ Supabase credentials not found!')
    process.exit(1)
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

  // 카테고리 ID 가져오기
  const { data: categories } = await supabase.from('categories').select('id, slug, name_ko')

  if (!categories) {
    console.error('No categories found')
    process.exit(1)
  }

  const categoryMap = new Map(categories.map(c => [c.slug, { id: c.id, name: c.name_ko }]))

  console.log('Adding questions for new categories...\n')

  for (const [slug, questions] of Object.entries(CATEGORY_QUESTIONS)) {
    const category = categoryMap.get(slug)
    if (!category) {
      console.log(`⏭️  Category not found: ${slug}`)
      continue
    }

    // 기존 질문 확인
    const { data: existing } = await supabase
      .from('questions')
      .select('id')
      .eq('category_id', category.id)

    if (existing && existing.length > 0) {
      console.log(`⏭️  ${category.name} - already has ${existing.length} questions`)
      continue
    }

    // 질문 추가
    for (const question of questions) {
      const { error } = await supabase.from('questions').insert({
        category_id: category.id,
        ...question,
      })

      if (error) {
        console.log(`❌ ${category.name} Q${question.order_num}: ${error.message}`)
      }
    }

    console.log(`✅ ${category.name} - added ${questions.length} questions`)
  }

  // 요약 출력
  console.log('\n=== Question Summary ===')
  for (const cat of categories) {
    const { count } = await supabase
      .from('questions')
      .select('*', { count: 'exact', head: true })
      .eq('category_id', cat.id)

    console.log(`  ${cat.name_ko}: ${count || 0} questions`)
  }

  console.log('\n✅ Done!')
}

main().catch(console.error)
