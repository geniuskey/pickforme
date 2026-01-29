# PickForMe - Technical Requirements Document

## 1. 기술 스택

### 1.1 프론트엔드
| 항목 | 선택 | 이유 |
|------|------|------|
| Framework | **Next.js 14+** (App Router) | SEO (SSR/SSG), 빠른 개발 |
| Styling | **Tailwind CSS** | 빠른 UI 개발, 일관성 |
| Animation | **Framer Motion** | 질문 전환 애니메이션 |
| State | **Zustand** | 테스트 진행 상태 관리 |

### 1.2 백엔드
| 항목 | 선택 | 이유 |
|------|------|------|
| Runtime | **Next.js API Routes** | 별도 서버 불필요 |
| LLM | **Gemini 3.0 Flash** | 저렴, 한글 양호, 멀티모달 |
| Scheduler | **Vercel Cron** | 자동 컨텐츠 생성용 |

### 1.3 데이터베이스
| 항목 | 선택 | 이유 |
|------|------|------|
| Primary | **Supabase (PostgreSQL)** | 무료 티어, 실시간, Auth 내장 |
| Cache | **Vercel KV (Redis)** | 결과 캐싱 |

### 1.4 호스팅 & 배포
| 항목 | 선택 | 이유 |
|------|------|------|
| Hosting | **Vercel** | Next.js 최적화, 무료 티어 |
| Domain | `pickforme.kr` | 추후 연결 |
| CDN | Vercel Edge | 자동 |

### 1.5 외부 서비스
| 서비스 | 용도 | 비용 |
|--------|------|------|
| Gemini 3.0 Flash API | 컨텐츠 생성 | ~$0.10/1M 토큰 |
| 쿠팡 파트너스 | 제휴 링크 | 무료 |
| Google AdSense | 광고 (Phase 2) | 무료 |
| Vercel Analytics | 트래픽 분석 | 무료 티어 |

---

## 2. 시스템 아키텍처

```
┌─────────────────────────────────────────────────────────────┐
│                         Client                               │
│  (Next.js SSR/CSR + Tailwind + Framer Motion + Zustand)     │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Vercel Edge Network                       │
│                   (CDN + Edge Functions)                     │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   Next.js API Routes                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │ /api/test   │  │ /api/result │  │ /api/admin/generate │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
          ┌───────────────────┼───────────────────┐
          ▼                   ▼                   ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   Supabase      │  │   Vercel KV     │  │  Gemini API     │
│  (PostgreSQL)   │  │    (Redis)      │  │  (LLM)          │
│                 │  │                 │  │                 │
│ - categories    │  │ - result cache  │  │ - 질문 생성     │
│ - questions     │  │ - popular tests │  │ - 제품 태깅     │
│ - products      │  │                 │  │ - 결과 텍스트   │
│ - result_types  │  │                 │  │                 │
└─────────────────┘  └─────────────────┘  └─────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Vercel Cron Jobs                          │
│           (매일 자동 컨텐츠 생성 트리거)                      │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. 데이터베이스 스키마

### 3.1 categories
```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(100) UNIQUE NOT NULL,      -- 'humidifier'
  name_ko VARCHAR(100) NOT NULL,          -- '가습기'
  name_en VARCHAR(100) NOT NULL,          -- 'Humidifier'
  description TEXT,
  icon VARCHAR(50),                        -- emoji or icon name
  is_active BOOLEAN DEFAULT true,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 3.2 questions
```sql
CREATE TABLE questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  order_num INTEGER NOT NULL,              -- 질문 순서
  question_text TEXT NOT NULL,             -- "하루 종일 집에 있는 편인가요?"
  question_type VARCHAR(20) DEFAULT 'yes_no', -- 'yes_no' | 'choice'
  options JSONB,                           -- choice인 경우: ["옵션A", "옵션B"]
  tags_yes JSONB,                          -- Yes 선택 시 부여할 태그: ["large_capacity"]
  tags_no JSONB,                           -- No 선택 시 부여할 태그
  weight INTEGER DEFAULT 1,                -- 가중치
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 3.3 products
```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  name VARCHAR(500) NOT NULL,
  brand VARCHAR(100),
  price INTEGER,                           -- 원 단위
  image_url TEXT,
  coupang_url TEXT NOT NULL,               -- 쿠팡 파트너스 링크
  tags JSONB NOT NULL,                     -- ["large_capacity", "quiet", "easy_clean"]
  score_base INTEGER DEFAULT 50,           -- 기본 점수
  rating DECIMAL(2,1),                     -- 쿠팡 평점
  review_count INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 3.4 result_types
```sql
CREATE TABLE result_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  type_code VARCHAR(50) NOT NULL,          -- 'lazy_homebody'
  type_name VARCHAR(100) NOT NULL,         -- '귀차니즘 집순이'
  description TEXT NOT NULL,               -- 타입 설명
  tag_conditions JSONB NOT NULL,           -- 이 타입에 해당하는 태그 조합
  priority INTEGER DEFAULT 0,              -- 여러 타입 매칭 시 우선순위
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 3.5 test_sessions (Analytics용)
```sql
CREATE TABLE test_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES categories(id),
  answers JSONB,                           -- 응답 기록
  result_type_id UUID REFERENCES result_types(id),
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 4. API 명세

### 4.1 GET /api/categories
카테고리 목록 조회

**Response:**
```json
{
  "categories": [
    {
      "id": "uuid",
      "slug": "humidifier",
      "name_ko": "가습기",
      "icon": "💨",
      "view_count": 1234
    }
  ]
}
```

### 4.2 GET /api/test/[slug]
테스트 질문 조회

**Response:**
```json
{
  "category": {
    "id": "uuid",
    "name_ko": "가습기"
  },
  "questions": [
    {
      "id": "uuid",
      "order_num": 1,
      "question_text": "하루 종일 집에 있는 편인가요?",
      "question_type": "yes_no"
    }
  ]
}
```

### 4.3 POST /api/result
결과 계산

**Request:**
```json
{
  "category_id": "uuid",
  "answers": [
    { "question_id": "uuid", "answer": "yes" },
    { "question_id": "uuid", "answer": "no" }
  ]
}
```

**Response:**
```json
{
  "result_type": {
    "type_name": "귀차니즘 집순이",
    "description": "물 자주 갈기 귀찮고..."
  },
  "products": [
    {
      "rank": 1,
      "name": "샤오미 가습기 2",
      "price": 45000,
      "image_url": "...",
      "coupang_url": "...",
      "match_reason": "대용량 + 세척 용이"
    }
  ]
}
```

### 4.4 POST /api/admin/generate (Protected)
LLM으로 신규 카테고리 생성

**Request:**
```json
{
  "category_name": "전기포트",
  "api_key": "admin_secret"
}
```

---

## 5. 스코어링 알고리즘

### 5.1 점수 계산 로직

```typescript
function calculateProductScore(product: Product, userTags: string[]): number {
  let score = product.score_base;
  
  // 태그 매칭 점수
  for (const tag of userTags) {
    if (product.tags.includes(tag)) {
      score += 10; // 태그당 +10점
    }
  }
  
  // 평점 보너스
  if (product.rating >= 4.5) score += 5;
  
  // 리뷰 수 보너스
  if (product.review_count >= 1000) score += 3;
  
  return score;
}
```

### 5.2 결과 타입 결정

```typescript
function determineResultType(userTags: string[], resultTypes: ResultType[]): ResultType {
  let bestMatch = null;
  let bestScore = 0;
  
  for (const type of resultTypes) {
    const matchCount = type.tag_conditions.filter(tag => userTags.includes(tag)).length;
    const score = matchCount / type.tag_conditions.length;
    
    if (score > bestScore) {
      bestScore = score;
      bestMatch = type;
    }
  }
  
  return bestMatch;
}
```

---

## 6. LLM 프롬프트 설계

### 6.1 질문 생성 프롬프트

```
당신은 쇼핑 전문가입니다. "{category_name}" 구매 시 고려해야 할 핵심 요소를 파악하고, 
사용자의 니즈를 파악할 수 있는 Yes/No 질문 6개를 만들어주세요.

요구사항:
1. 질문은 친근하고 캐주얼한 말투로
2. 각 질문은 특정 제품 특성(태그)과 연결되어야 함
3. 질문 순서는 중요도 순

출력 형식 (JSON):
{
  "questions": [
    {
      "question_text": "...",
      "tags_yes": ["tag1", "tag2"],
      "tags_no": ["tag3"]
    }
  ]
}
```

### 6.2 결과 타입 생성 프롬프트

```
다음 태그 조합에 대해 재미있는 사용자 타입을 만들어주세요.

태그: {tags}
카테고리: {category_name}

요구사항:
1. MZ세대가 공감할 수 있는 유머러스한 타입명
2. 2-3문장의 공감가는 설명
3. SNS에 공유하고 싶을 정도로 찰떡인 표현

출력 형식 (JSON):
{
  "type_name": "귀차니즘 집순이",
  "description": "물 갈기 귀찮아서 미루다 보면..."
}
```

---

## 7. 보안 & 성능

### 7.1 보안
- Admin API: API Key 인증
- Rate Limiting: Vercel Edge로 IP당 제한
- SQL Injection: Supabase Parameterized Queries

### 7.2 성능 최적화
- ISR (Incremental Static Regeneration): 카테고리 페이지 1시간 캐시
- Redis 캐싱: 인기 결과 조합 캐시
- 이미지 최적화: Next.js Image + WebP

### 7.3 모니터링
- Vercel Analytics: 트래픽
- Supabase Dashboard: DB 쿼리
- Sentry (추후): 에러 트래킹

---

## 8. 개발 환경 설정

### 8.1 필수 환경 변수

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Gemini
GEMINI_API_KEY=

# Admin
ADMIN_API_KEY=

# Coupang Partners
COUPANG_ACCESS_KEY=
COUPANG_SECRET_KEY=
```

### 8.2 로컬 개발

```bash
# 설치
npm install

# 개발 서버
npm run dev

# 타입 체크
npm run type-check

# 빌드
npm run build
```

---

## 9. 배포 파이프라인

```
main branch push
       │
       ▼
  Vercel Auto Deploy
       │
       ├── Build (Next.js)
       ├── Type Check
       └── Deploy to Production
       │
       ▼
  Vercel Cron (매일 09:00 KST)
       │
       └── /api/admin/generate 호출
           └── 신규 카테고리 자동 생성
```
