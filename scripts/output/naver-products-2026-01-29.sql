-- Naver Shopping API Products
-- Generated: 2026-01-29T21:27:19.372Z

UPDATE products SET is_active = false;

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '브리츠 오픈형 블루투스 이어폰 귀찌 귀걸이형 운동 러닝 무선 이어폰 노이즈 캔슬링', '브리츠', 49900, 'https://shopping-phinf.pstatic.net/main_8904621/89046219575.6.jpg', 'https://smartstore.naver.com/main/products/11501709210', 'https://www.coupang.com/np/search?q=%EB%B8%8C%EB%A6%AC%EC%B8%A0%20%EC%98%A4%ED%94%88%ED%98%95%20%EB%B8%94%EB%A3%A8%ED%88%AC%EC%8A%A4%20%EC%9D%B4%EC%96%B4%ED%8F%B0%20%EA%B7%80%EC%B0%8C', '["budget","open_type"]'::jsonb, true
FROM categories c WHERE c.slug = 'earbuds';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '베이스어스 Bowie MC1 오픈형 이어폰', '베이스어스', 49890, 'https://shopping-phinf.pstatic.net/main_5395752/53957526721.20250409101838.jpg', 'https://search.shopping.naver.com/catalog/53957526721', 'https://www.coupang.com/np/search?q=%EB%B2%A0%EC%9D%B4%EC%8A%A4%EC%96%B4%EC%8A%A4%20Bowie%20MC1%20%EC%98%A4%ED%94%88%ED%98%95%20%EC%9D%B4%EC%96%B4%ED%8F%B0', '["budget","open_type"]'::jsonb, true
FROM categories c WHERE c.slug = 'earbuds';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '브리츠 Realfit5', '브리츠', 47090, 'https://shopping-phinf.pstatic.net/main_5387341/53873413805.20250331114900.jpg', 'https://search.shopping.naver.com/catalog/53873413805', 'https://www.coupang.com/np/search?q=%EB%B8%8C%EB%A6%AC%EC%B8%A0%20Realfit5', '["budget"]'::jsonb, true
FROM categories c WHERE c.slug = 'earbuds';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '로랜텍 RSM-R540', '로랜텍', 43820, 'https://shopping-phinf.pstatic.net/main_5833086/58330865128.20251230171907.jpg', 'https://search.shopping.naver.com/catalog/58330865128', 'https://www.coupang.com/np/search?q=%EB%A1%9C%EB%9E%9C%ED%85%8D%20RSM%20R540', '["budget"]'::jsonb, true
FROM categories c WHERE c.slug = 'earbuds';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, 'QCY CT06 오픈형 귀찌 무선 블루투스 이어폰 귀안아픈 러닝 자전거 운동용 이어커프', 'QCY', 42900, 'https://shopping-phinf.pstatic.net/main_9024132/90241327597.jpg', 'https://smartstore.naver.com/main/products/12696816673', 'https://www.coupang.com/np/search?q=QCY%20CT06%20%EC%98%A4%ED%94%88%ED%98%95%20%EA%B7%80%EC%B0%8C%20%EB%AC%B4%EC%84%A0', '["budget","open_type"]'::jsonb, true
FROM categories c WHERE c.slug = 'earbuds';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '브리츠 BZ-Fit3', '브리츠', 42900, 'https://shopping-phinf.pstatic.net/main_5390035/53900357898.20250401100610.jpg', 'https://search.shopping.naver.com/catalog/53900357898', 'https://www.coupang.com/np/search?q=%EB%B8%8C%EB%A6%AC%EC%B8%A0%20BZ%20Fit3', '["budget"]'::jsonb, true
FROM categories c WHERE c.slug = 'earbuds';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, 'QCY QCY-HT08', 'QCY', 41500, 'https://shopping-phinf.pstatic.net/main_5500195/55001955408.20250529144928.jpg', 'https://search.shopping.naver.com/catalog/55001955408', 'https://www.coupang.com/np/search?q=QCY%20QCY%20HT08', '["budget"]'::jsonb, true
FROM categories c WHERE c.slug = 'earbuds';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '브리츠 ProPods5Plus', '브리츠', 34900, 'https://shopping-phinf.pstatic.net/main_5528453/55284534059.20250613144915.jpg', 'https://search.shopping.naver.com/catalog/55284534059', 'https://www.coupang.com/np/search?q=%EB%B8%8C%EB%A6%AC%EC%B8%A0%20ProPods5Plus', '["budget"]'::jsonb, true
FROM categories c WHERE c.slug = 'earbuds';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '브리츠 StormTWS7', '브리츠', 32900, 'https://shopping-phinf.pstatic.net/main_5354704/53547046320.20250314113444.jpg', 'https://search.shopping.naver.com/catalog/53547046320', 'https://www.coupang.com/np/search?q=%EB%B8%8C%EB%A6%AC%EC%B8%A0%20StormTWS7', '["budget"]'::jsonb, true
FROM categories c WHERE c.slug = 'earbuds';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '베이스어스 BP1 PRO 노이즈캔슬링 이어폰', '베이스어스', 29900, 'https://shopping-phinf.pstatic.net/main_5747436/57474367418.20251031152824.jpg', 'https://search.shopping.naver.com/catalog/57474367418', 'https://www.coupang.com/np/search?q=%EB%B2%A0%EC%9D%B4%EC%8A%A4%EC%96%B4%EC%8A%A4%20BP1%20PRO%20%EB%85%B8%EC%9D%B4%EC%A6%88%EC%BA%94%EC%8A%AC%EB%A7%81%20%EC%9D%B4%EC%96%B4%ED%8F%B0', '["budget","anc"]'::jsonb, true
FROM categories c WHERE c.slug = 'earbuds';

