# PickForMe 프로젝트 셋업 가이드

## 목차
1. [사전 요구사항](#1-사전-요구사항)
2. [Supabase 설정](#2-supabase-설정)
3. [Gemini API 설정](#3-gemini-api-설정)
4. [프로젝트 설치](#4-프로젝트-설치)
5. [데이터베이스 초기화](#5-데이터베이스-초기화)
6. [개발 서버 실행](#6-개발-서버-실행)
7. [배포 (Vercel)](#7-배포-vercel)

---

## 1. 사전 요구사항

- **Node.js** 18.17 이상
- **npm** 또는 **yarn**
- **Git**

버전 확인:
```bash
node -v   # v18.17.0 이상
npm -v    # 9.0.0 이상
```

---

## 2. Supabase 설정

### 2.1 프로젝트 생성

1. [https://supabase.com](https://supabase.com) 접속
2. **New Project** 클릭
3. 프로젝트 정보 입력:
   - **Name**: `pickforme`
   - **Database Password**: 안전한 비밀번호 설정 (메모해두세요)
   - **Region**: `Northeast Asia (Seoul)` 선택
4. **Create new project** 클릭

### 2.2 API 키 확인

프로젝트 생성 후:

1. 왼쪽 메뉴 **Settings** → **API** 클릭
2. 다음 값들을 복사:

| 항목 | 환경 변수 |
|------|----------|
| Project URL | `NEXT_PUBLIC_SUPABASE_URL` |
| anon public | `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| service_role | `SUPABASE_SERVICE_ROLE_KEY` |

> ⚠️ **주의**: `service_role` 키는 절대 클라이언트에 노출하면 안 됩니다!

### 2.3 OAuth 설정 (선택 - 소셜 로그인용)

**Google 로그인:**
1. [Google Cloud Console](https://console.cloud.google.com)에서 OAuth 2.0 클라이언트 생성
2. Supabase → **Authentication** → **Providers** → **Google**
3. Client ID, Secret 입력

**Kakao 로그인:**
1. [Kakao Developers](https://developers.kakao.com)에서 앱 생성
2. Supabase → **Authentication** → **Providers** → **Kakao**
3. REST API 키 입력

---

## 3. Gemini API 설정

1. [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey) 접속
2. Google 계정 로그인
3. **Create API Key** 클릭
4. 생성된 API Key 복사 → `.env.local`의 `GEMINI_API_KEY`에 입력

> 💡 Gemini API는 무료 티어로 분당 60회 요청 가능

---

## 4. 프로젝트 설치

### 4.1 저장소 클론 (이미 완료된 경우 스킵)

```bash
cd D:\git\geniuskey\pickforme
```

### 4.2 의존성 설치

```bash
npm install
```

### 4.3 환경 변수 설정

`.env.local` 파일을 열고 실제 값으로 수정:

```env
# 필수 설정
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
GEMINI_API_KEY=AIzaSy...
ADMIN_API_KEY=my-secret-admin-key-12345
```

---

## 5. 데이터베이스 초기화

### 5.1 스키마 생성

1. Supabase Dashboard → **SQL Editor** 클릭
2. **New Query** 클릭
3. `supabase/schema.sql` 파일 내용 전체 복사 & 붙여넣기
4. **Run** 클릭

### 5.2 시드 데이터 입력

1. **New Query** 클릭
2. `supabase/seed.sql` 파일 내용 전체 복사 & 붙여넣기
3. **Run** 클릭

### 5.3 확인

**Table Editor**에서 다음 테이블들이 생성되었는지 확인:
- ✅ categories (5개 레코드)
- ✅ questions (30개 레코드)
- ✅ products (50개 레코드)
- ✅ result_types (20개 레코드)
- ✅ test_sessions (빈 테이블)
- ✅ users (빈 테이블)
- ✅ user_history (빈 테이블)
- ✅ price_history (빈 테이블)

---

## 6. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 확인:
- 🏠 메인 페이지: [http://localhost:3000](http://localhost:3000)
- 🧪 테스트 페이지: [http://localhost:3000/test/humidifier](http://localhost:3000/test/humidifier)
- 📂 카테고리: [http://localhost:3000/categories](http://localhost:3000/categories)

### 기타 명령어

```bash
# 타입 체크
npm run type-check

# 린트
npm run lint

# 프로덕션 빌드
npm run build

# 프로덕션 서버
npm run start
```

---

## 7. 배포 (Vercel)

### 7.1 Vercel 연결

1. [https://vercel.com](https://vercel.com) 로그인
2. **Add New** → **Project**
3. Git 저장소 연결 (GitHub/GitLab/Bitbucket)
4. `pickforme` 저장소 선택

### 7.2 환경 변수 설정

**Settings** → **Environment Variables**에서 모든 환경 변수 추가:

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
GEMINI_API_KEY
ADMIN_API_KEY
```

### 7.3 배포

**Deploy** 클릭하면 자동 빌드 & 배포

배포 완료 후 URL:
- `https://pickforme-xxx.vercel.app`

### 7.4 도메인 연결 (선택)

**Settings** → **Domains**에서 커스텀 도메인 추가:
- `pickforme.kr`

---

## 트러블슈팅

### 문제: "Module not found" 에러
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

### 문제: Supabase 연결 실패
- `.env.local` 파일의 URL과 키 확인
- Supabase 프로젝트가 활성화 상태인지 확인

### 문제: 테스트 페이지 404
- 데이터베이스에 시드 데이터가 입력되었는지 확인
- `categories` 테이블에 `is_active = true`인 레코드 확인

### 문제: 이미지 로딩 실패
- `next.config.js`의 `remotePatterns` 설정 확인
- 이미지 URL이 유효한지 확인

---

## 프로젝트 구조

```
pickforme/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API Routes (백엔드)
│   │   ├── test/[slug]/       # 테스트 페이지
│   │   ├── result/[slug]/     # 결과 페이지
│   │   ├── login/             # 로그인
│   │   ├── signup/            # 회원가입
│   │   ├── mypage/            # 마이페이지
│   │   └── categories/        # 카테고리 목록
│   ├── components/            # React 컴포넌트
│   │   ├── ui/               # 공통 UI
│   │   ├── layout/           # 레이아웃
│   │   ├── home/             # 홈 페이지
│   │   ├── test/             # 테스트
│   │   ├── result/           # 결과
│   │   ├── auth/             # 인증
│   │   ├── ads/              # 광고
│   │   └── product/          # 제품 관련
│   ├── lib/                   # 유틸리티
│   │   ├── supabase/         # Supabase 클라이언트
│   │   ├── platforms/        # 외부 플랫폼 API
│   │   ├── scoring.ts        # 점수 계산
│   │   └── utils.ts          # 공통 함수
│   ├── store/                 # Zustand 상태
│   └── types/                 # TypeScript 타입
├── supabase/
│   ├── schema.sql            # DB 스키마
│   └── seed.sql              # 시드 데이터
├── .env.local                 # 환경 변수
├── next.config.js            # Next.js 설정
├── tailwind.config.ts        # Tailwind 설정
└── vercel.json               # Vercel 설정
```

---

## API 엔드포인트

| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/api/categories` | 카테고리 목록 |
| GET | `/api/test/[slug]` | 테스트 질문 조회 |
| POST | `/api/result` | 결과 계산 |
| POST | `/api/admin/generate` | LLM 카테고리 생성 |
| GET/POST | `/api/history` | 사용자 히스토리 |
| GET | `/api/products/compare` | 가격 비교 |
| GET/POST | `/api/products/price-history` | 가격 히스토리 |
| POST | `/api/products/analyze-reviews` | 리뷰 분석 |

---

## 다음 단계

1. ✅ 프로젝트 셋업 완료
2. 🔄 실제 쿠팡 파트너스 제품 URL로 교체
3. 🔄 추가 카테고리 생성 (LLM 자동 생성 활용)
4. 🔄 Google AdSense 승인 후 광고 적용
5. 🔄 커스텀 도메인 연결
