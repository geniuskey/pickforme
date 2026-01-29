// API Request/Response types

import { Category, Question, Product, ResultType, Answer } from './database'

// Categories API
export interface CategoriesResponse {
  categories: Pick<Category, 'id' | 'slug' | 'name_ko' | 'name_en' | 'icon' | 'view_count' | 'description'>[]
}

// Test API
export interface TestResponse {
  category: Pick<Category, 'id' | 'name_ko' | 'name_en' | 'icon' | 'description'>
  questions: Pick<Question, 'id' | 'order_num' | 'question_text' | 'question_type' | 'options'>[]
}

// Result API
export interface ResultRequest {
  category_id: string
  answers: Answer[]
}

export interface ProductWithRank extends Product {
  rank: number
  match_reason: string
  calculated_score: number
}

export interface ResultResponse {
  result_type: Pick<ResultType, 'type_name' | 'type_code' | 'description' | 'emoji'>
  products: ProductWithRank[]
  user_tags: string[]
}

// Admin Generate API
export interface GenerateRequest {
  category_name: string
  api_key: string
}

export interface GenerateResponse {
  success: boolean
  category_id?: string
  message: string
}

// Error Response
export interface ErrorResponse {
  error: string
  message: string
}

// Share types
export interface ShareData {
  title: string
  text: string
  url: string
}
