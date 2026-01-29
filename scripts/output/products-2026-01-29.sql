-- Auto-generated Coupang Products
-- Generated at: 2026-01-29T16:12:19.184Z
-- Affiliate ID: AF4340778

-- 기존 상품 비활성화
UPDATE products SET is_active = false;

-- 결과 확인
SELECT c.name_ko, COUNT(*) as count
FROM products p
JOIN categories c ON p.category_id = c.id
WHERE p.is_active = true
GROUP BY c.name_ko;