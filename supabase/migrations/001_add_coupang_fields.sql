-- Add Coupang-specific fields to products table
-- Run this in Supabase SQL Editor after initial schema

-- Add new columns
ALTER TABLE products ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS coupang_product_id VARCHAR(100);
ALTER TABLE products ADD COLUMN IF NOT EXISTS is_rocket BOOLEAN DEFAULT false;
ALTER TABLE products ADD COLUMN IF NOT EXISTS is_free_shipping BOOLEAN DEFAULT false;
ALTER TABLE products ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

-- Add index for coupang_product_id
CREATE INDEX IF NOT EXISTS idx_products_coupang_id ON products(coupang_product_id);

-- Add index for display_order
CREATE INDEX IF NOT EXISTS idx_products_display_order ON products(category_id, display_order);
