-- PickForMe Seed Data
-- 5개 카테고리: 가습기, 에어프라이어, 공기청정기, 블루투스 이어폰, 로봇청소기

-- =====================
-- 1. CATEGORIES
-- =====================

INSERT INTO categories (slug, name_ko, name_en, description, icon, is_active, view_count) VALUES
('humidifier', '가습기', 'Humidifier', '건조한 겨울, 나에게 맞는 가습기를 찾아보세요', '💨', true, 3240),
('air-fryer', '에어프라이어', 'Air Fryer', '바삭한 요리를 위한 나만의 에어프라이어', '🍟', true, 2890),
('air-purifier', '공기청정기', 'Air Purifier', '깨끗한 공기를 위한 맞춤 공기청정기', '🌬️', true, 2150),
('earbuds', '블루투스 이어폰', 'Bluetooth Earbuds', '나의 라이프스타일에 맞는 이어폰 찾기', '🎧', true, 4520),
('robot-vacuum', '로봇청소기', 'Robot Vacuum', '청소를 맡길 나만의 로봇청소기', '🤖', true, 1870);

-- =====================
-- 2. QUESTIONS - 가습기
-- =====================

INSERT INTO questions (category_id, order_num, question_text, question_type, tags_yes, tags_no) VALUES
((SELECT id FROM categories WHERE slug = 'humidifier'), 1,
 '하루 종일 집에 있는 편인가요?', 'yes_no',
 '["large_capacity", "auto_humidity"]', '["portable", "small_size"]'),

((SELECT id FROM categories WHERE slug = 'humidifier'), 2,
 '가습기 청소하는 게 너무 귀찮으신가요?', 'yes_no',
 '["easy_clean", "natural_evaporation"]', '["ultrasonic"]'),

((SELECT id FROM categories WHERE slug = 'humidifier'), 3,
 '소음에 민감한 편인가요?', 'yes_no',
 '["quiet", "natural_evaporation"]', '["powerful"]'),

((SELECT id FROM categories WHERE slug = 'humidifier'), 4,
 '물 자주 갈아주는 게 번거로우신가요?', 'yes_no',
 '["large_capacity"]', '["small_size", "portable"]'),

((SELECT id FROM categories WHERE slug = 'humidifier'), 5,
 '가격보다 성능이 더 중요하신가요?', 'yes_no',
 '["premium", "smart", "hybrid"]', '["budget"]'),

((SELECT id FROM categories WHERE slug = 'humidifier'), 6,
 '아이나 반려동물이 있으신가요?', 'yes_no',
 '["antibacterial", "quiet"]', '[]');

-- =====================
-- 2. QUESTIONS - 에어프라이어
-- =====================

INSERT INTO questions (category_id, order_num, question_text, question_type, tags_yes, tags_no) VALUES
((SELECT id FROM categories WHERE slug = 'air-fryer'), 1,
 '3인 이상 가족과 함께 사시나요?', 'yes_no',
 '["large_basket", "dual_basket"]', '["small_size"]'),

((SELECT id FROM categories WHERE slug = 'air-fryer'), 2,
 '통닭이나 큰 요리를 자주 해드시나요?', 'yes_no',
 '["rotisserie", "large_basket"]', '["small_size"]'),

((SELECT id FROM categories WHERE slug = 'air-fryer'), 3,
 '요리 초보라서 간편한 게 좋으신가요?', 'yes_no',
 '["preset_menu", "smart"]', '[]'),

((SELECT id FROM categories WHERE slug = 'air-fryer'), 4,
 '기름기 없는 건강한 요리가 중요하신가요?', 'yes_no',
 '["oil_free"]', '[]'),

((SELECT id FROM categories WHERE slug = 'air-fryer'), 5,
 '주방 공간이 넉넉한 편인가요?', 'yes_no',
 '["large_basket", "dual_basket"]', '["small_size"]'),

((SELECT id FROM categories WHERE slug = 'air-fryer'), 6,
 '가성비가 제일 중요하신가요?', 'yes_no',
 '["budget"]', '["premium", "smart"]');

-- =====================
-- 2. QUESTIONS - 공기청정기
-- =====================

INSERT INTO questions (category_id, order_num, question_text, question_type, tags_yes, tags_no) VALUES
((SELECT id FROM categories WHERE slug = 'air-purifier'), 1,
 '거실이 20평 이상인가요?', 'yes_no',
 '["wide_coverage", "powerful"]', '["small_size"]'),

((SELECT id FROM categories WHERE slug = 'air-purifier'), 2,
 '미세먼지나 알레르기에 민감하신가요?', 'yes_no',
 '["hepa_filter", "air_quality_sensor"]', '[]'),

((SELECT id FROM categories WHERE slug = 'air-purifier'), 3,
 '필터 교체 비용이 부담되시나요?', 'yes_no',
 '["low_maintenance"]', '["hepa_filter"]'),

((SELECT id FROM categories WHERE slug = 'air-purifier'), 4,
 '공기 상태를 실시간으로 확인하고 싶으신가요?', 'yes_no',
 '["air_quality_sensor", "smart"]', '[]'),

((SELECT id FROM categories WHERE slug = 'air-purifier'), 5,
 '소음에 예민하신 편인가요?', 'yes_no',
 '["quiet"]', '["powerful"]'),

((SELECT id FROM categories WHERE slug = 'air-purifier'), 6,
 '스마트홈 연동이 필요하신가요?', 'yes_no',
 '["smart"]', '[]');

-- =====================
-- 2. QUESTIONS - 블루투스 이어폰
-- =====================

INSERT INTO questions (category_id, order_num, question_text, question_type, tags_yes, tags_no) VALUES
((SELECT id FROM categories WHERE slug = 'earbuds'), 1,
 '지하철이나 카페 등 시끄러운 곳에서 자주 사용하시나요?', 'yes_no',
 '["anc"]', '[]'),

((SELECT id FROM categories WHERE slug = 'earbuds'), 2,
 '하루에 4시간 이상 이어폰을 사용하시나요?', 'yes_no',
 '["long_battery", "comfortable"]', '[]'),

((SELECT id FROM categories WHERE slug = 'earbuds'), 3,
 '운동할 때 이어폰을 사용하시나요?', 'yes_no',
 '["water_resistant", "comfortable"]', '[]'),

((SELECT id FROM categories WHERE slug = 'earbuds'), 4,
 '음악 들을 때 베이스가 빵빵한 게 좋으신가요?', 'yes_no',
 '["bass"]', '[]'),

((SELECT id FROM categories WHERE slug = 'earbuds'), 5,
 '통화 품질이 중요하신가요?', 'yes_no',
 '["clear_call", "anc"]', '[]'),

((SELECT id FROM categories WHERE slug = 'earbuds'), 6,
 '10만원 이하 가성비 제품을 원하시나요?', 'yes_no',
 '["budget"]', '["premium", "anc"]');

-- =====================
-- 2. QUESTIONS - 로봇청소기
-- =====================

INSERT INTO questions (category_id, order_num, question_text, question_type, tags_yes, tags_no) VALUES
((SELECT id FROM categories WHERE slug = 'robot-vacuum'), 1,
 '집에 반려동물이 있으신가요?', 'yes_no',
 '["pet_friendly", "powerful"]', '[]'),

((SELECT id FROM categories WHERE slug = 'robot-vacuum'), 2,
 '물걸레 청소도 같이 했으면 좋겠나요?', 'yes_no',
 '["mopping"]', '[]'),

((SELECT id FROM categories WHERE slug = 'robot-vacuum'), 3,
 '집에 장애물(전선, 양말 등)이 많은 편인가요?', 'yes_no',
 '["obstacle_avoid", "mapping"]', '[]'),

((SELECT id FROM categories WHERE slug = 'robot-vacuum'), 4,
 '먼지통 비우는 게 귀찮으신가요?', 'yes_no',
 '["auto_empty"]', '[]'),

((SELECT id FROM categories WHERE slug = 'robot-vacuum'), 5,
 '특정 방만 청소하는 기능이 필요하신가요?', 'yes_no',
 '["mapping", "smart"]', '[]'),

((SELECT id FROM categories WHERE slug = 'robot-vacuum'), 6,
 '가성비 제품을 원하시나요?', 'yes_no',
 '["budget"]', '["premium", "auto_empty"]');

-- =====================
-- 3. RESULT TYPES - 가습기
-- =====================

INSERT INTO result_types (category_id, type_code, type_name, description, tag_conditions, emoji, priority) VALUES
((SELECT id FROM categories WHERE slug = 'humidifier'), 'lazy_homebody',
 '귀차니즘 집순이', '물 자주 갈기 귀찮고 청소도 최소화하고 싶은 당신! 대용량에 자연기화식 가습기가 딱이에요. 청소 주기도 길고 세균 걱정도 적답니다.',
 '["large_capacity", "easy_clean", "natural_evaporation"]', '🏠', 10),

((SELECT id FROM categories WHERE slug = 'humidifier'), 'quiet_sleeper',
 '예민한 잠꾸러기', '잘 때 소리나면 잠 못 자는 당신! 무소음에 가까운 자연기화식이나 조용한 초음파식이 제격이에요.',
 '["quiet", "natural_evaporation"]', '😴', 9),

((SELECT id FROM categories WHERE slug = 'humidifier'), 'smart_parent',
 '스마트 육아맘/대디', '아이 건강이 최우선! 항균 기능에 스마트 습도 조절까지, 안심하고 사용할 수 있는 가습기를 추천해요.',
 '["antibacterial", "smart", "quiet"]', '👶', 8),

((SELECT id FROM categories WHERE slug = 'humidifier'), 'budget_hunter',
 '가성비 사냥꾼', '돈값 하는 제품만 찾는 당신! 저렴하지만 기본기 탄탄한 가습기를 모아봤어요.',
 '["budget"]', '💰', 7);

-- =====================
-- 3. RESULT TYPES - 에어프라이어
-- =====================

INSERT INTO result_types (category_id, type_code, type_name, description, tag_conditions, emoji, priority) VALUES
((SELECT id FROM categories WHERE slug = 'air-fryer'), 'family_chef',
 '대가족 요리사', '온 가족이 먹을 요리를 만드는 당신! 대용량에 듀얼바스켓으로 여러 요리를 동시에 뚝딱!',
 '["large_basket", "dual_basket"]', '👨‍👩‍👧‍👦', 10),

((SELECT id FROM categories WHERE slug = 'air-fryer'), 'cooking_newbie',
 '요리 뉴비', '요리는 어렵고 간편한 게 최고인 당신! 원터치 메뉴로 버튼만 누르면 완성되는 에어프라이어가 딱이에요.',
 '["preset_menu", "smart"]', '🔰', 9),

((SELECT id FROM categories WHERE slug = 'air-fryer'), 'health_lover',
 '건강 지킴이', '기름 없이 건강하게! 바삭함은 살리고 기름기는 쏙 빼주는 에어프라이어를 찾고 계시네요.',
 '["oil_free"]', '🥗', 8),

((SELECT id FROM categories WHERE slug = 'air-fryer'), 'small_kitchen',
 '미니멀 주방러', '작은 주방에서도 OK! 컴팩트하지만 성능 좋은 에어프라이어를 추천해요.',
 '["small_size", "budget"]', '🏠', 7);

-- =====================
-- 3. RESULT TYPES - 공기청정기
-- =====================

INSERT INTO result_types (category_id, type_code, type_name, description, tag_conditions, emoji, priority) VALUES
((SELECT id FROM categories WHERE slug = 'air-purifier'), 'allergy_fighter',
 '알레르기 파이터', '미세먼지, 꽃가루에 예민한 당신! HEPA 필터에 공기질 센서까지, 철벽 방어 공기청정기가 필요해요.',
 '["hepa_filter", "air_quality_sensor"]', '🛡️', 10),

((SELECT id FROM categories WHERE slug = 'air-purifier'), 'smart_home_lover',
 '스마트홈 러버', '앱으로 모든 걸 컨트롤하고 싶은 당신! IoT 연동 가능한 스마트 공기청정기를 추천해요.',
 '["smart", "air_quality_sensor"]', '📱', 9),

((SELECT id FROM categories WHERE slug = 'air-purifier'), 'cost_saver',
 '유지비 절약러', '필터값이 부담되는 당신! 필터 수명 길고 유지비 적은 공기청정기를 찾아봤어요.',
 '["low_maintenance"]', '💵', 8),

((SELECT id FROM categories WHERE slug = 'air-purifier'), 'big_space_owner',
 '넓은집 주인', '거실이 넓어서 강력한 청정 능력이 필요한 당신! 대형 공간도 커버하는 공기청정기예요.',
 '["wide_coverage", "powerful"]', '🏰', 7);

-- =====================
-- 3. RESULT TYPES - 블루투스 이어폰
-- =====================

INSERT INTO result_types (category_id, type_code, type_name, description, tag_conditions, emoji, priority) VALUES
((SELECT id FROM categories WHERE slug = 'earbuds'), 'noise_hater',
 '소음 싫어요', '지하철, 카페 소음 다 차단하고 나만의 세계에 빠지고 싶은 당신! ANC 이어폰이 필수예요.',
 '["anc"]', '🔇', 10),

((SELECT id FROM categories WHERE slug = 'earbuds'), 'fitness_addict',
 '운동 매니아', '운동할 때 빠질 수 없는 이어폰! 땀에도 끄떡없고 착용감 좋은 이어폰을 추천해요.',
 '["water_resistant", "comfortable"]', '🏃', 9),

((SELECT id FROM categories WHERE slug = 'earbuds'), 'bass_lover',
 '베이스 중독자', '빵빵한 베이스 없으면 음악이 아닌 당신! 저음이 풍부한 이어폰을 모아봤어요.',
 '["bass"]', '🔊', 8),

((SELECT id FROM categories WHERE slug = 'earbuds'), 'budget_wise',
 '현명한 소비자', '10만원 이하로 괜찮은 이어폰 찾는 당신! 가성비 좋은 이어폰을 추천해요.',
 '["budget"]', '💡', 7);

-- =====================
-- 3. RESULT TYPES - 로봇청소기
-- =====================

INSERT INTO result_types (category_id, type_code, type_name, description, tag_conditions, emoji, priority) VALUES
((SELECT id FROM categories WHERE slug = 'robot-vacuum'), 'pet_parent',
 '반려동물 집사', '털이 여기저기 날리는 집! 펫 모드에 강력한 흡입력으로 털을 싹 정리해주는 로봇청소기가 필요해요.',
 '["pet_friendly", "powerful"]', '🐕', 10),

((SELECT id FROM categories WHERE slug = 'robot-vacuum'), 'complete_lazy',
 '완전 귀찮아요', '먼지통 비우는 것도 귀찮은 당신! 자동 비움 기능으로 한 달에 한 번만 신경 쓰면 돼요.',
 '["auto_empty", "mopping"]', '😪', 9),

((SELECT id FROM categories WHERE slug = 'robot-vacuum'), 'obstacle_survivor',
 '장애물 서바이버', '집에 전선, 양말 많아서 로봇청소기가 걱정되는 당신! 장애물 회피 기능이 탑재된 로봇청소기예요.',
 '["obstacle_avoid", "mapping"]', '🧦', 8),

((SELECT id FROM categories WHERE slug = 'robot-vacuum'), 'mop_lover',
 '물걸레 필수파', '물걸레 청소까지 한 번에! 흡입과 물걸레 동시에 되는 로봇청소기를 찾고 계시네요.',
 '["mopping"]', '🧹', 7);

-- =====================
-- 4. PRODUCTS - 가습기
-- =====================

INSERT INTO products (category_id, name, brand, price, image_url, coupang_url, tags, score_base, rating, review_count) VALUES
((SELECT id FROM categories WHERE slug = 'humidifier'), '샤오미 스마트미 가습기2', 'Xiaomi', 54900, 'https://thumbnail6.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/09/20/11/1/d6b1a890-db2a-42a2-b4e2-29ff3ed4efd0.jpg', 'https://www.coupang.com/vp/products/7335678', '["large_capacity", "quiet", "smart", "easy_clean"]', 55, 4.6, 15420),
((SELECT id FROM categories WHERE slug = 'humidifier'), '보네이도 에보프 가습기', 'Vornado', 189000, 'https://thumbnail8.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/10/08/17/8/98cf7c84-e0fa-4be1-a0fd-cd8a1f82c9f9.jpg', 'https://www.coupang.com/vp/products/7654321', '["natural_evaporation", "easy_clean", "quiet", "premium"]', 60, 4.7, 8230),
((SELECT id FROM categories WHERE slug = 'humidifier'), '다이슨 AM10 가습기', 'Dyson', 598000, 'https://thumbnail7.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/08/15/14/4/6d8a7b90-1234-4abc-def0-123456789abc.jpg', 'https://www.coupang.com/vp/products/8765432', '["antibacterial", "premium", "quiet", "smart"]', 65, 4.8, 5670),
((SELECT id FROM categories WHERE slug = 'humidifier'), '미로 완벽세척 가습기', 'MIRO', 89000, 'https://thumbnail9.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/07/22/10/2/abc12345-6789-0def-ghij-klmnopqrstuv.jpg', 'https://www.coupang.com/vp/products/9876543', '["easy_clean", "ultrasonic", "antibacterial"]', 52, 4.5, 23450),
((SELECT id FROM categories WHERE slug = 'humidifier'), '발뮤다 레인 가습기', 'BALMUDA', 459000, 'https://thumbnail10.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/06/30/09/5/def98765-4321-0abc-hijk-lmnopqrstuvw.jpg', 'https://www.coupang.com/vp/products/1234567', '["natural_evaporation", "premium", "design", "quiet"]', 58, 4.6, 4320),
((SELECT id FROM categories WHERE slug = 'humidifier'), '쿠쿠 가습기 CAH-I0510FW', 'CUCKOO', 159000, 'https://thumbnail11.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/09/01/15/3/ghi11111-2222-3333-4444-555566667777.jpg', 'https://www.coupang.com/vp/products/2345678', '["hybrid", "auto_humidity", "antibacterial", "large_capacity"]', 54, 4.4, 6780),
((SELECT id FROM categories WHERE slug = 'humidifier'), '오아 미스트 가습기', 'OA', 29900, 'https://thumbnail12.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/08/20/12/1/jkl22222-3333-4444-5555-666677778888.jpg', 'https://www.coupang.com/vp/products/3456789', '["budget", "ultrasonic", "portable", "small_size"]', 48, 4.2, 45670),
((SELECT id FROM categories WHERE slug = 'humidifier'), '필립스 가습기 HU4803', 'Philips', 139000, 'https://thumbnail13.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/07/10/11/0/mno33333-4444-5555-6666-777788889999.jpg', 'https://www.coupang.com/vp/products/4567890', '["natural_evaporation", "quiet", "auto_humidity"]', 53, 4.5, 9870),
((SELECT id FROM categories WHERE slug = 'humidifier'), '에어메이드 대용량 가습기', 'AirMade', 69000, 'https://thumbnail14.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/10/05/14/2/pqr44444-5555-6666-7777-888899990000.jpg', 'https://www.coupang.com/vp/products/5678901', '["large_capacity", "budget", "ultrasonic"]', 50, 4.3, 12340),
((SELECT id FROM categories WHERE slug = 'humidifier'), '위닉스 가습기 AWM-C1100W', 'Winix', 179000, 'https://thumbnail15.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/09/15/16/4/stu55555-6666-7777-8888-999900001111.jpg', 'https://www.coupang.com/vp/products/6789012', '["natural_evaporation", "large_capacity", "easy_clean", "quiet"]', 56, 4.6, 7650);

-- =====================
-- 4. PRODUCTS - 에어프라이어
-- =====================

INSERT INTO products (category_id, name, brand, price, image_url, coupang_url, tags, score_base, rating, review_count) VALUES
((SELECT id FROM categories WHERE slug = 'air-fryer'), '필립스 에어프라이어 XXL', 'Philips', 349000, 'https://thumbnail6.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/08/01/10/0/af-xxl-001.jpg', 'https://www.coupang.com/vp/products/af001', '["large_basket", "oil_free", "preset_menu", "premium"]', 58, 4.7, 18920),
((SELECT id FROM categories WHERE slug = 'air-fryer'), '닌자 듀얼존 에어프라이어', 'Ninja', 289000, 'https://thumbnail7.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/09/12/11/1/af-ninja-001.jpg', 'https://www.coupang.com/vp/products/af002', '["dual_basket", "large_basket", "preset_menu", "smart"]', 60, 4.8, 12340),
((SELECT id FROM categories WHERE slug = 'air-fryer'), '쿠쿠 에어프라이어 오븐', 'CUCKOO', 199000, 'https://thumbnail8.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/07/20/09/2/af-cuckoo-001.jpg', 'https://www.coupang.com/vp/products/af003', '["rotisserie", "large_basket", "preset_menu"]', 55, 4.5, 8760),
((SELECT id FROM categories WHERE slug = 'air-fryer'), '코스모스 에어프라이어 5.5L', 'COSMOS', 79900, 'https://thumbnail9.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/10/01/14/3/af-cosmos-001.jpg', 'https://www.coupang.com/vp/products/af004', '["budget", "large_basket", "oil_free"]', 50, 4.3, 34560),
((SELECT id FROM categories WHERE slug = 'air-fryer'), '키친아트 에어프라이어 2.6L', 'KitchenArt', 49900, 'https://thumbnail10.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/09/05/12/4/af-ka-001.jpg', 'https://www.coupang.com/vp/products/af005', '["small_size", "budget", "oil_free"]', 48, 4.2, 28970),
((SELECT id FROM categories WHERE slug = 'air-fryer'), '테팔 에어프라이어 엑스트라', 'Tefal', 159000, 'https://thumbnail11.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/08/15/15/5/af-tefal-001.jpg', 'https://www.coupang.com/vp/products/af006', '["preset_menu", "oil_free", "smart"]', 54, 4.5, 15430),
((SELECT id FROM categories WHERE slug = 'air-fryer'), '발뮤다 더 토스터 프로', 'BALMUDA', 429000, 'https://thumbnail12.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/06/25/10/6/af-balmuda-001.jpg', 'https://www.coupang.com/vp/products/af007', '["premium", "design", "smart"]', 56, 4.6, 5670),
((SELECT id FROM categories WHERE slug = 'air-fryer'), '리빙웰 대용량 에어프라이어', 'LivingWell', 99000, 'https://thumbnail13.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/10/10/16/7/af-lw-001.jpg', 'https://www.coupang.com/vp/products/af008', '["large_basket", "budget", "oil_free"]', 51, 4.4, 21230),
((SELECT id FROM categories WHERE slug = 'air-fryer'), '샤오미 에어프라이어 프로', 'Xiaomi', 119000, 'https://thumbnail14.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/09/20/17/8/af-xiaomi-001.jpg', 'https://www.coupang.com/vp/products/af009', '["smart", "preset_menu", "oil_free"]', 53, 4.4, 11120),
((SELECT id FROM categories WHERE slug = 'air-fryer'), '아이닉 에어프라이어', 'iNIC', 59900, 'https://thumbnail15.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/08/30/18/9/af-inic-001.jpg', 'https://www.coupang.com/vp/products/af010', '["budget", "small_size", "oil_free"]', 49, 4.3, 32100);

-- =====================
-- 4. PRODUCTS - 공기청정기
-- =====================

INSERT INTO products (category_id, name, brand, price, image_url, coupang_url, tags, score_base, rating, review_count) VALUES
((SELECT id FROM categories WHERE slug = 'air-purifier'), 'LG 퓨리케어 360', 'LG', 599000, 'https://thumbnail6.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/08/01/10/0/ap-lg-001.jpg', 'https://www.coupang.com/vp/products/ap001', '["wide_coverage", "hepa_filter", "smart", "air_quality_sensor"]', 62, 4.8, 14560),
((SELECT id FROM categories WHERE slug = 'air-purifier'), '삼성 비스포크 큐브', 'Samsung', 549000, 'https://thumbnail7.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/09/10/11/1/ap-samsung-001.jpg', 'https://www.coupang.com/vp/products/ap002', '["hepa_filter", "smart", "design", "air_quality_sensor"]', 60, 4.7, 11230),
((SELECT id FROM categories WHERE slug = 'air-purifier'), '위닉스 제로S', 'Winix', 389000, 'https://thumbnail8.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/07/20/09/2/ap-winix-001.jpg', 'https://www.coupang.com/vp/products/ap003', '["hepa_filter", "air_quality_sensor", "quiet"]', 56, 4.6, 18970),
((SELECT id FROM categories WHERE slug = 'air-purifier'), '샤오미 공기청정기 4', 'Xiaomi', 149000, 'https://thumbnail9.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/10/01/14/3/ap-xiaomi-001.jpg', 'https://www.coupang.com/vp/products/ap004', '["budget", "smart", "hepa_filter"]', 52, 4.4, 42310),
((SELECT id FROM categories WHERE slug = 'air-purifier'), '코웨이 에어메가 150', 'Coway', 299000, 'https://thumbnail10.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/09/05/12/4/ap-coway-001.jpg', 'https://www.coupang.com/vp/products/ap005', '["hepa_filter", "low_maintenance", "quiet"]', 54, 4.5, 9870),
((SELECT id FROM categories WHERE slug = 'air-purifier'), '다이슨 퓨어쿨', 'Dyson', 799000, 'https://thumbnail11.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/08/15/15/5/ap-dyson-001.jpg', 'https://www.coupang.com/vp/products/ap006', '["premium", "hepa_filter", "design", "smart"]', 58, 4.7, 6540),
((SELECT id FROM categories WHERE slug = 'air-purifier'), '블루에어 3410', 'Blueair', 459000, 'https://thumbnail12.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/06/25/10/6/ap-blueair-001.jpg', 'https://www.coupang.com/vp/products/ap007', '["hepa_filter", "quiet", "low_maintenance"]', 55, 4.6, 5430),
((SELECT id FROM categories WHERE slug = 'air-purifier'), '에어글 AG600', 'Airgle', 1890000, 'https://thumbnail13.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/10/10/16/7/ap-airgle-001.jpg', 'https://www.coupang.com/vp/products/ap008', '["premium", "hepa_filter", "wide_coverage", "quiet"]', 65, 4.9, 1230),
((SELECT id FROM categories WHERE slug = 'air-purifier'), '필립스 2000i', 'Philips', 349000, 'https://thumbnail14.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/09/20/17/8/ap-philips-001.jpg', 'https://www.coupang.com/vp/products/ap009', '["hepa_filter", "air_quality_sensor", "smart"]', 54, 4.5, 8760),
((SELECT id FROM categories WHERE slug = 'air-purifier'), '에어포스 미니', 'AirForce', 79000, 'https://thumbnail15.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/08/30/18/9/ap-af-001.jpg', 'https://www.coupang.com/vp/products/ap010', '["budget", "small_size", "quiet"]', 48, 4.2, 23450);

-- =====================
-- 4. PRODUCTS - 블루투스 이어폰
-- =====================

INSERT INTO products (category_id, name, brand, price, image_url, coupang_url, tags, score_base, rating, review_count) VALUES
((SELECT id FROM categories WHERE slug = 'earbuds'), '애플 에어팟 프로 2', 'Apple', 329000, 'https://thumbnail6.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/08/01/10/0/eb-apple-001.jpg', 'https://www.coupang.com/vp/products/eb001', '["anc", "comfortable", "clear_call", "premium"]', 62, 4.8, 45670),
((SELECT id FROM categories WHERE slug = 'earbuds'), '삼성 갤럭시 버즈2 프로', 'Samsung', 229000, 'https://thumbnail7.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/09/10/11/1/eb-samsung-001.jpg', 'https://www.coupang.com/vp/products/eb002', '["anc", "comfortable", "clear_call", "water_resistant"]', 60, 4.7, 32450),
((SELECT id FROM categories WHERE slug = 'earbuds'), '소니 WF-1000XM5', 'Sony', 359000, 'https://thumbnail8.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/07/20/09/2/eb-sony-001.jpg', 'https://www.coupang.com/vp/products/eb003', '["anc", "bass", "premium", "long_battery"]', 63, 4.9, 12340),
((SELECT id FROM categories WHERE slug = 'earbuds'), '젠하이저 모멘텀 4', 'Sennheiser', 299000, 'https://thumbnail9.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/10/01/14/3/eb-senn-001.jpg', 'https://www.coupang.com/vp/products/eb004', '["bass", "premium", "comfortable"]', 58, 4.7, 5670),
((SELECT id FROM categories WHERE slug = 'earbuds'), '샤오미 버즈 4 프로', 'Xiaomi', 89000, 'https://thumbnail10.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/09/05/12/4/eb-xiaomi-001.jpg', 'https://www.coupang.com/vp/products/eb005', '["anc", "budget", "long_battery"]', 52, 4.4, 28970),
((SELECT id FROM categories WHERE slug = 'earbuds'), '자브라 Elite 85t', 'Jabra', 189000, 'https://thumbnail11.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/08/15/15/5/eb-jabra-001.jpg', 'https://www.coupang.com/vp/products/eb006', '["anc", "clear_call", "comfortable"]', 55, 4.6, 9870),
((SELECT id FROM categories WHERE slug = 'earbuds'), '보스 QuietComfort', 'Bose', 279000, 'https://thumbnail12.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/06/25/10/6/eb-bose-001.jpg', 'https://www.coupang.com/vp/products/eb007', '["anc", "comfortable", "bass", "premium"]', 59, 4.7, 7650),
((SELECT id FROM categories WHERE slug = 'earbuds'), 'JBL Tune 230NC', 'JBL', 79000, 'https://thumbnail13.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/10/10/16/7/eb-jbl-001.jpg', 'https://www.coupang.com/vp/products/eb008', '["budget", "bass", "water_resistant"]', 50, 4.3, 34560),
((SELECT id FROM categories WHERE slug = 'earbuds'), '비츠 핏 프로', 'Beats', 199000, 'https://thumbnail14.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/09/20/17/8/eb-beats-001.jpg', 'https://www.coupang.com/vp/products/eb009', '["water_resistant", "bass", "comfortable"]', 54, 4.5, 11230),
((SELECT id FROM categories WHERE slug = 'earbuds'), 'QCY T13', 'QCY', 19900, 'https://thumbnail15.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/08/30/18/9/eb-qcy-001.jpg', 'https://www.coupang.com/vp/products/eb010', '["budget", "long_battery", "water_resistant"]', 46, 4.1, 67890);

-- =====================
-- 4. PRODUCTS - 로봇청소기
-- =====================

INSERT INTO products (category_id, name, brand, price, image_url, coupang_url, tags, score_base, rating, review_count) VALUES
((SELECT id FROM categories WHERE slug = 'robot-vacuum'), 'LG 코드제로 R9', 'LG', 1890000, 'https://thumbnail6.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/08/01/10/0/rv-lg-001.jpg', 'https://www.coupang.com/vp/products/rv001', '["mapping", "mopping", "auto_empty", "obstacle_avoid", "premium"]', 65, 4.8, 8760),
((SELECT id FROM categories WHERE slug = 'robot-vacuum'), '삼성 비스포크 제트봇 AI', 'Samsung', 1590000, 'https://thumbnail7.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/09/10/11/1/rv-samsung-001.jpg', 'https://www.coupang.com/vp/products/rv002', '["mapping", "obstacle_avoid", "auto_empty", "smart"]', 63, 4.7, 6540),
((SELECT id FROM categories WHERE slug = 'robot-vacuum'), '로보락 S8 Pro Ultra', 'Roborock', 1690000, 'https://thumbnail8.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/07/20/09/2/rv-roborock-001.jpg', 'https://www.coupang.com/vp/products/rv003', '["mapping", "mopping", "auto_empty", "obstacle_avoid", "powerful"]', 64, 4.8, 5430),
((SELECT id FROM categories WHERE slug = 'robot-vacuum'), '에코백스 디봇 X2 옴니', 'Ecovacs', 1390000, 'https://thumbnail9.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/10/01/14/3/rv-ecovacs-001.jpg', 'https://www.coupang.com/vp/products/rv004', '["mapping", "mopping", "auto_empty", "smart"]', 60, 4.6, 4320),
((SELECT id FROM categories WHERE slug = 'robot-vacuum'), '샤오미 로봇청소기 S10+', 'Xiaomi', 599000, 'https://thumbnail10.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/09/05/12/4/rv-xiaomi-001.jpg', 'https://www.coupang.com/vp/products/rv005', '["mapping", "mopping", "budget", "smart"]', 54, 4.5, 23450),
((SELECT id FROM categories WHERE slug = 'robot-vacuum'), '아이로봇 룸바 j7+', 'iRobot', 1290000, 'https://thumbnail11.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/08/15/15/5/rv-irobot-001.jpg', 'https://www.coupang.com/vp/products/rv006', '["obstacle_avoid", "mapping", "auto_empty", "pet_friendly"]', 58, 4.6, 7890),
((SELECT id FROM categories WHERE slug = 'robot-vacuum'), '드리미 L10s Ultra', 'Dreame', 899000, 'https://thumbnail12.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/06/25/10/6/rv-dreame-001.jpg', 'https://www.coupang.com/vp/products/rv007', '["mapping", "mopping", "powerful", "auto_empty"]', 56, 4.5, 6780),
((SELECT id FROM categories WHERE slug = 'robot-vacuum'), '유피 로봇청소기', 'Eufy', 299000, 'https://thumbnail13.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/10/10/16/7/rv-eufy-001.jpg', 'https://www.coupang.com/vp/products/rv008', '["budget", "quiet", "mapping"]', 50, 4.3, 18970),
((SELECT id FROM categories WHERE slug = 'robot-vacuum'), '치후 360 S9', 'Qihoo', 449000, 'https://thumbnail14.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/09/20/17/8/rv-qihoo-001.jpg', 'https://www.coupang.com/vp/products/rv009', '["mapping", "mopping", "budget"]', 52, 4.4, 11230),
((SELECT id FROM categories WHERE slug = 'robot-vacuum'), '아이라이프 V8s', 'ILIFE', 179000, 'https://thumbnail15.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2024/08/30/18/9/rv-ilife-001.jpg', 'https://www.coupang.com/vp/products/rv010', '["budget", "mopping", "quiet"]', 48, 4.2, 34560);
