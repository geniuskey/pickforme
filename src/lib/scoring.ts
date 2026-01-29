import { Product, ResultType, Answer, Question } from '@/types/database'
import { ProductWithRank } from '@/types/api'

/**
 * 사용자 답변으로부터 태그를 추출합니다.
 */
export function extractUserTags(answers: Answer[], questions: Question[]): string[] {
  const tags: string[] = []

  for (const answer of answers) {
    const question = questions.find(q => q.id === answer.question_id)
    if (!question) continue

    if (answer.answer === 'yes' || answer.answer === question.options?.[0]) {
      tags.push(...(question.tags_yes || []))
    } else {
      tags.push(...(question.tags_no || []))
    }
  }

  // 중복 제거
  return [...new Set(tags)]
}

/**
 * 제품의 점수를 계산합니다.
 */
export function calculateProductScore(product: Product, userTags: string[]): number {
  let score = product.score_base || 50

  // 태그 매칭 점수 (+10점 per tag)
  for (const tag of userTags) {
    if (product.tags.includes(tag)) {
      score += 10
    }
  }

  // 평점 보너스
  if (product.rating && product.rating >= 4.5) {
    score += 5
  }

  // 리뷰 수 보너스
  if (product.review_count && product.review_count >= 1000) {
    score += 3
  }

  return score
}

/**
 * 매칭 이유를 생성합니다.
 */
export function generateMatchReason(product: Product, userTags: string[]): string {
  const matchedTags = product.tags.filter(tag => userTags.includes(tag))

  // 태그 한글 매핑
  const tagLabels: Record<string, string> = {
    // 공통
    large_capacity: '대용량',
    small_size: '컴팩트 사이즈',
    quiet: '저소음',
    easy_clean: '세척 용이',
    budget: '가성비',
    premium: '프리미엄',
    smart: '스마트 기능',
    design: '디자인',
    portable: '휴대성',
    powerful: '강력한 성능',

    // 가습기
    natural_evaporation: '자연기화식',
    ultrasonic: '초음파식',
    hybrid: '하이브리드',
    antibacterial: '항균 기능',
    auto_humidity: '자동 습도조절',

    // 에어프라이어
    large_basket: '대용량 바스켓',
    dual_basket: '듀얼 바스켓',
    rotisserie: '로티세리',
    preset_menu: '원터치 요리',
    oil_free: '무유 조리',

    // 공기청정기
    hepa_filter: '헤파 필터',
    air_quality_sensor: '공기질 센서',
    wide_coverage: '넓은 청정 면적',
    low_maintenance: '필터 수명 김',

    // 이어폰
    anc: '노이즈 캔슬링',
    long_battery: '긴 배터리',
    water_resistant: '방수',
    comfortable: '착용감',
    bass: '베이스',
    clear_call: '통화 품질',

    // 로봇청소기
    mapping: '맵핑 기능',
    mopping: '물걸레',
    auto_empty: '자동 비움',
    pet_friendly: '펫 모드',
    obstacle_avoid: '장애물 회피',
  }

  if (matchedTags.length === 0) {
    return '추천 제품'
  }

  const labels = matchedTags
    .slice(0, 3)
    .map(tag => tagLabels[tag] || tag)
    .join(' + ')

  return labels
}

/**
 * 제품 목록을 점수 기준으로 정렬하고 순위를 부여합니다.
 */
export function rankProducts(products: Product[], userTags: string[]): ProductWithRank[] {
  return products
    .map(product => ({
      ...product,
      calculated_score: calculateProductScore(product, userTags),
      match_reason: generateMatchReason(product, userTags),
      rank: 0, // 임시
    }))
    .sort((a, b) => b.calculated_score - a.calculated_score)
    .slice(0, 10)
    .map((product, index) => ({
      ...product,
      rank: index + 1,
    }))
}

/**
 * 사용자의 결과 타입을 결정합니다.
 */
export function determineResultType(userTags: string[], resultTypes: ResultType[]): ResultType | null {
  let bestMatch: ResultType | null = null
  let bestScore = 0

  for (const type of resultTypes) {
    if (!type.tag_conditions || type.tag_conditions.length === 0) continue

    const matchCount = type.tag_conditions.filter(tag => userTags.includes(tag)).length
    const score = matchCount / type.tag_conditions.length

    // 동점일 경우 priority가 높은 것 선택
    if (score > bestScore || (score === bestScore && type.priority > (bestMatch?.priority || 0))) {
      bestScore = score
      bestMatch = type
    }
  }

  // 매칭되는 타입이 없으면 첫 번째 타입 반환 (기본값)
  return bestMatch || resultTypes[0] || null
}
