// Review Analysis and Auto-Tagging System

import { GoogleGenerativeAI } from '@google/generative-ai'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY

export interface ReviewAnalysisResult {
  sentiment: 'positive' | 'negative' | 'neutral'
  sentimentScore: number // -1 to 1
  tags: string[]
  strengths: string[]
  weaknesses: string[]
  summary: string
  keyFeatures: string[]
}

export interface ReviewData {
  text: string
  rating?: number
  date?: string
}

/**
 * Analyze product reviews and extract tags
 */
export async function analyzeReviews(
  productName: string,
  reviews: ReviewData[]
): Promise<ReviewAnalysisResult | null> {
  if (!GEMINI_API_KEY || reviews.length === 0) {
    return null
  }

  try {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    // Combine reviews (limit to avoid token limits)
    const reviewText = reviews
      .slice(0, 20)
      .map((r, i) => `리뷰 ${i + 1} (평점: ${r.rating || 'N/A'}): ${r.text}`)
      .join('\n\n')

    const prompt = `다음은 "${productName}" 제품에 대한 고객 리뷰입니다. 이 리뷰들을 분석해주세요.

리뷰 목록:
${reviewText}

다음 형식으로 JSON만 출력해주세요 (다른 텍스트 없이):

{
  "sentiment": "positive" | "negative" | "neutral",
  "sentimentScore": -1.0 ~ 1.0 사이 숫자,
  "tags": ["영어_소문자_태그1", "영어_소문자_태그2"],
  "strengths": ["장점1", "장점2"],
  "weaknesses": ["단점1", "단점2"],
  "summary": "리뷰 요약 (1-2문장)",
  "keyFeatures": ["핵심 기능1", "핵심 기능2"]
}

태그 규칙:
- 영어 소문자와 언더스코어만 사용
- 제품 특성을 나타내는 태그 (예: quiet, easy_clean, large_capacity, budget, premium 등)
- 최대 8개`

    const result = await model.generateContent(prompt)
    const text = result.response.text()
    const json = JSON.parse(text.replace(/```json\n?|\n?```/g, ''))

    return {
      sentiment: json.sentiment,
      sentimentScore: json.sentimentScore,
      tags: json.tags || [],
      strengths: json.strengths || [],
      weaknesses: json.weaknesses || [],
      summary: json.summary,
      keyFeatures: json.keyFeatures || [],
    }
  } catch (error) {
    console.error('Error analyzing reviews:', error)
    return null
  }
}

/**
 * Auto-generate product tags from reviews
 */
export async function autoGenerateTags(
  productName: string,
  reviews: ReviewData[]
): Promise<string[]> {
  const analysis = await analyzeReviews(productName, reviews)

  if (!analysis) {
    return []
  }

  return analysis.tags
}

/**
 * Generate product description from reviews
 */
export async function generateProductDescription(
  productName: string,
  reviews: ReviewData[]
): Promise<string | null> {
  if (!GEMINI_API_KEY || reviews.length === 0) {
    return null
  }

  try {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const reviewSummary = reviews
      .slice(0, 10)
      .map((r) => r.text.slice(0, 200))
      .join(' ')

    const prompt = `"${productName}" 제품에 대한 실제 사용자 리뷰를 바탕으로,
이 제품의 핵심 특징과 추천 포인트를 2-3문장으로 요약해주세요.

리뷰 내용: ${reviewSummary}

자연스럽고 매력적인 한국어로 작성해주세요. JSON 형식 없이 텍스트만 출력하세요.`

    const result = await model.generateContent(prompt)
    return result.response.text().trim()
  } catch (error) {
    console.error('Error generating description:', error)
    return null
  }
}

/**
 * Calculate review quality score
 */
export function calculateReviewQuality(review: ReviewData): number {
  let score = 50 // Base score

  // Length bonus
  if (review.text.length > 100) score += 10
  if (review.text.length > 300) score += 10

  // Has rating
  if (review.rating !== undefined) score += 10

  // Recent review bonus
  if (review.date) {
    const daysSince = Math.floor(
      (Date.now() - new Date(review.date).getTime()) / (1000 * 60 * 60 * 24)
    )
    if (daysSince < 30) score += 10
    if (daysSince < 7) score += 10
  }

  return Math.min(100, score)
}

/**
 * Filter high-quality reviews for analysis
 */
export function filterQualityReviews(
  reviews: ReviewData[],
  minQuality: number = 60
): ReviewData[] {
  return reviews
    .map((review) => ({ review, quality: calculateReviewQuality(review) }))
    .filter(({ quality }) => quality >= minQuality)
    .sort((a, b) => b.quality - a.quality)
    .map(({ review }) => review)
}
