-- Naver Shopping API Products
-- Generated: 2026-01-30T12:43:44.437Z

UPDATE products SET is_active = false;

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '스테나 STN 100 그레이', '스테나', 398000, 'https://shopping-phinf.pstatic.net/main_5515213/55152131810.20260106123601.jpg', 'https://search.shopping.naver.com/catalog/55152131810', 'https://www.coupang.com/np/search?q=%EC%8A%A4%ED%85%8C%EB%82%98%20STN%20100%20%EA%B7%B8%EB%A0%88%EC%9D%B4', '["luxury"]'::jsonb, true
FROM categories c WHERE c.slug = 'humidifier';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '스텐팟 6L 대용량 스텐 가열식 가습기 올스텐 신생아 아기 가습기 화이트', '스텐팟', 349000, 'https://shopping-phinf.pstatic.net/main_8475965/84759655602.9.jpg', 'https://smartstore.naver.com/main/products/7215155280', 'https://www.coupang.com/np/search?q=%EC%8A%A4%ED%85%90%ED%8C%9F%206L%20%EB%8C%80%EC%9A%A9%EB%9F%89%20%EC%8A%A4%ED%85%90%20%EA%B0%80%EC%97%B4%EC%8B%9D', '["luxury","large_capacity"]'::jsonb, true
FROM categories c WHERE c.slug = 'humidifier';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '조지루시 가열식 가습기 대용량 4L 아기 신생아 220V', '조지루시', 329000, 'https://shopping-phinf.pstatic.net/main_8680059/86800596005.13.jpg', 'https://smartstore.naver.com/main/products/9256095682', 'https://www.coupang.com/np/search?q=%EC%A1%B0%EC%A7%80%EB%A3%A8%EC%8B%9C%20%EA%B0%80%EC%97%B4%EC%8B%9D%20%EA%B0%80%EC%8A%B5%EA%B8%B0%20%EB%8C%80%EC%9A%A9%EB%9F%89%204L', '["luxury","large_capacity"]'::jsonb, true
FROM categories c WHERE c.slug = 'humidifier';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '케어팟 가습기 X50V 화이트', '케어팟', 269000, 'https://shopping-phinf.pstatic.net/main_5337409/53374097884.20250909111723.jpg', 'https://search.shopping.naver.com/catalog/53374097884', 'https://www.coupang.com/np/search?q=%EC%BC%80%EC%96%B4%ED%8C%9F%20%EA%B0%80%EC%8A%B5%EA%B8%B0%20X50V%20%ED%99%94%EC%9D%B4%ED%8A%B8', '["premium"]'::jsonb, true
FROM categories c WHERE c.slug = 'humidifier';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '블루필 블랙크리스탈 가열식 가습기 대용량 올스텐 IH 온열 인덕션 신생아 아기 밥솥', '블루필', 245000, 'https://shopping-phinf.pstatic.net/main_8687275/86872753509.7.jpg', 'https://smartstore.naver.com/main/products/9328253186', 'https://www.coupang.com/np/search?q=%EB%B8%94%EB%A3%A8%ED%95%84%20%EB%B8%94%EB%9E%99%ED%81%AC%EB%A6%AC%EC%8A%A4%ED%83%88%20%EA%B0%80%EC%97%B4%EC%8B%9D%20%EA%B0%80%EC%8A%B5%EA%B8%B0%20%EB%8C%80%EC%9A%A9%EB%9F%89', '["premium","large_capacity"]'::jsonb, true
FROM categories c WHERE c.slug = 'humidifier';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '신일 25L 대용량 초음파 가습기 사무실 대형 거실 통세척 무소음 타워형 업소용 산업용', '신일전자', 239000, 'https://shopping-phinf.pstatic.net/main_8712371/87123711760.1.jpg', 'https://smartstore.naver.com/main/products/9579209490', 'https://www.coupang.com/np/search?q=%EC%8B%A0%EC%9D%BC%2025L%20%EB%8C%80%EC%9A%A9%EB%9F%89%20%EC%B4%88%EC%9D%8C%ED%8C%8C%20%EA%B0%80%EC%8A%B5%EA%B8%B0', '["premium","quiet","large_capacity"]'::jsonb, true
FROM categories c WHERE c.slug = 'humidifier';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '신일 초음파 가습기 대용량 사무실 가정용 업소용 세척쉬운 저소음 27L', '신일전자', 239000, 'https://shopping-phinf.pstatic.net/main_9019558/90195587137.1.jpg', 'https://smartstore.naver.com/main/products/12651076231', 'https://www.coupang.com/np/search?q=%EC%8B%A0%EC%9D%BC%20%EC%B4%88%EC%9D%8C%ED%8C%8C%20%EA%B0%80%EC%8A%B5%EA%B8%B0%20%EB%8C%80%EC%9A%A9%EB%9F%89%20%EC%82%AC%EB%AC%B4%EC%8B%A4', '["premium","quiet","large_capacity"]'::jsonb, true
FROM categories c WHERE c.slug = 'humidifier';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '신일 대용량 가습기 초음파 통세척 사무실 거실 세척편한 대형 25L', '신일전자', 239000, 'https://shopping-phinf.pstatic.net/main_8262832/82628328392.5.jpg', 'https://smartstore.naver.com/main/products/5083806694', 'https://www.coupang.com/np/search?q=%EC%8B%A0%EC%9D%BC%20%EB%8C%80%EC%9A%A9%EB%9F%89%20%EA%B0%80%EC%8A%B5%EA%B8%B0%20%EC%B4%88%EC%9D%8C%ED%8C%8C%20%ED%86%B5%EC%84%B8%EC%B2%99', '["premium","large_capacity"]'::jsonb, true
FROM categories c WHERE c.slug = 'humidifier';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '에디르 대용량 복합식 가습기 프로 화이트', '에디르', 198000, 'https://shopping-phinf.pstatic.net/main_5734295/57342953301.20251024092903.jpg', 'https://search.shopping.naver.com/catalog/57342953301', 'https://www.coupang.com/np/search?q=%EC%97%90%EB%94%94%EB%A5%B4%20%EB%8C%80%EC%9A%A9%EB%9F%89%20%EB%B3%B5%ED%95%A9%EC%8B%9D%20%EA%B0%80%EC%8A%B5%EA%B8%B0%20%ED%94%84%EB%A1%9C', '["premium","large_capacity"]'::jsonb, true
FROM categories c WHERE c.slug = 'humidifier';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '한일 프리미엄 가열식 가습기 신생아 아기 가습기 최신형 물멍 대용량 저소음 살균 화이트', '한일', 189000, 'https://shopping-phinf.pstatic.net/main_8993486/89934868838.3.jpg', 'https://smartstore.naver.com/main/products/12390358113', 'https://www.coupang.com/np/search?q=%ED%95%9C%EC%9D%BC%20%ED%94%84%EB%A6%AC%EB%AF%B8%EC%97%84%20%EA%B0%80%EC%97%B4%EC%8B%9D%20%EA%B0%80%EC%8A%B5%EA%B8%B0%20%EC%8B%A0%EC%83%9D%EC%95%84', '["premium","quiet","large_capacity"]'::jsonb, true
FROM categories c WHERE c.slug = 'humidifier';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '오넬리 듀얼 스팀 에어프라이어 오븐형 올스텐 대용량 에어프라이기 로티세리 자동세척 20L', 'ONELEE', 399000, 'https://shopping-phinf.pstatic.net/main_8551028/85510286941.13.jpg', 'https://smartstore.naver.com/main/products/7965786618', 'https://www.coupang.com/np/search?q=%EC%98%A4%EB%84%AC%EB%A6%AC%20%EB%93%80%EC%96%BC%20%EC%8A%A4%ED%8C%80%20%EC%97%90%EC%96%B4%ED%94%84%EB%9D%BC%EC%9D%B4%EC%96%B4%20%EC%98%A4%EB%B8%90%ED%98%95', '["luxury","large_capacity"]'::jsonb, true
FROM categories c WHERE c.slug = 'air-fryer';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '닌자 AG551KR 블랙', '닌자', 374800, 'https://shopping-phinf.pstatic.net/main_5219125/52191252620.20241230171849.jpg', 'https://search.shopping.naver.com/catalog/52191252620', 'https://www.coupang.com/np/search?q=%EB%8B%8C%EC%9E%90%20AG551KR%20%EB%B8%94%EB%9E%99', '["luxury"]'::jsonb, true
FROM categories c WHERE c.slug = 'air-fryer';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '샤크닌자 닌자 SFP701KR 블랙', '닌자', 317970, 'https://shopping-phinf.pstatic.net/main_5219125/52191252645.20241230173627.jpg', 'https://search.shopping.naver.com/catalog/52191252645', 'https://www.coupang.com/np/search?q=%EC%83%A4%ED%81%AC%EB%8B%8C%EC%9E%90%20%EB%8B%8C%EC%9E%90%20SFP701KR%20%EB%B8%94%EB%9E%99', '["luxury"]'::jsonb, true
FROM categories c WHERE c.slug = 'air-fryer';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '스테나 퓨어 304 스텐', '스테나', 297810, 'https://shopping-phinf.pstatic.net/main_5218930/52189304624.20241230144753.jpg', 'https://search.shopping.naver.com/catalog/52189304624', 'https://www.coupang.com/np/search?q=%EC%8A%A4%ED%85%8C%EB%82%98%20%ED%93%A8%EC%96%B4%20304%20%EC%8A%A4%ED%85%90', '["premium"]'::jsonb, true
FROM categories c WHERE c.slug = 'air-fryer';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '시즌앤홈 대용량 올스텐 에어프라이어 오븐형 30L', '', 247900, 'https://shopping-phinf.pstatic.net/main_8401670/84016701308.20.jpg', 'https://smartstore.naver.com/main/products/6472200975', 'https://www.coupang.com/np/search?q=%EC%8B%9C%EC%A6%8C%EC%95%A4%ED%99%88%20%EB%8C%80%EC%9A%A9%EB%9F%89%20%EC%98%AC%EC%8A%A4%ED%85%90%20%EC%97%90%EC%96%B4%ED%94%84%EB%9D%BC%EC%9D%B4%EC%96%B4%20%EC%98%A4%EB%B8%90%ED%98%95', '["premium","large_capacity"]'::jsonb, true
FROM categories c WHERE c.slug = 'air-fryer';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '다룸 올스텐 에어프라이어 23L 화이트', '다룸', 236550, 'https://shopping-phinf.pstatic.net/main_5823007/58230071954.20260115171713.jpg', 'https://search.shopping.naver.com/catalog/58230071954', 'https://www.coupang.com/np/search?q=%EB%8B%A4%EB%A3%B8%20%EC%98%AC%EC%8A%A4%ED%85%90%20%EC%97%90%EC%96%B4%ED%94%84%EB%9D%BC%EC%9D%B4%EC%96%B4%2023L%20%ED%99%94%EC%9D%B4%ED%8A%B8', '["premium"]'::jsonb, true
FROM categories c WHERE c.slug = 'air-fryer';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '샤크닌자 닌자 AG301KR 블랙', '닌자', 203280, 'https://shopping-phinf.pstatic.net/main_5219117/52191172618.20241230164348.jpg', 'https://search.shopping.naver.com/catalog/52191172618', 'https://www.coupang.com/np/search?q=%EC%83%A4%ED%81%AC%EB%8B%8C%EC%9E%90%20%EB%8B%8C%EC%9E%90%20AG301KR%20%EB%B8%94%EB%9E%99', '["premium"]'::jsonb, true
FROM categories c WHERE c.slug = 'air-fryer';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '라쿠진 LCZ2506WT 화이트', '라쿠진', 199000, 'https://shopping-phinf.pstatic.net/main_5225145/52251457620.20251216153623.jpg', 'https://search.shopping.naver.com/catalog/52251457620', 'https://www.coupang.com/np/search?q=%EB%9D%BC%EC%BF%A0%EC%A7%84%20LCZ2506WT%20%ED%99%94%EC%9D%B4%ED%8A%B8', '["premium"]'::jsonb, true
FROM categories c WHERE c.slug = 'air-fryer';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '코렐 일렉 크리스피 바사칸 에어글라스 에어프라이어 5세대', '코렐', 189000, 'https://shopping-phinf.pstatic.net/main_9046022/90460224260.jpg', 'https://smartstore.naver.com/main/products/12915713268', 'https://www.coupang.com/np/search?q=%EC%BD%94%EB%A0%90%20%EC%9D%BC%EB%A0%89%20%ED%81%AC%EB%A6%AC%EC%8A%A4%ED%94%BC%20%EB%B0%94%EC%82%AC%EC%B9%B8%20%EC%97%90%EC%96%B4%EA%B8%80%EB%9D%BC%EC%8A%A4', '["premium"]'::jsonb, true
FROM categories c WHERE c.slug = 'air-fryer';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '박세리 오븐 에어프라이어 오븐형 대용량 올스텐 에어후라이기 포미', '', 174000, 'https://shopping-phinf.pstatic.net/main_8235525/82355258091.19.jpg', 'https://smartstore.naver.com/main/products/4810735425', 'https://www.coupang.com/np/search?q=%EB%B0%95%EC%84%B8%EB%A6%AC%20%EC%98%A4%EB%B8%90%20%EC%97%90%EC%96%B4%ED%94%84%EB%9D%BC%EC%9D%B4%EC%96%B4%20%EC%98%A4%EB%B8%90%ED%98%95%20%EB%8C%80%EC%9A%A9%EB%9F%89', '["premium","large_capacity"]'::jsonb, true
FROM categories c WHERE c.slug = 'air-fryer';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, 'LG전자 LG퓨리케어 AI+ 360˚ 공기청정기 AS355N M 필터, 샌드 베이지, +무빙휠', 'LG퓨리케어', 1384860, 'https://shopping-phinf.pstatic.net/main_5387577/53875779430.20250331173601.jpg', 'https://search.shopping.naver.com/catalog/53875779430', 'https://www.coupang.com/np/search?q=LG%EC%A0%84%EC%9E%90%20LG%ED%93%A8%EB%A6%AC%EC%BC%80%EC%96%B4%20AI%20360%20%EA%B3%B5%EA%B8%B0%EC%B2%AD%EC%A0%95%EA%B8%B0', '["luxury","lg"]'::jsonb, true
FROM categories c WHERE c.slug = 'air-purifier';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, 'LG전자 LG퓨리케어 AI 360˚ 공기청정기 알파UP AS335N G 필터, 샌드 베이지(AS335NSAC), 단품', 'LG퓨리케어', 1049000, 'https://shopping-phinf.pstatic.net/main_5404934/54049341061.20250408182934.jpg', 'https://search.shopping.naver.com/catalog/54049341061', 'https://www.coupang.com/np/search?q=LG%EC%A0%84%EC%9E%90%20LG%ED%93%A8%EB%A6%AC%EC%BC%80%EC%96%B4%20AI%20360%20%EA%B3%B5%EA%B8%B0%EC%B2%AD%EC%A0%95%EA%B8%B0', '["luxury","lg"]'::jsonb, true
FROM categories c WHERE c.slug = 'air-purifier';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '다이슨 빅앤콰이엇 포름알데히드 공기청정기 블루골드', '다이슨', 984940, 'https://shopping-phinf.pstatic.net/main_5350878/53508783758.20250901104222.jpg', 'https://search.shopping.naver.com/catalog/53508783758', 'https://www.coupang.com/np/search?q=%EB%8B%A4%EC%9D%B4%EC%8A%A8%20%EB%B9%85%EC%95%A4%EC%BD%B0%EC%9D%B4%EC%97%87%20%ED%8F%AC%EB%A6%84%EC%95%8C%EB%8D%B0%ED%9E%88%EB%93%9C%20%EA%B3%B5%EA%B8%B0%EC%B2%AD%EC%A0%95%EA%B8%B0%20%EB%B8%94%EB%A3%A8%EA%B3%A8%EB%93%9C', '["luxury","dyson"]'::jsonb, true
FROM categories c WHERE c.slug = 'air-purifier';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, 'LG전자 LG퓨리케어 AS285DWWC V 필터, 크리미스노우', 'LG퓨리케어', 694630, 'https://shopping-phinf.pstatic.net/main_5393738/53937386410.20250403100904.jpg', 'https://search.shopping.naver.com/catalog/53937386410', 'https://www.coupang.com/np/search?q=LG%EC%A0%84%EC%9E%90%20LG%ED%93%A8%EB%A6%AC%EC%BC%80%EC%96%B4%20AS285DWWC%20V%20%ED%95%84%ED%84%B0', '["luxury","lg"]'::jsonb, true
FROM categories c WHERE c.slug = 'air-purifier';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, 'LG전자 LG퓨리케어 360˚ 공기청정기 플러스 AS305DWWA, 크리미스노우, 단품', 'LG퓨리케어', 683530, 'https://shopping-phinf.pstatic.net/main_5392044/53920444298.20250402170112.jpg', 'https://search.shopping.naver.com/catalog/53920444298', 'https://www.coupang.com/np/search?q=LG%EC%A0%84%EC%9E%90%20LG%ED%93%A8%EB%A6%AC%EC%BC%80%EC%96%B4%20360%20%EA%B3%B5%EA%B8%B0%EC%B2%AD%EC%A0%95%EA%B8%B0%20%ED%94%8C%EB%9F%AC%EC%8A%A4', '["luxury","lg"]'::jsonb, true
FROM categories c WHERE c.slug = 'air-purifier';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '다이슨 쿨 공기청정기 PC2 화이트골드', '다이슨', 591030, 'https://shopping-phinf.pstatic.net/main_5392056/53920562242.20250410172644.jpg', 'https://search.shopping.naver.com/catalog/53920562242', 'https://www.coupang.com/np/search?q=%EB%8B%A4%EC%9D%B4%EC%8A%A8%20%EC%BF%A8%20%EA%B3%B5%EA%B8%B0%EC%B2%AD%EC%A0%95%EA%B8%B0%20PC2%20%ED%99%94%EC%9D%B4%ED%8A%B8%EA%B3%A8%EB%93%9C', '["luxury","dyson"]'::jsonb, true
FROM categories c WHERE c.slug = 'air-purifier';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, 'LG전자 LG퓨리케어 AS185DWWD V 필터, 크리미스노우', 'LG퓨리케어', 537000, 'https://shopping-phinf.pstatic.net/main_5307192/53071928497.20250307165554.jpg', 'https://search.shopping.naver.com/catalog/53071928497', 'https://www.coupang.com/np/search?q=LG%EC%A0%84%EC%9E%90%20LG%ED%93%A8%EB%A6%AC%EC%BC%80%EC%96%B4%20AS185DWWD%20V%20%ED%95%84%ED%84%B0', '["luxury","lg"]'::jsonb, true
FROM categories c WHERE c.slug = 'air-purifier';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '쿠쿠전자 CUCKOO AC-28AHNL20F 어스 웜화이트', 'CUCKOO', 494900, 'https://shopping-phinf.pstatic.net/main_5350664/53506640419.20251211095206.jpg', 'https://search.shopping.naver.com/catalog/53506640419', 'https://www.coupang.com/np/search?q=%EC%BF%A0%EC%BF%A0%EC%A0%84%EC%9E%90%20CUCKOO%20AC%2028AHNL20F%20%EC%96%B4%EC%8A%A4', '["luxury"]'::jsonb, true
FROM categories c WHERE c.slug = 'air-purifier';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '하니웰 펫 공기청정기 고양이 털 냄새 알레르기 제거 HEPA필터 가정용 음이온 소형 공청기', '하니웰', 489000, 'https://shopping-phinf.pstatic.net/main_8907839/89078399004.jpg', 'https://smartstore.naver.com/main/products/11533888598', 'https://www.coupang.com/np/search?q=%ED%95%98%EB%8B%88%EC%9B%B0%20%ED%8E%AB%20%EA%B3%B5%EA%B8%B0%EC%B2%AD%EC%A0%95%EA%B8%B0%20%EA%B3%A0%EC%96%91%EC%9D%B4%20%ED%84%B8', '["luxury","compact"]'::jsonb, true
FROM categories c WHERE c.slug = 'air-purifier';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '위닉스 타워 프라임 플러스 ATTM115 실버', '위닉스', 404990, 'https://shopping-phinf.pstatic.net/main_5392044/53920444493.20250618095043.jpg', 'https://search.shopping.naver.com/catalog/53920444493', 'https://www.coupang.com/np/search?q=%EC%9C%84%EB%8B%89%EC%8A%A4%20%ED%83%80%EC%9B%8C%20%ED%94%84%EB%9D%BC%EC%9E%84%20%ED%94%8C%EB%9F%AC%EC%8A%A4%20ATTM115', '["luxury"]'::jsonb, true
FROM categories c WHERE c.slug = 'air-purifier';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, 'Apple 에어팟 프로 3세대', 'Apple', 316000, 'https://shopping-phinf.pstatic.net/main_5698701/56987011355.20251014204108.jpg', 'https://search.shopping.naver.com/catalog/56987011355', 'https://www.coupang.com/np/search?q=Apple%20%EC%97%90%EC%96%B4%ED%8C%9F%20%ED%94%84%EB%A1%9C%203%EC%84%B8%EB%8C%80', '["luxury","apple"]'::jsonb, true
FROM categories c WHERE c.slug = 'earbuds';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '삼성전자 갤럭시 버즈3 프로 SM-R630N', '갤럭시', 195000, 'https://shopping-phinf.pstatic.net/main_5350845/53508451505.20250512182009.jpg', 'https://search.shopping.naver.com/catalog/53508451505', 'https://www.coupang.com/np/search?q=%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90%20%EA%B0%A4%EB%9F%AD%EC%8B%9C%20%EB%B2%84%EC%A6%883%20%ED%94%84%EB%A1%9C%20SM', '["premium"]'::jsonb, true
FROM categories c WHERE c.slug = 'earbuds';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, 'Apple 에어팟 4 액티브 노이즈 캔슬링 MXP93KH/A', 'Apple', 160670, 'https://shopping-phinf.pstatic.net/main_5350941/53509411418.20250508153539.jpg', 'https://search.shopping.naver.com/catalog/53509411418', 'https://www.coupang.com/np/search?q=Apple%20%EC%97%90%EC%96%B4%ED%8C%9F%204%20%EC%95%A1%ED%8B%B0%EB%B8%8C%20%EB%85%B8%EC%9D%B4%EC%A6%88', '["premium","apple"]'::jsonb, true
FROM categories c WHERE c.slug = 'earbuds';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '삼성전자 갤럭시 버즈3 SM-R530N', '갤럭시', 157500, 'https://shopping-phinf.pstatic.net/main_5350770/53507707537.20250312142321.jpg', 'https://search.shopping.naver.com/catalog/53507707537', 'https://www.coupang.com/np/search?q=%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90%20%EA%B0%A4%EB%9F%AD%EC%8B%9C%20%EB%B2%84%EC%A6%883%20SM%20R530N', '["premium"]'::jsonb, true
FROM categories c WHERE c.slug = 'earbuds';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '삼성전자 갤럭시 버즈3 FE SM-R420N', '갤럭시', 130230, 'https://shopping-phinf.pstatic.net/main_5679698/56796984706.20250919155527.jpg', 'https://search.shopping.naver.com/catalog/56796984706', 'https://www.coupang.com/np/search?q=%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90%20%EA%B0%A4%EB%9F%AD%EC%8B%9C%20%EB%B2%84%EC%A6%883%20FE%20SM', '["mid_range"]'::jsonb, true
FROM categories c WHERE c.slug = 'earbuds';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '블라우풍트 BLP-OE383', '블라우풍트', 70000, 'https://shopping-phinf.pstatic.net/main_5353153/53531535646.20250918191240.jpg', 'https://search.shopping.naver.com/catalog/53531535646', 'https://www.coupang.com/np/search?q=%EB%B8%94%EB%9D%BC%EC%9A%B0%ED%92%8D%ED%8A%B8%20BLP%20OE383', '["mid_range"]'::jsonb, true
FROM categories c WHERE c.slug = 'earbuds';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '브리츠 오픈형 블루투스 이어폰 귀찌 귀걸이형 운동 러닝 무선 이어폰 노이즈 캔슬링', '브리츠', 49900, 'https://shopping-phinf.pstatic.net/main_8904621/89046219575.6.jpg', 'https://smartstore.naver.com/main/products/11501709210', 'https://www.coupang.com/np/search?q=%EB%B8%8C%EB%A6%AC%EC%B8%A0%20%EC%98%A4%ED%94%88%ED%98%95%20%EB%B8%94%EB%A3%A8%ED%88%AC%EC%8A%A4%20%EC%9D%B4%EC%96%B4%ED%8F%B0%20%EA%B7%80%EC%B0%8C', '["budget","open_type"]'::jsonb, true
FROM categories c WHERE c.slug = 'earbuds';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '베이스어스 Bowie MC1 오픈형 이어폰', '베이스어스', 49890, 'https://shopping-phinf.pstatic.net/main_5395752/53957526721.20250409101838.jpg', 'https://search.shopping.naver.com/catalog/53957526721', 'https://www.coupang.com/np/search?q=%EB%B2%A0%EC%9D%B4%EC%8A%A4%EC%96%B4%EC%8A%A4%20Bowie%20MC1%20%EC%98%A4%ED%94%88%ED%98%95%20%EC%9D%B4%EC%96%B4%ED%8F%B0', '["budget","open_type"]'::jsonb, true
FROM categories c WHERE c.slug = 'earbuds';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '로랜텍 RSM-R540', '로랜텍', 43820, 'https://shopping-phinf.pstatic.net/main_5833086/58330865128.20251230171907.jpg', 'https://search.shopping.naver.com/catalog/58330865128', 'https://www.coupang.com/np/search?q=%EB%A1%9C%EB%9E%9C%ED%85%8D%20RSM%20R540', '["budget"]'::jsonb, true
FROM categories c WHERE c.slug = 'earbuds';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, 'QCY CT06 오픈형 귀찌 무선 블루투스 이어폰 귀안아픈 러닝 자전거 운동용 이어커프', 'QCY', 42900, 'https://shopping-phinf.pstatic.net/main_9024132/90241327597.jpg', 'https://smartstore.naver.com/main/products/12696816673', 'https://www.coupang.com/np/search?q=QCY%20CT06%20%EC%98%A4%ED%94%88%ED%98%95%20%EA%B7%80%EC%B0%8C%20%EB%AC%B4%EC%84%A0', '["budget","open_type"]'::jsonb, true
FROM categories c WHERE c.slug = 'earbuds';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '드리미 X50s Pro Master 블랙, 단품', '드리미', 1989000, 'https://shopping-phinf.pstatic.net/main_5549794/55497943327.20250626101002.jpg', 'https://search.shopping.naver.com/catalog/55497943327', 'https://www.coupang.com/np/search?q=%EB%93%9C%EB%A6%AC%EB%AF%B8%20X50s%20Pro%20Master%20%EB%B8%94%EB%9E%99', '["luxury"]'::jsonb, true
FROM categories c WHERE c.slug = 'robot-vacuum';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '로보락 S9 MaxV Ultra 직배수 화이트, 단품', '로보락', 1639990, 'https://shopping-phinf.pstatic.net/main_5578442/55784428426.20250714160502.jpg', 'https://search.shopping.naver.com/catalog/55784428426', 'https://www.coupang.com/np/search?q=%EB%A1%9C%EB%B3%B4%EB%9D%BD%20S9%20MaxV%20Ultra%20%EC%A7%81%EB%B0%B0%EC%88%98', '["luxury"]'::jsonb, true
FROM categories c WHERE c.slug = 'robot-vacuum';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '로보락 S9 MaxV Ultra (S90VER+EWFD32HRR) 화이트, 단품', '로보락', 1490000, 'https://shopping-phinf.pstatic.net/main_5378775/53787754582.20250331111651.jpg', 'https://search.shopping.naver.com/catalog/53787754582', 'https://www.coupang.com/np/search?q=%EB%A1%9C%EB%B3%B4%EB%9D%BD%20S9%20MaxV%20Ultra%20%ED%99%94%EC%9D%B4%ED%8A%B8', '["luxury"]'::jsonb, true
FROM categories c WHERE c.slug = 'robot-vacuum';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, 'LG전자 코드제로 로보킹 AI 올인원 B95AWBH (프리스탠딩) 카밍 베이지, 단품', '코드제로', 1227270, 'https://shopping-phinf.pstatic.net/main_5359713/53597137117.20250317114834.jpg', 'https://search.shopping.naver.com/catalog/53597137117', 'https://www.coupang.com/np/search?q=LG%EC%A0%84%EC%9E%90%20%EC%BD%94%EB%93%9C%EC%A0%9C%EB%A1%9C%20%EB%A1%9C%EB%B3%B4%ED%82%B9%20AI%20%EC%98%AC%EC%9D%B8%EC%9B%90', '["luxury"]'::jsonb, true
FROM categories c WHERE c.slug = 'robot-vacuum';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '로보락 Qrevo Curv 2 Flow 화이트, 단품', '로보락', 1190000, 'https://shopping-phinf.pstatic.net/main_5848538/58485384625.20260113094740.jpg', 'https://search.shopping.naver.com/catalog/58485384625', 'https://www.coupang.com/np/search?q=%EB%A1%9C%EB%B3%B4%EB%9D%BD%20Qrevo%20Curv%202%20Flow', '["luxury"]'::jsonb, true
FROM categories c WHERE c.slug = 'robot-vacuum';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '삼성비스포크 스팀물걸레 AI 로봇청소기 + 스팀청정스테이션', '삼성', 1184000, 'https://shopping-phinf.pstatic.net/main_8843200/88432007063.jpg', 'https://smartstore.naver.com/main/products/10887501045', 'https://www.coupang.com/np/search?q=%EC%82%BC%EC%84%B1%EB%B9%84%EC%8A%A4%ED%8F%AC%ED%81%AC%20%EC%8A%A4%ED%8C%80%EB%AC%BC%EA%B1%B8%EB%A0%88%20AI%20%EB%A1%9C%EB%B4%87%EC%B2%AD%EC%86%8C%EA%B8%B0%20%EC%8A%A4%ED%8C%80%EC%B2%AD%EC%A0%95%EC%8A%A4%ED%85%8C%EC%9D%B4%EC%85%98', '["luxury","samsung","mop"]'::jsonb, true
FROM categories c WHERE c.slug = 'robot-vacuum';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '드리미 X50s Pro Ultra 화이트, 단품', '드리미', 989990, 'https://shopping-phinf.pstatic.net/main_5485788/54857880934.20250519140500.jpg', 'https://search.shopping.naver.com/catalog/54857880934', 'https://www.coupang.com/np/search?q=%EB%93%9C%EB%A6%AC%EB%AF%B8%20X50s%20Pro%20Ultra%20%ED%99%94%EC%9D%B4%ED%8A%B8', '["luxury"]'::jsonb, true
FROM categories c WHERE c.slug = 'robot-vacuum';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '삼성전자 BESPOKE 스팀 9600 로봇청소기 방문설치', '', 902150, 'https://shopping-phinf.pstatic.net/main_5528740/55287408519.52.jpg', 'https://link.coupang.com/re/PCSNAVERPCSDP?pageKey=9977858988&ctag=9977858988&lptag=l292251820802&itemId=21282829005&vendorItemId=89258830163&spec=10305197', 'https://www.coupang.com/np/search?q=%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90%20BESPOKE%20%EC%8A%A4%ED%8C%80%209600%20%EB%A1%9C%EB%B4%87%EC%B2%AD%EC%86%8C%EA%B8%B0', '["luxury"]'::jsonb, true
FROM categories c WHERE c.slug = 'robot-vacuum';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '에브리봇 Q11 화이트, 단품', '에브리봇', 849000, 'https://shopping-phinf.pstatic.net/main_5744961/57449616455.20260123091551.jpg', 'https://search.shopping.naver.com/catalog/57449616455', 'https://www.coupang.com/np/search?q=%EC%97%90%EB%B8%8C%EB%A6%AC%EB%B4%87%20Q11%20%ED%99%94%EC%9D%B4%ED%8A%B8%20%EB%8B%A8%ED%92%88', '["luxury"]'::jsonb, true
FROM categories c WHERE c.slug = 'robot-vacuum';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '에코백스 디봇 T80 옴니 화이트, 단품', '에코백스', 799000, 'https://shopping-phinf.pstatic.net/main_5507678/55076784706.20250602104104.jpg', 'https://search.shopping.naver.com/catalog/55076784706', 'https://www.coupang.com/np/search?q=%EC%97%90%EC%BD%94%EB%B0%B1%EC%8A%A4%20%EB%94%94%EB%B4%87%20T80%20%EC%98%B4%EB%8B%88%20%ED%99%94%EC%9D%B4%ED%8A%B8', '["luxury"]'::jsonb, true
FROM categories c WHERE c.slug = 'robot-vacuum';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, 'Apple 워치 울트라 3 내추럴 티타늄, 49mm, 앵커 블루 오션 밴드', 'Apple', 1186550, 'https://shopping-phinf.pstatic.net/main_5669107/56691077076.20251125094856.jpg', 'https://search.shopping.naver.com/catalog/56691077076', 'https://www.coupang.com/np/search?q=Apple%20%EC%9B%8C%EC%B9%98%20%EC%9A%B8%ED%8A%B8%EB%9D%BC%203%20%EB%82%B4%EC%B6%94%EB%9F%B4', '["luxury","apple"]'::jsonb, true
FROM categories c WHERE c.slug = 'smart-watch';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '가민 포러너 970 러닝 GPS 스마트워치', '가민', 1089000, 'https://shopping-phinf.pstatic.net/main_5490977/54909773652.20250522135534.jpg', 'https://search.shopping.naver.com/catalog/54909773652', 'https://www.coupang.com/np/search?q=%EA%B0%80%EB%AF%BC%20%ED%8F%AC%EB%9F%AC%EB%84%88%20970%20%EB%9F%AC%EB%8B%9D%20GPS', '["luxury","smart"]'::jsonb, true
FROM categories c WHERE c.slug = 'smart-watch';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, 'Apple 애플워치 울트라 2 내추럴 티타늄 49mm, 트레일 루프 블루/블랙', '애플워치', 889000, 'https://shopping-phinf.pstatic.net/main_9015099/90150999028.jpg', 'https://smartstore.naver.com/main/products/12606488173', 'https://www.coupang.com/np/search?q=Apple%20%EC%95%A0%ED%94%8C%EC%9B%8C%EC%B9%98%20%EC%9A%B8%ED%8A%B8%EB%9D%BC%202%20%EB%82%B4%EC%B6%94%EB%9F%B4', '["luxury","apple"]'::jsonb, true
FROM categories c WHERE c.slug = 'smart-watch';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, 'Apple 애플워치 워치 10 GPS 제트 블랙 알루미늄, 42mm, 블랙 스포츠 밴드', '애플워치', 616140, 'https://shopping-phinf.pstatic.net/main_5392010/53920107204.20250402161453.jpg', 'https://search.shopping.naver.com/catalog/53920107204', 'https://www.coupang.com/np/search?q=Apple%20%EC%95%A0%ED%94%8C%EC%9B%8C%EC%B9%98%20%EC%9B%8C%EC%B9%98%2010%20GPS', '["luxury","apple"]'::jsonb, true
FROM categories c WHERE c.slug = 'smart-watch';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, 'Apple 워치 11 GPS 제트 블랙 알루미늄, 46mm, 블랙 스포츠 밴드', 'Apple', 594890, 'https://shopping-phinf.pstatic.net/main_5669086/56690862308.20251119094802.jpg', 'https://search.shopping.naver.com/catalog/56690862308', 'https://www.coupang.com/np/search?q=Apple%20%EC%9B%8C%EC%B9%98%2011%20GPS%20%EC%A0%9C%ED%8A%B8', '["luxury","apple"]'::jsonb, true
FROM categories c WHERE c.slug = 'smart-watch';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '가민 포러너265 러닝 GPS스마트워치 블랙, 46mm', '가민', 589000, 'https://shopping-phinf.pstatic.net/main_5739776/57397769436.20251027181758.jpg', 'https://search.shopping.naver.com/catalog/57397769436', 'https://www.coupang.com/np/search?q=%EA%B0%80%EB%AF%BC%20%ED%8F%AC%EB%9F%AC%EB%84%88265%20%EB%9F%AC%EB%8B%9D%20GPS%EC%8A%A4%EB%A7%88%ED%8A%B8%EC%9B%8C%EC%B9%98%20%EB%B8%94%EB%9E%99', '["luxury","smart"]'::jsonb, true
FROM categories c WHERE c.slug = 'smart-watch';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, 'Apple 2025 애플워치 11', '', 557660, 'https://shopping-phinf.pstatic.net/main_5716054/57160546129.jpg', 'https://link.coupang.com/re/PCSNAVERPCSDP?pageKey=0492262524&ctag=0492262524&lptag=l346620623297&itemId=66264923073&vendorItemId=93437883815&spec=10305197', 'https://www.coupang.com/np/search?q=Apple%202025%20%EC%95%A0%ED%94%8C%EC%9B%8C%EC%B9%98%2011', '["luxury"]'::jsonb, true
FROM categories c WHERE c.slug = 'smart-watch';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, 'Apple 워치 11 GPS 스페이스 그레이 알루미늄, 42mm, 블랙 스포츠 밴드', 'Apple', 557650, 'https://shopping-phinf.pstatic.net/main_5669028/56690286726.20251119094030.jpg', 'https://search.shopping.naver.com/catalog/56690286726', 'https://www.coupang.com/np/search?q=Apple%20%EC%9B%8C%EC%B9%98%2011%20GPS%20%EC%8A%A4%ED%8E%98%EC%9D%B4%EC%8A%A4', '["luxury","apple"]'::jsonb, true
FROM categories c WHERE c.slug = 'smart-watch';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, 'Apple 워치 11 GPS 로즈 골드 알루미늄, 42mm, 라이트 블러시 스포츠 밴드', 'Apple', 557000, 'https://shopping-phinf.pstatic.net/main_5669060/56690608986.20251121095710.jpg', 'https://search.shopping.naver.com/catalog/56690608986', 'https://www.coupang.com/np/search?q=Apple%20%EC%9B%8C%EC%B9%98%2011%20GPS%20%EB%A1%9C%EC%A6%88', '["luxury","apple"]'::jsonb, true
FROM categories c WHERE c.slug = 'smart-watch';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '삼성전자 갤럭시 워치 울트라 47mm LTE 티타늄 화이트', '갤럭시', 538790, 'https://shopping-phinf.pstatic.net/main_5590052/55900523221.20250722103341.jpg', 'https://search.shopping.naver.com/catalog/55900523221', 'https://www.coupang.com/np/search?q=%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90%20%EA%B0%A4%EB%9F%AD%EC%8B%9C%20%EC%9B%8C%EC%B9%98%20%EC%9A%B8%ED%8A%B8%EB%9D%BC%2047mm', '["luxury"]'::jsonb, true
FROM categories c WHERE c.slug = 'smart-watch';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '씨메 뉴시그니쳐 2그룹 반자동 업소용 카페 에스프레소 원두 커피머신', '씨메', 9900000, 'https://shopping-phinf.pstatic.net/main_8908300/89083006005.jpg', 'https://smartstore.naver.com/main/products/11538495599', 'https://www.coupang.com/np/search?q=%EC%94%A8%EB%A9%94%20%EB%89%B4%EC%8B%9C%EA%B7%B8%EB%8B%88%EC%B3%90%202%EA%B7%B8%EB%A3%B9%20%EB%B0%98%EC%9E%90%EB%8F%99%20%EC%97%85%EC%86%8C%EC%9A%A9', '["luxury"]'::jsonb, true
FROM categories c WHERE c.slug = 'coffee-machine';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '칼렘 KLM 1602 PRO 업소용/사무실용 전자동커피머신', '', 1600000, 'https://shopping-phinf.pstatic.net/main_8907453/89074538246.jpg', 'https://smartstore.naver.com/main/products/11530027840', 'https://www.coupang.com/np/search?q=%EC%B9%BC%EB%A0%98%20KLM%201602%20PRO%20%EC%97%85%EC%86%8C%EC%9A%A9', '["luxury"]'::jsonb, true
FROM categories c WHERE c.slug = 'coffee-machine';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '브레빌 BES876BSS 실버', '브레빌', 1239990, 'https://shopping-phinf.pstatic.net/main_5382717/53827170934.20250328154138.jpg', 'https://search.shopping.naver.com/catalog/53827170934', 'https://www.coupang.com/np/search?q=%EB%B8%8C%EB%A0%88%EB%B9%8C%20BES876BSS%20%EC%8B%A4%EB%B2%84', '["luxury"]'::jsonb, true
FROM categories c WHERE c.slug = 'coffee-machine';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '큐어스 메가 전자동 커피머신 업소용 카페 에스프레소 라떼', 'QUS', 850000, 'https://shopping-phinf.pstatic.net/main_8632280/86322806227.4.jpg', 'https://smartstore.naver.com/main/products/8778305904', 'https://www.coupang.com/np/search?q=%ED%81%90%EC%96%B4%EC%8A%A4%20%EB%A9%94%EA%B0%80%20%EC%A0%84%EC%9E%90%EB%8F%99%20%EC%BB%A4%ED%94%BC%EB%A8%B8%EC%8B%A0%20%EC%97%85%EC%86%8C%EC%9A%A9', '["luxury"]'::jsonb, true
FROM categories c WHERE c.slug = 'coffee-machine';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '드롱기 전자동 커피머신 반자동 라스페셜리스타 아르떼 9155 에스프레소머신 콜드블루', '드롱기', 697800, 'https://shopping-phinf.pstatic.net/main_8590184/85901843419.5.jpg', 'https://smartstore.naver.com/main/products/8357343096', 'https://www.coupang.com/np/search?q=%EB%93%9C%EB%A1%B1%EA%B8%B0%20%EC%A0%84%EC%9E%90%EB%8F%99%20%EC%BB%A4%ED%94%BC%EB%A8%B8%EC%8B%A0%20%EB%B0%98%EC%9E%90%EB%8F%99%20%EB%9D%BC%EC%8A%A4%ED%8E%98%EC%85%9C%EB%A6%AC%EC%8A%A4%ED%83%80', '["luxury"]'::jsonb, true
FROM categories c WHERE c.slug = 'coffee-machine';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '드롱기 전자동 커피머신 에보 라떼 마그니피카 에스프레소머신 KRECAM290', '드롱기', 669800, 'https://shopping-phinf.pstatic.net/main_8555905/85559059963.22.jpg', 'https://smartstore.naver.com/main/products/8014559639', 'https://www.coupang.com/np/search?q=%EB%93%9C%EB%A1%B1%EA%B8%B0%20%EC%A0%84%EC%9E%90%EB%8F%99%20%EC%BB%A4%ED%94%BC%EB%A8%B8%EC%8B%A0%20%EC%97%90%EB%B3%B4%20%EB%9D%BC%EB%96%BC', '["luxury"]'::jsonb, true
FROM categories c WHERE c.slug = 'coffee-machine';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '드롱기 전자동 커피머신 마그니피카 화이트 KRECAM220 에스프레소 에보 라떼 도피오', '드롱기', 629800, 'https://shopping-phinf.pstatic.net/main_8567392/85673927576.14.jpg', 'https://smartstore.naver.com/main/products/8129427253', 'https://www.coupang.com/np/search?q=%EB%93%9C%EB%A1%B1%EA%B8%B0%20%EC%A0%84%EC%9E%90%EB%8F%99%20%EC%BB%A4%ED%94%BC%EB%A8%B8%EC%8B%A0%20%EB%A7%88%EA%B7%B8%EB%8B%88%ED%94%BC%EC%B9%B4%20%ED%99%94%EC%9D%B4%ED%8A%B8', '["luxury"]'::jsonb, true
FROM categories c WHERE c.slug = 'coffee-machine';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '큐어스 화이트 전자동 커피머신 가정용 사무실 에스프레소 원두 머신기 기계', 'QUS', 480000, 'https://shopping-phinf.pstatic.net/main_8932395/89323958641.2.jpg', 'https://smartstore.naver.com/main/products/11779448054', 'https://www.coupang.com/np/search?q=%ED%81%90%EC%96%B4%EC%8A%A4%20%ED%99%94%EC%9D%B4%ED%8A%B8%20%EC%A0%84%EC%9E%90%EB%8F%99%20%EC%BB%A4%ED%94%BC%EB%A8%B8%EC%8B%A0%20%EA%B0%80%EC%A0%95%EC%9A%A9', '["luxury"]'::jsonb, true
FROM categories c WHERE c.slug = 'coffee-machine';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '제니퍼룸 전자동 커피머신 스팀라떼 Pro 19Bar 홈카페 에스프레소 가정용', '제니퍼룸', 469000, 'https://shopping-phinf.pstatic.net/main_8682878/86828787513.78.jpg', 'https://smartstore.naver.com/main/products/9284287190', 'https://www.coupang.com/np/search?q=%EC%A0%9C%EB%8B%88%ED%8D%BC%EB%A3%B8%20%EC%A0%84%EC%9E%90%EB%8F%99%20%EC%BB%A4%ED%94%BC%EB%A8%B8%EC%8B%A0%20%EC%8A%A4%ED%8C%80%EB%9D%BC%EB%96%BC%20Pro', '["luxury"]'::jsonb, true
FROM categories c WHERE c.slug = 'coffee-machine';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '[단독] 필립스 바리스티나 전자동 커피머신 홈카페 세트(넉박스+원두+리무버블 스티커)', '필립스생활가전', 459500, 'https://shopping-phinf.pstatic.net/main_8947295/89472951883.29.jpg', 'https://smartstore.naver.com/main/products/11928441195', 'https://www.coupang.com/np/search?q=%ED%95%84%EB%A6%BD%EC%8A%A4%20%EB%B0%94%EB%A6%AC%EC%8A%A4%ED%8B%B0%EB%82%98%20%EC%A0%84%EC%9E%90%EB%8F%99%20%EC%BB%A4%ED%94%BC%EB%A8%B8%EC%8B%A0%20%ED%99%88%EC%B9%B4%ED%8E%98', '["luxury","philips"]'::jsonb, true
FROM categories c WHERE c.slug = 'coffee-machine';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '벤큐 XL2586X+ 게이밍 모니터 무결점 59~61cm(24인치)', '벤큐', 1541760, 'https://shopping-phinf.pstatic.net/main_5378775/53787753580.20250326145315.jpg', 'https://search.shopping.naver.com/catalog/53787753580', 'https://www.coupang.com/np/search?q=%EB%B2%A4%ED%81%90%20XL2586X%20%EA%B2%8C%EC%9D%B4%EB%B0%8D%20%EB%AA%A8%EB%8B%88%ED%84%B0%20%EB%AC%B4%EA%B2%B0%EC%A0%90', '["luxury"]'::jsonb, true
FROM categories c WHERE c.slug = 'monitor';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '삼성전자 오디세이 Neo G7 LS43CG700 108~110cm(43인치)', '오디세이', 997990, 'https://shopping-phinf.pstatic.net/main_5281736/52817368418.20250205092241.jpg', 'https://search.shopping.naver.com/catalog/52817368418', 'https://www.coupang.com/np/search?q=%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90%20%EC%98%A4%EB%94%94%EC%84%B8%EC%9D%B4%20Neo%20G7%20LS43CG700', '["luxury"]'::jsonb, true
FROM categories c WHERE c.slug = 'monitor';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, 'LG전자 스마트모니터 스윙 터치 32U889SAW 80~81cm(32인치)', 'LG전자', 921110, 'https://shopping-phinf.pstatic.net/main_5446753/54467534719.20250428101816.jpg', 'https://search.shopping.naver.com/catalog/54467534719', 'https://www.coupang.com/np/search?q=LG%EC%A0%84%EC%9E%90%20%EC%8A%A4%EB%A7%88%ED%8A%B8%EB%AA%A8%EB%8B%88%ED%84%B0%20%EC%8A%A4%EC%9C%99%20%ED%84%B0%EC%B9%98%2032U889SAW', '["luxury","lg","smart"]'::jsonb, true
FROM categories c WHERE c.slug = 'monitor';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, 'DELL U2725QE 68~69cm(27인치)', 'DELL', 895990, 'https://shopping-phinf.pstatic.net/main_5867121/58671215698.20260126144045.jpg', 'https://search.shopping.naver.com/catalog/58671215698', 'https://www.coupang.com/np/search?q=DELL%20U2725QE%2068%2069cm', '["luxury"]'::jsonb, true
FROM categories c WHERE c.slug = 'monitor';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '삼성 107.9cm(43인치) IPTV 삼탠바이미 M7 4세대 이동식스탠드 패키지', '삼성', 719000, 'https://shopping-phinf.pstatic.net/main_8781802/87818025087.2.jpg', 'https://smartstore.naver.com/main/products/10273521263', 'https://www.coupang.com/np/search?q=%EC%82%BC%EC%84%B1%20107%209cm%20IPTV%20%EC%82%BC%ED%83%A0%EB%B0%94%EC%9D%B4%EB%AF%B8', '["luxury","samsung"]'::jsonb, true
FROM categories c WHERE c.slug = 'monitor';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '삼성 삼탠바이미 M7 107.9cm(43인치) M70F 스마트TV 스탠드 패키지 IPTV 4K UHD', '삼성', 719000, 'https://shopping-phinf.pstatic.net/main_8952259/89522593888.6.jpg', 'https://smartstore.naver.com/main/products/11978083200', 'https://www.coupang.com/np/search?q=%EC%82%BC%EC%84%B1%20%EC%82%BC%ED%83%A0%EB%B0%94%EC%9D%B4%EB%AF%B8%20M7%20107%209cm', '["luxury","samsung","smart"]'::jsonb, true
FROM categories c WHERE c.slug = 'monitor';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '삼성 화이트 삼탠바이미 M7 108cm(43인치) 무빙 스탠드 패키지 IPTV OTT', '삼성', 719000, 'https://shopping-phinf.pstatic.net/main_8857298/88572984551.9.jpg', 'https://smartstore.naver.com/main/products/11028478344', 'https://www.coupang.com/np/search?q=%EC%82%BC%EC%84%B1%20%ED%99%94%EC%9D%B4%ED%8A%B8%20%EC%82%BC%ED%83%A0%EB%B0%94%EC%9D%B4%EB%AF%B8%20M7%20108cm', '["luxury","samsung"]'::jsonb, true
FROM categories c WHERE c.slug = 'monitor';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '삼성전자 오디세이 G7 LS32DG700 80~81cm(32인치)', '오디세이', 705000, 'https://shopping-phinf.pstatic.net/main_5301705/53017059598.20250220161116.jpg', 'https://search.shopping.naver.com/catalog/53017059598', 'https://www.coupang.com/np/search?q=%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90%20%EC%98%A4%EB%94%94%EC%84%B8%EC%9D%B4%20G7%20LS32DG700%2080', '["luxury"]'::jsonb, true
FROM categories c WHERE c.slug = 'monitor';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '삼성전자 스마트모니터 M7 M70F 80cm(32인치) UHD 4K + 이동식 스탠드 IPTV 삼탠바이미', '', 549000, 'https://shopping-phinf.pstatic.net/main_8775749/87757497585.7.jpg', 'https://smartstore.naver.com/main/products/10212994058', 'https://www.coupang.com/np/search?q=%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90%20%EC%8A%A4%EB%A7%88%ED%8A%B8%EB%AA%A8%EB%8B%88%ED%84%B0%20M7%20M70F%2080cm', '["luxury","smart"]'::jsonb, true
FROM categories c WHERE c.slug = 'monitor';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '삼성 80cm(32인치) IPTV 삼탠바이미 M7 화이트 + M7 전용 이동식스탠드', '삼성', 539000, 'https://shopping-phinf.pstatic.net/main_8907351/89073519478.1.jpg', 'https://smartstore.naver.com/main/products/11529009072', 'https://www.coupang.com/np/search?q=%EC%82%BC%EC%84%B1%2080cm%20IPTV%20%EC%82%BC%ED%83%A0%EB%B0%94%EC%9D%B4%EB%AF%B8%20M7', '["luxury","samsung"]'::jsonb, true
FROM categories c WHERE c.slug = 'monitor';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, 'VARO 바로 VM108 HE 8K 마그네틱 자석축 저소음 사무용 게이밍 기계식 무접점 키보드', '', 165000, 'https://shopping-phinf.pstatic.net/main_9045860/90458601936.jpg', 'https://smartstore.naver.com/main/products/12914090944', 'https://www.coupang.com/np/search?q=VARO%20%EB%B0%94%EB%A1%9C%20VM108%20HE%208K', '["premium","quiet"]'::jsonb, true
FROM categories c WHERE c.slug = 'keyboard';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '키크론 K10 PRO MAX 레트로 파스텔, 저소음 바나나축', '키크론', 149300, 'https://shopping-phinf.pstatic.net/main_5794210/57942105425.20251209100647.jpg', 'https://search.shopping.naver.com/catalog/57942105425', 'https://www.coupang.com/np/search?q=%ED%82%A4%ED%81%AC%EB%A1%A0%20K10%20PRO%20MAX%20%EB%A0%88%ED%8A%B8%EB%A1%9C', '["mid_range","quiet"]'::jsonb, true
FROM categories c WHERE c.slug = 'keyboard';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, 'VARO VM87 HE 8K 마그네틱 자석축 저소음 사무용 게이밍 기계식 무접점 키보드', '', 145000, 'https://shopping-phinf.pstatic.net/main_8988797/89887977053.jpg', 'https://smartstore.naver.com/main/products/12343466336', 'https://www.coupang.com/np/search?q=VARO%20VM87%20HE%208K%20%EB%A7%88%EA%B7%B8%EB%84%A4%ED%8B%B1', '["mid_range","quiet"]'::jsonb, true
FROM categories c WHERE c.slug = 'keyboard';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '지클릭커 오피스프로 EK600 인체공학 스탠다드 무선 블루투스 풀윤활 기계식 키보드 네온 화이트, 무소음 보글보글', '지클릭커', 145000, 'https://shopping-phinf.pstatic.net/main_5633403/56334039921.20251227160625.jpg', 'https://search.shopping.naver.com/catalog/56334039921', 'https://www.coupang.com/np/search?q=%EC%A7%80%ED%81%B4%EB%A6%AD%EC%BB%A4%20%EC%98%A4%ED%94%BC%EC%8A%A4%ED%94%84%EB%A1%9C%20EK600%20%EC%9D%B8%EC%B2%B4%EA%B3%B5%ED%95%99%20%EC%8A%A4%ED%83%A0%EB%8B%A4%EB%93%9C', '["mid_range","quiet"]'::jsonb, true
FROM categories c WHERE c.slug = 'keyboard';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '로지텍 ALTO KEYS K98M 정품, 그래파이트, 마블축', '로지텍', 129000, 'https://shopping-phinf.pstatic.net/main_5698708/56987087879.20250929140740.jpg', 'https://search.shopping.naver.com/catalog/56987087879', 'https://www.coupang.com/np/search?q=%EB%A1%9C%EC%A7%80%ED%85%8D%20ALTO%20KEYS%20K98M%20%EC%A0%95%ED%92%88', '["mid_range"]'::jsonb, true
FROM categories c WHERE c.slug = 'keyboard';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, 'AULA F108Pro 치즈 화이트, 저소음 바다축', 'AULA', 89000, 'https://shopping-phinf.pstatic.net/main_5626232/56262329803.20250814150806.jpg', 'https://search.shopping.naver.com/catalog/56262329803', 'https://www.coupang.com/np/search?q=AULA%20F108Pro%20%EC%B9%98%EC%A6%88%20%ED%99%94%EC%9D%B4%ED%8A%B8%20%EC%A0%80%EC%86%8C%EC%9D%8C', '["mid_range","quiet"]'::jsonb, true
FROM categories c WHERE c.slug = 'keyboard';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, 'AULA F108 유무선 독거미 한글 기계식 키보드 펀키스 국내 정품 올리비아 화이트, KTT 저소음바다축', 'AULA', 82000, 'https://shopping-phinf.pstatic.net/main_8854779/88547796198.2.jpg', 'https://smartstore.naver.com/main/products/11003290102', 'https://www.coupang.com/np/search?q=AULA%20F108%20%EC%9C%A0%EB%AC%B4%EC%84%A0%20%EB%8F%85%EA%B1%B0%EB%AF%B8%20%ED%95%9C%EA%B8%80', '["mid_range","quiet"]'::jsonb, true
FROM categories c WHERE c.slug = 'keyboard';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, 'AULA F108 스카이블랙, 저소음 바다축', 'AULA', 82000, 'https://shopping-phinf.pstatic.net/main_5501928/55019284710.20250529104853.jpg', 'https://search.shopping.naver.com/catalog/55019284710', 'https://www.coupang.com/np/search?q=AULA%20F108%20%EC%8A%A4%EC%B9%B4%EC%9D%B4%EB%B8%94%EB%9E%99%20%EC%A0%80%EC%86%8C%EC%9D%8C%20%EB%B0%94%EB%8B%A4%EC%B6%95', '["mid_range","quiet"]'::jsonb, true
FROM categories c WHERE c.slug = 'keyboard';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, 'AULA F108 올리비아 화이트, 저소음 바다축', 'AULA', 82000, 'https://shopping-phinf.pstatic.net/main_5501939/55019390749.20250529105111.jpg', 'https://search.shopping.naver.com/catalog/55019390749', 'https://www.coupang.com/np/search?q=AULA%20F108%20%EC%98%AC%EB%A6%AC%EB%B9%84%EC%95%84%20%ED%99%94%EC%9D%B4%ED%8A%B8%20%EC%A0%80%EC%86%8C%EC%9D%8C', '["mid_range","quiet"]'::jsonb, true
FROM categories c WHERE c.slug = 'keyboard';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '지클릭커 파도프로젝트 WK107 제주스위치 8K 풀윤활 무선 블루투스 기계식 키보드 화이트 마린, 당근주황축', '지클릭커', 79800, 'https://shopping-phinf.pstatic.net/main_5567112/55671127241.20260122162407.jpg', 'https://search.shopping.naver.com/catalog/55671127241', 'https://www.coupang.com/np/search?q=%EC%A7%80%ED%81%B4%EB%A6%AD%EC%BB%A4%20%ED%8C%8C%EB%8F%84%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%20WK107%20%EC%A0%9C%EC%A3%BC%EC%8A%A4%EC%9C%84%EC%B9%98%208K', '["mid_range"]'::jsonb, true
FROM categories c WHERE c.slug = 'keyboard';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, 'JBL 파티박스520 충전식 휴대용 블루투스 스피커 버스킹스피커 + 무선마이크 + 스탠드', 'JBL', 1400000, 'https://shopping-phinf.pstatic.net/main_9016181/90161811334.2.jpg', 'https://smartstore.naver.com/main/products/12617300478', 'https://www.coupang.com/np/search?q=JBL%20%ED%8C%8C%ED%8B%B0%EB%B0%95%EC%8A%A4520%20%EC%B6%A9%EC%A0%84%EC%8B%9D%20%ED%9C%B4%EB%8C%80%EC%9A%A9%20%EB%B8%94%EB%A3%A8%ED%88%AC%EC%8A%A4', '["luxury"]'::jsonb, true
FROM categories c WHERE c.slug = 'speaker';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '삼성전자 JBL 어센틱 500', 'JBL', 649000, 'https://shopping-phinf.pstatic.net/main_5354484/53544849578.20250314093837.jpg', 'https://search.shopping.naver.com/catalog/53544849578', 'https://www.coupang.com/np/search?q=%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90%20JBL%20%EC%96%B4%EC%84%BC%ED%8B%B1%20500', '["luxury"]'::jsonb, true
FROM categories c WHERE c.slug = 'speaker';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '제네바 스피커 S 월넛 고음질 블루투스 거실 스피커 스탠드 번들 패키지 롯데백화점 상품', '제네바', 640000, 'https://shopping-phinf.pstatic.net/main_8256605/82566056684.13.jpg', 'https://smartstore.naver.com/main/products/5021535835', 'https://www.coupang.com/np/search?q=%EC%A0%9C%EB%84%A4%EB%B0%94%20%EC%8A%A4%ED%94%BC%EC%BB%A4%20S%20%EC%9B%94%EB%84%9B%20%EA%B3%A0%EC%9D%8C%EC%A7%88', '["luxury"]'::jsonb, true
FROM categories c WHERE c.slug = 'speaker';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '마샬 스탠모어 Ⅲ', '마샬', 640000, 'https://shopping-phinf.pstatic.net/main_5352766/53527664806.20250313101625.jpg', 'https://search.shopping.naver.com/catalog/53527664806', 'https://www.coupang.com/np/search?q=%EB%A7%88%EC%83%AC%20%EC%8A%A4%ED%83%A0%EB%AA%A8%EC%96%B4', '["luxury"]'::jsonb, true
FROM categories c WHERE c.slug = 'speaker';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '제네바 스피커 S 블루투스 올인원 스피커 공식수입', '제네바', 640000, 'https://shopping-phinf.pstatic.net/main_8077925/80779253738.17.jpg', 'https://smartstore.naver.com/main/products/3281513758', 'https://www.coupang.com/np/search?q=%EC%A0%9C%EB%84%A4%EB%B0%94%20%EC%8A%A4%ED%94%BC%EC%BB%A4%20S%20%EB%B8%94%EB%A3%A8%ED%88%AC%EC%8A%A4%20%EC%98%AC%EC%9D%B8%EC%9B%90', '["luxury"]'::jsonb, true
FROM categories c WHERE c.slug = 'speaker';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '삼성전자 JBL PARTYBOX STAGE 320', 'JBL', 636650, 'https://shopping-phinf.pstatic.net/main_5387311/53873119903.20250403093946.jpg', 'https://search.shopping.naver.com/catalog/53873119903', 'https://www.coupang.com/np/search?q=%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90%20JBL%20PARTYBOX%20STAGE%20320', '["luxury"]'::jsonb, true
FROM categories c WHERE c.slug = 'speaker';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, 'JBL 파티박스120 충전식 휴대용 블루투스 스피커 버스킹스피커 Club 120', 'JBL', 599000, 'https://shopping-phinf.pstatic.net/main_8887404/88874047415.2.jpg', 'https://smartstore.naver.com/main/products/11329537084', 'https://www.coupang.com/np/search?q=JBL%20%ED%8C%8C%ED%8B%B0%EB%B0%95%EC%8A%A4120%20%EC%B6%A9%EC%A0%84%EC%8B%9D%20%ED%9C%B4%EB%8C%80%EC%9A%A9%20%EB%B8%94%EB%A3%A8%ED%88%AC%EC%8A%A4', '["luxury"]'::jsonb, true
FROM categories c WHERE c.slug = 'speaker';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '삼성전자 JBL PARTYBOX ENCORE 2 정품', 'JBL', 509000, 'https://shopping-phinf.pstatic.net/main_5719578/57195785518.20251013103905.jpg', 'https://search.shopping.naver.com/catalog/57195785518', 'https://www.coupang.com/np/search?q=%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90%20JBL%20PARTYBOX%20ENCORE%202', '["luxury"]'::jsonb, true
FROM categories c WHERE c.slug = 'speaker';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '삼성전자 JBL 어센틱 300', 'JBL', 498990, 'https://shopping-phinf.pstatic.net/main_5354701/53547017675.20250314112744.jpg', 'https://search.shopping.naver.com/catalog/53547017675', 'https://www.coupang.com/np/search?q=%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90%20JBL%20%EC%96%B4%EC%84%BC%ED%8B%B1%20300', '["luxury"]'::jsonb, true
FROM categories c WHERE c.slug = 'speaker';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, 'JBL PARTYBOX 110', 'JBL', 419000, 'https://shopping-phinf.pstatic.net/main_5368716/53687165476.20250321152748.jpg', 'https://search.shopping.naver.com/catalog/53687165476', 'https://www.coupang.com/np/search?q=JBL%20PARTYBOX%20110', '["luxury"]'::jsonb, true
FROM categories c WHERE c.slug = 'speaker';

