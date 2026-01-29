-- Naver Shopping API Products
-- Generated: 2026-01-29T21:30:30.728Z

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
SELECT c.id, '신일 대용량 가습기 초음파 통세척 사무실 거실 세척편한 대형 25L', '신일전자', 239000, 'https://shopping-phinf.pstatic.net/main_8262832/82628328392.5.jpg', 'https://smartstore.naver.com/main/products/5083806694', 'https://www.coupang.com/np/search?q=%EC%8B%A0%EC%9D%BC%20%EB%8C%80%EC%9A%A9%EB%9F%89%20%EA%B0%80%EC%8A%B5%EA%B8%B0%20%EC%B4%88%EC%9D%8C%ED%8C%8C%20%ED%86%B5%EC%84%B8%EC%B2%99', '["premium","large_capacity"]'::jsonb, true
FROM categories c WHERE c.slug = 'humidifier';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '한일 프리미엄 가열식 가습기 신생아 아기 가습기 최신형 물멍 대용량 저소음 살균 화이트', '한일', 199000, 'https://shopping-phinf.pstatic.net/main_8993486/89934868838.3.jpg', 'https://smartstore.naver.com/main/products/12390358113', 'https://www.coupang.com/np/search?q=%ED%95%9C%EC%9D%BC%20%ED%94%84%EB%A6%AC%EB%AF%B8%EC%97%84%20%EA%B0%80%EC%97%B4%EC%8B%9D%20%EA%B0%80%EC%8A%B5%EA%B8%B0%20%EC%8B%A0%EC%83%9D%EC%95%84', '["premium","quiet","large_capacity"]'::jsonb, true
FROM categories c WHERE c.slug = 'humidifier';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '에디르 대용량 복합식 가습기 프로 화이트', '에디르', 198000, 'https://shopping-phinf.pstatic.net/main_5734295/57342953301.20251024092903.jpg', 'https://search.shopping.naver.com/catalog/57342953301', 'https://www.coupang.com/np/search?q=%EC%97%90%EB%94%94%EB%A5%B4%20%EB%8C%80%EC%9A%A9%EB%9F%89%20%EB%B3%B5%ED%95%A9%EC%8B%9D%20%EA%B0%80%EC%8A%B5%EA%B8%B0%20%ED%94%84%EB%A1%9C', '["premium","large_capacity"]'::jsonb, true
FROM categories c WHERE c.slug = 'humidifier';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '[무압력]한일 26년형 가열식 가습기 대용량 신생아 가열가습기 아기', '한일', 184900, 'https://shopping-phinf.pstatic.net/main_8857793/88577937395.17.jpg', 'https://smartstore.naver.com/main/products/11033431188', 'https://www.coupang.com/np/search?q=%ED%95%9C%EC%9D%BC%2026%EB%85%84%ED%98%95%20%EA%B0%80%EC%97%B4%EC%8B%9D%20%EA%B0%80%EC%8A%B5%EA%B8%B0%20%EB%8C%80%EC%9A%A9%EB%9F%89', '["premium","large_capacity"]'::jsonb, true
FROM categories c WHERE c.slug = 'humidifier';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '오넬리 듀얼 스팀 에어프라이어 오븐형 올스텐 대용량 에어프라이기 로티세리 자동세척 20L', 'ONELEE', 399000, 'https://shopping-phinf.pstatic.net/main_8551028/85510286941.13.jpg', 'https://smartstore.naver.com/main/products/7965786618', 'https://www.coupang.com/np/search?q=%EC%98%A4%EB%84%AC%EB%A6%AC%20%EB%93%80%EC%96%BC%20%EC%8A%A4%ED%8C%80%20%EC%97%90%EC%96%B4%ED%94%84%EB%9D%BC%EC%9D%B4%EC%96%B4%20%EC%98%A4%EB%B8%90%ED%98%95', '["luxury","large_capacity"]'::jsonb, true
FROM categories c WHERE c.slug = 'air-fryer';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '스테나 퓨어 304 스텐', '스테나', 297860, 'https://shopping-phinf.pstatic.net/main_5218930/52189304624.20241230144753.jpg', 'https://search.shopping.naver.com/catalog/52189304624', 'https://www.coupang.com/np/search?q=%EC%8A%A4%ED%85%8C%EB%82%98%20%ED%93%A8%EC%96%B4%20304%20%EC%8A%A4%ED%85%90', '["premium"]'::jsonb, true
FROM categories c WHERE c.slug = 'air-fryer';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '시즌앤홈 대용량 올스텐 에어프라이어 오븐형 30L', '', 247900, 'https://shopping-phinf.pstatic.net/main_8401670/84016701308.20.jpg', 'https://smartstore.naver.com/main/products/6472200975', 'https://www.coupang.com/np/search?q=%EC%8B%9C%EC%A6%8C%EC%95%A4%ED%99%88%20%EB%8C%80%EC%9A%A9%EB%9F%89%20%EC%98%AC%EC%8A%A4%ED%85%90%20%EC%97%90%EC%96%B4%ED%94%84%EB%9D%BC%EC%9D%B4%EC%96%B4%20%EC%98%A4%EB%B8%90%ED%98%95', '["premium","large_capacity"]'::jsonb, true
FROM categories c WHERE c.slug = 'air-fryer';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, 'KAN DAROOM 올스텐 에어프라이어 23L 화이트', 'DAROOM', 236550, 'https://shopping-phinf.pstatic.net/main_5823007/58230071954.20260115171713.jpg', 'https://search.shopping.naver.com/catalog/58230071954', 'https://www.coupang.com/np/search?q=KAN%20DAROOM%20%EC%98%AC%EC%8A%A4%ED%85%90%20%EC%97%90%EC%96%B4%ED%94%84%EB%9D%BC%EC%9D%B4%EC%96%B4%2023L', '["premium"]'::jsonb, true
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
SELECT c.id, '쿠쿠전자 CUCKOO CAFO-A1410TB 블랙', 'CUCKOO', 140100, 'https://shopping-phinf.pstatic.net/main_5219181/52191810622.20241230174240.jpg', 'https://search.shopping.naver.com/catalog/52191810622', 'https://www.coupang.com/np/search?q=%EC%BF%A0%EC%BF%A0%EC%A0%84%EC%9E%90%20CUCKOO%20CAFO%20A1410TB%20%EB%B8%94%EB%9E%99', '["mid_range"]'::jsonb, true
FROM categories c WHERE c.slug = 'air-fryer';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '오아 보아르 에이블 듀얼 에어프라이어 실버', '보아르', 129000, 'https://shopping-phinf.pstatic.net/main_5364564/53645644370.20251021151913.jpg', 'https://search.shopping.naver.com/catalog/53645644370', 'https://www.coupang.com/np/search?q=%EC%98%A4%EC%95%84%20%EB%B3%B4%EC%95%84%EB%A5%B4%20%EC%97%90%EC%9D%B4%EB%B8%94%20%EB%93%80%EC%96%BC%20%EC%97%90%EC%96%B4%ED%94%84%EB%9D%BC%EC%9D%B4%EC%96%B4', '["mid_range"]'::jsonb, true
FROM categories c WHERE c.slug = 'air-fryer';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '스텐 스팀 에어프라이어 오븐형 에어프라이 대용량 에어후라이기', '', 129000, 'https://shopping-phinf.pstatic.net/main_4089281/40892813299.10.jpg', 'https://syhong1108.cafe24.com/product/detail.html?product_no=15&cate_no=108&display_group=1&cafe_mkt=naver_ks&mkt_in=Y&ghost_mall_id=naver&ref=naver_open', 'https://www.coupang.com/np/search?q=%EC%8A%A4%ED%85%90%20%EC%8A%A4%ED%8C%80%20%EC%97%90%EC%96%B4%ED%94%84%EB%9D%BC%EC%9D%B4%EC%96%B4%20%EC%98%A4%EB%B8%90%ED%98%95%20%EC%97%90%EC%96%B4%ED%94%84%EB%9D%BC%EC%9D%B4', '["mid_range","large_capacity"]'::jsonb, true
FROM categories c WHERE c.slug = 'air-fryer';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, 'LG전자 LG퓨리케어 AI+ 360˚ 공기청정기 AS355N M 필터, 샌드 베이지, +무빙휠', 'LG퓨리케어', 1374890, 'https://shopping-phinf.pstatic.net/main_5387577/53875779430.20250331173601.jpg', 'https://search.shopping.naver.com/catalog/53875779430', 'https://www.coupang.com/np/search?q=LG%EC%A0%84%EC%9E%90%20LG%ED%93%A8%EB%A6%AC%EC%BC%80%EC%96%B4%20AI%20360%20%EA%B3%B5%EA%B8%B0%EC%B2%AD%EC%A0%95%EA%B8%B0', '["luxury","lg"]'::jsonb, true
FROM categories c WHERE c.slug = 'air-purifier';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '다이슨 쿨 공기청정기 PC2 화이트골드', '다이슨', 591090, 'https://shopping-phinf.pstatic.net/main_5392056/53920562242.20250410172644.jpg', 'https://search.shopping.naver.com/catalog/53920562242', 'https://www.coupang.com/np/search?q=%EB%8B%A4%EC%9D%B4%EC%8A%A8%20%EC%BF%A8%20%EA%B3%B5%EA%B8%B0%EC%B2%AD%EC%A0%95%EA%B8%B0%20PC2%20%ED%99%94%EC%9D%B4%ED%8A%B8%EA%B3%A8%EB%93%9C', '["luxury","dyson"]'::jsonb, true
FROM categories c WHERE c.slug = 'air-purifier';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '쿠쿠전자 CUCKOO AC-28AHNL20F 어스 웜화이트', 'CUCKOO', 494900, 'https://shopping-phinf.pstatic.net/main_5350664/53506640419.20251211095206.jpg', 'https://search.shopping.naver.com/catalog/53506640419', 'https://www.coupang.com/np/search?q=%EC%BF%A0%EC%BF%A0%EC%A0%84%EC%9E%90%20CUCKOO%20AC%2028AHNL20F%20%EC%96%B4%EC%8A%A4', '["luxury"]'::jsonb, true
FROM categories c WHERE c.slug = 'air-purifier';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '하니웰 펫 공기청정기 고양이 털 냄새 알레르기 제거 HEPA필터 가정용 음이온 소형 공청기', '하니웰', 489000, 'https://shopping-phinf.pstatic.net/main_8907839/89078399004.jpg', 'https://smartstore.naver.com/main/products/11533888598', 'https://www.coupang.com/np/search?q=%ED%95%98%EB%8B%88%EC%9B%B0%20%ED%8E%AB%20%EA%B3%B5%EA%B8%B0%EC%B2%AD%EC%A0%95%EA%B8%B0%20%EA%B3%A0%EC%96%91%EC%9D%B4%20%ED%84%B8', '["luxury","compact"]'::jsonb, true
FROM categories c WHERE c.slug = 'air-purifier';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '위닉스 타워 프라임 플러스 ATTM115 실버', '위닉스', 75580, 'https://shopping-phinf.pstatic.net/main_5392044/53920444493.20250618095043.jpg', 'https://search.shopping.naver.com/catalog/53920444493', 'https://www.coupang.com/np/search?q=%EC%9C%84%EB%8B%89%EC%8A%A4%20%ED%83%80%EC%9B%8C%20%ED%94%84%EB%9D%BC%EC%9E%84%20%ED%94%8C%EB%9F%AC%EC%8A%A4%20ATTM115', '["mid_range"]'::jsonb, true
FROM categories c WHERE c.slug = 'air-purifier';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '위닉스 타워엣지 AT8E430 화이트', '위닉스', 65000, 'https://shopping-phinf.pstatic.net/main_5355057/53550578218.20250314172116.jpg', 'https://search.shopping.naver.com/catalog/53550578218', 'https://www.coupang.com/np/search?q=%EC%9C%84%EB%8B%89%EC%8A%A4%20%ED%83%80%EC%9B%8C%EC%97%A3%EC%A7%80%20AT8E430%20%ED%99%94%EC%9D%B4%ED%8A%B8', '["mid_range"]'::jsonb, true
FROM categories c WHERE c.slug = 'air-purifier';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '[호환] 필터모아 암웨이 공기청정기 필터 10-1076K 헤파 탈취 필터세트', '필터모아', 52500, 'https://shopping-phinf.pstatic.net/main_8274633/82746335959.14.jpg', 'https://smartstore.naver.com/main/products/5201814330', 'https://www.coupang.com/np/search?q=%ED%95%84%ED%84%B0%EB%AA%A8%EC%95%84%20%EC%95%94%EC%9B%A8%EC%9D%B4%20%EA%B3%B5%EA%B8%B0%EC%B2%AD%EC%A0%95%EA%B8%B0%20%ED%95%84%ED%84%B0%2010', '["mid_range"]'::jsonb, true
FROM categories c WHERE c.slug = 'air-purifier';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '홈스미스 미니공기청정기 원룸 소형 펫 고양이 강아지털 사무실 거실 안방 환기청정기 A1', '홈스미스', 48900, 'https://shopping-phinf.pstatic.net/main_8288498/82884981106.24.jpg', 'https://smartstore.naver.com/main/products/5340488276', 'https://www.coupang.com/np/search?q=%ED%99%88%EC%8A%A4%EB%AF%B8%EC%8A%A4%20%EB%AF%B8%EB%8B%88%EA%B3%B5%EA%B8%B0%EC%B2%AD%EC%A0%95%EA%B8%B0%20%EC%9B%90%EB%A3%B8%20%EC%86%8C%ED%98%95%20%ED%8E%AB', '["budget","compact"]'::jsonb, true
FROM categories c WHERE c.slug = 'air-purifier';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '위닉스 AT5M200-MWK 화이트', '위닉스', 40810, 'https://shopping-phinf.pstatic.net/main_5351005/53510053085.20250312171450.jpg', 'https://search.shopping.naver.com/catalog/53510053085', 'https://www.coupang.com/np/search?q=%EC%9C%84%EB%8B%89%EC%8A%A4%20AT5M200%20MWK%20%ED%99%94%EC%9D%B4%ED%8A%B8', '["budget"]'::jsonb, true
FROM categories c WHERE c.slug = 'air-purifier';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '오아 퓨어 미니 공기청정기 OA-AP005 화이트', '오아', 34800, 'https://shopping-phinf.pstatic.net/main_5352778/53527787027.20250313103222.jpg', 'https://search.shopping.naver.com/catalog/53527787027', 'https://www.coupang.com/np/search?q=%EC%98%A4%EC%95%84%20%ED%93%A8%EC%96%B4%20%EB%AF%B8%EB%8B%88%20%EA%B3%B5%EA%B8%B0%EC%B2%AD%EC%A0%95%EA%B8%B0%20OA', '["budget","compact"]'::jsonb, true
FROM categories c WHERE c.slug = 'air-purifier';

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

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '드리미 X50s Pro Master 블랙, 단품', '드리미', 1307690, 'https://shopping-phinf.pstatic.net/main_5549794/55497943327.20250626101002.jpg', 'https://search.shopping.naver.com/catalog/55497943327', 'https://www.coupang.com/np/search?q=%EB%93%9C%EB%A6%AC%EB%AF%B8%20X50s%20Pro%20Master%20%EB%B8%94%EB%9E%99', '["luxury"]'::jsonb, true
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
SELECT c.id, '삼성전자 BESPOKE 스팀 9600 로봇청소기 방문설치', '', 897620, 'https://shopping-phinf.pstatic.net/main_5528740/55287408519.52.jpg', 'https://link.coupang.com/re/PCSNAVERPCSDP?pageKey=9977858988&ctag=9977858988&lptag=l292251820802&itemId=21282829005&vendorItemId=89258830163&spec=10305197', 'https://www.coupang.com/np/search?q=%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90%20BESPOKE%20%EC%8A%A4%ED%8C%80%209600%20%EB%A1%9C%EB%B4%87%EC%B2%AD%EC%86%8C%EA%B8%B0', '["luxury"]'::jsonb, true
FROM categories c WHERE c.slug = 'robot-vacuum';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '에브리봇 Q11 화이트, 단품', '에브리봇', 849000, 'https://shopping-phinf.pstatic.net/main_5744961/57449616455.20260123091551.jpg', 'https://search.shopping.naver.com/catalog/57449616455', 'https://www.coupang.com/np/search?q=%EC%97%90%EB%B8%8C%EB%A6%AC%EB%B4%87%20Q11%20%ED%99%94%EC%9D%B4%ED%8A%B8%20%EB%8B%A8%ED%92%88', '["luxury"]'::jsonb, true
FROM categories c WHERE c.slug = 'robot-vacuum';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '에코백스 디봇 T80 옴니 화이트, 단품', '에코백스', 799000, 'https://shopping-phinf.pstatic.net/main_5507678/55076784706.20250602104104.jpg', 'https://search.shopping.naver.com/catalog/55076784706', 'https://www.coupang.com/np/search?q=%EC%97%90%EC%BD%94%EB%B0%B1%EC%8A%A4%20%EB%94%94%EB%B4%87%20T80%20%EC%98%B4%EB%8B%88%20%ED%99%94%EC%9D%B4%ED%8A%B8', '["luxury"]'::jsonb, true
FROM categories c WHERE c.slug = 'robot-vacuum';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '[2026신제품] 드리미 L10s Ultra Gen3 로봇청소기 사이드 브러시 엉킴 방지 열풍건조', '드리미', 699000, 'https://shopping-phinf.pstatic.net/main_9034192/90341929558.3.jpg', 'https://smartstore.naver.com/main/products/12797418609', 'https://www.coupang.com/np/search?q=%EB%93%9C%EB%A6%AC%EB%AF%B8%20L10s%20Ultra%20Gen3%20%EB%A1%9C%EB%B4%87%EC%B2%AD%EC%86%8C%EA%B8%B0', '["luxury"]'::jsonb, true
FROM categories c WHERE c.slug = 'robot-vacuum';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, '에브리봇 올인원 로봇청소기 Q9 화이트, 단품', '에브리봇', 659000, 'https://shopping-phinf.pstatic.net/main_5402479/54024790735.20250914214026.jpg', 'https://search.shopping.naver.com/catalog/54024790735', 'https://www.coupang.com/np/search?q=%EC%97%90%EB%B8%8C%EB%A6%AC%EB%B4%87%20%EC%98%AC%EC%9D%B8%EC%9B%90%20%EB%A1%9C%EB%B4%87%EC%B2%AD%EC%86%8C%EA%B8%B0%20Q9%20%ED%99%94%EC%9D%B4%ED%8A%B8', '["luxury"]'::jsonb, true
FROM categories c WHERE c.slug = 'robot-vacuum';

INSERT INTO products (category_id, name, brand, price, image_url, naver_url, coupang_url, tags, is_active)
SELECT c.id, 'TAMA 올인원 Ai 화이트, 단품', 'TAMA', 597990, 'https://shopping-phinf.pstatic.net/main_5436877/54368770805.20250423165152.jpg', 'https://search.shopping.naver.com/catalog/54368770805', 'https://www.coupang.com/np/search?q=TAMA%20%EC%98%AC%EC%9D%B8%EC%9B%90%20Ai%20%ED%99%94%EC%9D%B4%ED%8A%B8%20%EB%8B%A8%ED%92%88', '["luxury"]'::jsonb, true
FROM categories c WHERE c.slug = 'robot-vacuum';

