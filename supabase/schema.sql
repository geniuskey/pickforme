-- PickForMe Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(100) UNIQUE NOT NULL,
  name_ko VARCHAR(100) NOT NULL,
  name_en VARCHAR(100) NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  is_active BOOLEAN DEFAULT true,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Questions table
CREATE TABLE IF NOT EXISTS questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  order_num INTEGER NOT NULL,
  question_text TEXT NOT NULL,
  question_type VARCHAR(20) DEFAULT 'yes_no',
  options JSONB,
  tags_yes JSONB DEFAULT '[]',
  tags_no JSONB DEFAULT '[]',
  weight INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  name VARCHAR(500) NOT NULL,
  brand VARCHAR(100),
  price INTEGER,
  image_url TEXT,
  coupang_url TEXT NOT NULL,
  naver_url TEXT,
  elevenst_url TEXT,
  tags JSONB NOT NULL DEFAULT '[]',
  score_base INTEGER DEFAULT 50,
  rating DECIMAL(2,1),
  review_count INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Result types table
CREATE TABLE IF NOT EXISTS result_types (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  type_code VARCHAR(50) NOT NULL,
  type_name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  tag_conditions JSONB NOT NULL DEFAULT '[]',
  emoji VARCHAR(10),
  priority INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Test sessions table (Analytics)
CREATE TABLE IF NOT EXISTS test_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID REFERENCES categories(id),
  user_id UUID,
  answers JSONB,
  result_type_id UUID REFERENCES result_types(id),
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Users table (Phase 2)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  nickname VARCHAR(50),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User history table (Phase 2)
CREATE TABLE IF NOT EXISTS user_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id),
  result_type_id UUID REFERENCES result_types(id),
  result_image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Price history table (Phase 3)
CREATE TABLE IF NOT EXISTS price_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  platform VARCHAR(20) NOT NULL,
  price INTEGER NOT NULL,
  recorded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_is_active ON categories(is_active);
CREATE INDEX IF NOT EXISTS idx_questions_category ON questions(category_id);
CREATE INDEX IF NOT EXISTS idx_questions_order ON questions(category_id, order_num);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_result_types_category ON result_types(category_id);
CREATE INDEX IF NOT EXISTS idx_test_sessions_category ON test_sessions(category_id);
CREATE INDEX IF NOT EXISTS idx_user_history_user ON user_history(user_id);
CREATE INDEX IF NOT EXISTS idx_price_history_product ON price_history(product_id);

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to increment view count
CREATE OR REPLACE FUNCTION increment_view_count(category_slug VARCHAR)
RETURNS void AS $$
BEGIN
  UPDATE categories
  SET view_count = view_count + 1
  WHERE slug = category_slug;
END;
$$ LANGUAGE plpgsql;

-- RLS Policies

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE result_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE price_history ENABLE ROW LEVEL SECURITY;

-- Public read access for categories, questions, products, result_types
CREATE POLICY "Public read access for categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read access for questions" ON questions FOR SELECT USING (true);
CREATE POLICY "Public read access for products" ON products FOR SELECT USING (true);
CREATE POLICY "Public read access for result_types" ON result_types FOR SELECT USING (true);

-- Test sessions: anyone can insert, only owner can read their own
CREATE POLICY "Anyone can create test sessions" ON test_sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can read their own sessions" ON test_sessions FOR SELECT USING (
  user_id IS NULL OR user_id = auth.uid()
);

-- Users: only own data
CREATE POLICY "Users can read own data" ON users FOR SELECT USING (id = auth.uid());
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (id = auth.uid());
CREATE POLICY "Users can insert own data" ON users FOR INSERT WITH CHECK (id = auth.uid());

-- User history: only own data
CREATE POLICY "Users can read own history" ON user_history FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can insert own history" ON user_history FOR INSERT WITH CHECK (user_id = auth.uid());

-- Price history: public read
CREATE POLICY "Public read access for price_history" ON price_history FOR SELECT USING (true);
