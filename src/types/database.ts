// Database types for Supabase

export interface Category {
  id: string
  slug: string
  name_ko: string
  name_en: string
  description: string | null
  icon: string | null
  is_active: boolean
  view_count: number
  created_at: string
  updated_at: string
}

export interface Question {
  id: string
  category_id: string
  order_num: number
  question_text: string
  question_type: 'yes_no' | 'choice'
  options: string[] | null
  tags_yes: string[]
  tags_no: string[]
  weight: number
  created_at: string
}

export interface Product {
  id: string
  category_id: string
  name: string
  brand: string | null
  price: number | null
  image_url: string | null
  coupang_url: string
  naver_url?: string | null
  elevenst_url?: string | null
  tags: string[]
  score_base: number
  rating: number | null
  review_count: number | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface ResultType {
  id: string
  category_id: string
  type_code: string
  type_name: string
  description: string
  tag_conditions: string[]
  priority: number
  emoji?: string | null
  created_at: string
}

export interface TestSession {
  id: string
  category_id: string
  user_id?: string | null
  answers: Answer[]
  result_type_id: string | null
  completed: boolean
  created_at: string
}

export interface Answer {
  question_id: string
  answer: string
}

// User types (Phase 2)
export interface User {
  id: string
  email: string
  nickname: string | null
  avatar_url: string | null
  created_at: string
}

export interface UserHistory {
  id: string
  user_id: string
  category_id: string
  result_type_id: string
  result_image_url: string | null
  created_at: string
}

// Price tracking (Phase 3)
export interface PriceHistory {
  id: string
  product_id: string
  platform: 'coupang' | 'naver' | '11st'
  price: number
  recorded_at: string
}

// Database schema type for Supabase client
export interface Database {
  public: {
    Tables: {
      categories: {
        Row: Category
        Insert: Omit<Category, 'id' | 'created_at' | 'updated_at' | 'view_count'>
        Update: Partial<Omit<Category, 'id' | 'created_at'>>
      }
      questions: {
        Row: Question
        Insert: Omit<Question, 'id' | 'created_at'>
        Update: Partial<Omit<Question, 'id' | 'created_at'>>
      }
      products: {
        Row: Product
        Insert: Omit<Product, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Product, 'id' | 'created_at'>>
      }
      result_types: {
        Row: ResultType
        Insert: Omit<ResultType, 'id' | 'created_at'>
        Update: Partial<Omit<ResultType, 'id' | 'created_at'>>
      }
      test_sessions: {
        Row: TestSession
        Insert: Omit<TestSession, 'id' | 'created_at'>
        Update: Partial<Omit<TestSession, 'id' | 'created_at'>>
      }
      users: {
        Row: User
        Insert: Omit<User, 'id' | 'created_at'>
        Update: Partial<Omit<User, 'id' | 'created_at'>>
      }
      user_history: {
        Row: UserHistory
        Insert: Omit<UserHistory, 'id' | 'created_at'>
        Update: Partial<Omit<UserHistory, 'id' | 'created_at'>>
      }
      price_history: {
        Row: PriceHistory
        Insert: Omit<PriceHistory, 'id'>
        Update: Partial<Omit<PriceHistory, 'id'>>
      }
    }
  }
}
