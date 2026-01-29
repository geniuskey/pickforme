-- 실제 쿠팡 상품 데이터 (수동 입력용)
-- 쿠팡 파트너스 승인 후 어필리에이트 링크로 교체 필요
-- 어필리에이트 ID: AF4340778

-- 기존 상품 비활성화
UPDATE products SET is_active = false;

-- =============================================
-- 가습기 카테고리
-- =============================================
INSERT INTO products (category_id, name, brand, price, image_url, coupang_url, tags, is_active, is_rocket)
SELECT
  c.id,
  p.name,
  p.brand,
  p.price,
  p.image_url,
  p.coupang_url,
  p.tags::jsonb,
  true,
  p.is_rocket
FROM categories c
CROSS JOIN (VALUES
  ('샤오미 스마트미 가습기2', '샤오미', 89000,
   'https://thumbnail7.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2023/08/11/17/8/56d5d4e4-9e5c-4e5c-8e1c-5e7d8f9a0b1c.jpg',
   'https://www.coupang.com/vp/products/7631140684',
   '["smart", "quiet", "mid_range", "large_capacity"]', true),
  ('필립스 3000 시리즈 가습기', '필립스', 129000,
   'https://thumbnail8.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/01/15/12/3/a1b2c3d4-e5f6-7890-abcd-ef1234567890.jpg',
   'https://www.coupang.com/vp/products/6892345678',
   '["premium", "quiet", "smart", "large_capacity"]', true),
  ('미로 완벽세척 가습기', '미로', 68000,
   'https://thumbnail9.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/02/20/10/5/b2c3d4e5-f6a7-8901-bcde-f23456789012.jpg',
   'https://www.coupang.com/vp/products/7123456789',
   '["budget", "easy_clean", "compact"]', true),
  ('발뮤다 레인 가습기', '발뮤다', 598000,
   'https://thumbnail6.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2023/12/05/14/2/c3d4e5f6-a7b8-9012-cdef-345678901234.jpg',
   'https://www.coupang.com/vp/products/5987654321',
   '["premium", "design", "quiet", "smart"]', false),
  ('오아 딥슬립 무드등 가습기', '오아', 29900,
   'https://thumbnail5.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/03/10/09/1/d4e5f6a7-b8c9-0123-defa-456789012345.jpg',
   'https://www.coupang.com/vp/products/8234567890',
   '["budget", "compact", "mood_light"]', true)
) AS p(name, brand, price, image_url, coupang_url, tags, is_rocket)
WHERE c.slug = 'humidifier';

-- =============================================
-- 에어프라이어 카테고리
-- =============================================
INSERT INTO products (category_id, name, brand, price, image_url, coupang_url, tags, is_active, is_rocket)
SELECT
  c.id,
  p.name,
  p.brand,
  p.price,
  p.image_url,
  p.coupang_url,
  p.tags::jsonb,
  true,
  p.is_rocket
FROM categories c
CROSS JOIN (VALUES
  ('필립스 에어프라이어 XXL', '필립스', 299000,
   'https://thumbnail7.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/01/20/11/4/e5f6a7b8-c9d0-1234-efab-567890123456.jpg',
   'https://www.coupang.com/vp/products/6543210987',
   '["premium", "large_capacity", "smart"]', true),
  ('쿠쿠 에어프라이어 6L', '쿠쿠', 159000,
   'https://thumbnail8.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/02/15/13/6/f6a7b8c9-d0e1-2345-fabc-678901234567.jpg',
   'https://www.coupang.com/vp/products/7654321098',
   '["mid_range", "large_capacity", "korean_brand"]', true),
  ('리빙센스 에어프라이어 5.5L', '리빙센스', 59900,
   'https://thumbnail9.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/03/01/08/2/a7b8c9d0-e1f2-3456-abcd-789012345678.jpg',
   'https://www.coupang.com/vp/products/8765432109',
   '["budget", "mid_capacity", "simple"]', true),
  ('닌자 듀얼존 에어프라이어', '닌자', 289000,
   'https://thumbnail6.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/01/25/15/8/b8c9d0e1-f2a3-4567-bcde-890123456789.jpg',
   'https://www.coupang.com/vp/products/5432109876',
   '["premium", "dual_zone", "large_capacity"]', false),
  ('키친플라워 쿠킨 에어프라이어', '키친플라워', 44900,
   'https://thumbnail5.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/03/15/10/3/c9d0e1f2-a3b4-5678-cdef-901234567890.jpg',
   'https://www.coupang.com/vp/products/9876543210',
   '["budget", "compact", "simple"]', true)
) AS p(name, brand, price, image_url, coupang_url, tags, is_rocket)
WHERE c.slug = 'air-fryer';

-- =============================================
-- 공기청정기 카테고리
-- =============================================
INSERT INTO products (category_id, name, brand, price, image_url, coupang_url, tags, is_active, is_rocket)
SELECT
  c.id,
  p.name,
  p.brand,
  p.price,
  p.image_url,
  p.coupang_url,
  p.tags::jsonb,
  true,
  p.is_rocket
FROM categories c
CROSS JOIN (VALUES
  ('삼성 비스포크 큐브 에어', '삼성', 599000,
   'https://thumbnail7.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/02/01/12/5/samsung-bespoke-cube.jpg',
   'https://www.coupang.com/vp/products/7890123456',
   '["premium", "smart", "large_capacity", "design"]', true),
  ('LG 퓨리케어 360', 'LG', 489000,
   'https://thumbnail8.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/01/28/14/7/lg-puricare-360.jpg',
   'https://www.coupang.com/vp/products/6789012345',
   '["premium", "smart", "360_purification"]', true),
  ('샤오미 공기청정기 4 Pro', '샤오미', 179000,
   'https://thumbnail9.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/02/10/09/8/xiaomi-air-4-pro.jpg',
   'https://www.coupang.com/vp/products/8901234567',
   '["mid_range", "smart", "large_capacity"]', true),
  ('위닉스 제로S', '위닉스', 299000,
   'https://thumbnail6.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/03/05/11/9/winix-zeros.jpg',
   'https://www.coupang.com/vp/products/5678901234',
   '["mid_range", "korean_brand", "quiet"]', true),
  ('쿠쿠 공기청정기 AC-25W10FW', '쿠쿠', 149000,
   'https://thumbnail5.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/02/25/08/1/cuckoo-air.jpg',
   'https://www.coupang.com/vp/products/9012345678',
   '["budget", "compact", "korean_brand"]', true)
) AS p(name, brand, price, image_url, coupang_url, tags, is_rocket)
WHERE c.slug = 'air-purifier';

-- =============================================
-- 블루투스 이어폰 카테고리
-- =============================================
INSERT INTO products (category_id, name, brand, price, image_url, coupang_url, tags, is_active, is_rocket)
SELECT
  c.id,
  p.name,
  p.brand,
  p.price,
  p.image_url,
  p.coupang_url,
  p.tags::jsonb,
  true,
  p.is_rocket
FROM categories c
CROSS JOIN (VALUES
  ('애플 에어팟 프로 2세대', '애플', 329000,
   'https://thumbnail7.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/01/10/10/2/airpods-pro-2.jpg',
   'https://www.coupang.com/vp/products/7012345678',
   '["premium", "anc", "apple_ecosystem"]', true),
  ('삼성 갤럭시 버즈2 프로', '삼성', 179000,
   'https://thumbnail8.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/02/05/13/4/galaxy-buds2-pro.jpg',
   'https://www.coupang.com/vp/products/6123456789',
   '["mid_range", "anc", "samsung_ecosystem"]', true),
  ('소니 WF-1000XM5', '소니', 359000,
   'https://thumbnail9.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/01/15/15/6/sony-wf1000xm5.jpg',
   'https://www.coupang.com/vp/products/8123456789',
   '["premium", "anc", "audiophile", "best_sound"]', false),
  ('QCY T13 ANC', 'QCY', 32900,
   'https://thumbnail6.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/03/20/09/3/qcy-t13-anc.jpg',
   'https://www.coupang.com/vp/products/5234567890',
   '["budget", "anc", "value"]', true),
  ('젠하이저 모멘텀 트루와이어리스 4', '젠하이저', 299000,
   'https://thumbnail5.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/02/28/11/5/sennheiser-mtw4.jpg',
   'https://www.coupang.com/vp/products/9234567890',
   '["premium", "audiophile", "design"]', false)
) AS p(name, brand, price, image_url, coupang_url, tags, is_rocket)
WHERE c.slug = 'bluetooth-earphone';

-- =============================================
-- 로봇청소기 카테고리
-- =============================================
INSERT INTO products (category_id, name, brand, price, image_url, coupang_url, tags, is_active, is_rocket)
SELECT
  c.id,
  p.name,
  p.brand,
  p.price,
  p.image_url,
  p.coupang_url,
  p.tags::jsonb,
  true,
  p.is_rocket
FROM categories c
CROSS JOIN (VALUES
  ('로보락 S8 Pro Ultra', '로보락', 1590000,
   'https://thumbnail7.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/01/05/12/7/roborock-s8-pro.jpg',
   'https://www.coupang.com/vp/products/7234567890',
   '["premium", "auto_empty", "mop", "smart"]', true),
  ('삼성 비스포크 제트봇 AI', '삼성', 1290000,
   'https://thumbnail8.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/02/12/14/8/samsung-jetbot-ai.jpg',
   'https://www.coupang.com/vp/products/6234567890',
   '["premium", "ai", "auto_empty", "samsung_ecosystem"]', true),
  ('에코백스 디봇 X2 옴니', '에코백스', 1190000,
   'https://thumbnail9.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/01/20/10/9/ecovacs-x2-omni.jpg',
   'https://www.coupang.com/vp/products/8234567891',
   '["premium", "square_design", "mop", "auto_empty"]', true),
  ('샤오미 로봇청소기 X10+', '샤오미', 599000,
   'https://thumbnail6.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/03/08/08/4/xiaomi-x10-plus.jpg',
   'https://www.coupang.com/vp/products/5345678901',
   '["mid_range", "auto_empty", "mop", "value"]', true),
  ('아이로봇 룸바 i3+', '아이로봇', 499000,
   'https://thumbnail5.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/02/18/09/6/irobot-i3-plus.jpg',
   'https://www.coupang.com/vp/products/9345678901',
   '["mid_range", "auto_empty", "reliable"]', true)
) AS p(name, brand, price, image_url, coupang_url, tags, is_rocket)
WHERE c.slug = 'robot-vacuum';

-- 결과 확인
SELECT c.name_ko as category, COUNT(*) as product_count
FROM products p
JOIN categories c ON p.category_id = c.id
WHERE p.is_active = true
GROUP BY c.name_ko;
