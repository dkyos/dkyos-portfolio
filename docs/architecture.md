# DKyos 포트폴리오 - 아키텍처 문서

## 1. 기술 스택

| 영역 | 기술 | 버전 |
|------|------|------|
| 프레임워크 | Next.js (App Router) | 16.2.1 |
| 언어 | TypeScript | 5.x |
| UI | React | 19.2.4 |
| 스타일링 | Tailwind CSS | 4.x |
| DB / Auth | Supabase | 2.x |
| 배포 | Vercel | - |
| 마크다운 | react-markdown + rehype/remark | - |
| 코드 하이라이팅 | Shiki (rehype-pretty-code) | 4.x |
| 다이어그램 | Mermaid (CDN) | - |
| 차트 | Chart.js (CDN) | - |

---

## 2. 디렉토리 구조

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # 루트 레이아웃 (메타데이터, 폰트, 테마)
│   ├── page.tsx                  # 홈페이지
│   ├── error.tsx                 # 전역 에러 바운더리
│   ├── not-found.tsx             # 전역 404
│   ├── globals.css               # CSS 변수, 다크모드, 전역 스타일
│   ├── blog/
│   │   ├── page.tsx              # 블로그 목록
│   │   └── [slug]/
│   │       ├── page.tsx          # 블로그 상세
│   │       └── not-found.tsx     # 글 전용 404
│   ├── about/
│   │   └── page.tsx              # 소개 페이지
│   ├── admin/
│   │   ├── login/page.tsx        # 로그인
│   │   ├── actions.ts            # Server Actions (CRUD)
│   │   └── (dashboard)/          # 인증 보호 영역
│   │       ├── layout.tsx        # 인증 체크 + 리다이렉트
│   │       ├── page.tsx          # 대시보드
│   │       └── posts/            # 글 관리
│   ├── api/
│   │   ├── posts/route.ts        # 글 CRUD API (CLI 발행용)
│   │   ├── views/route.ts        # 조회수 API
│   │   └── og/route.tsx          # OG 이미지 생성
│   ├── feed.xml/route.ts         # RSS 피드
│   ├── sitemap.ts                # 사이트맵
│   └── robots.ts                 # robots.txt
├── components/
│   ├── layout/                   # 레이아웃 (Header, Footer, ThemeProvider)
│   ├── blog/                     # 블로그 (PostCard, PostContent, ShareButton)
│   ├── admin/                    # 관리자 (PostEditor, EditorMeta, EditorToolbar 등)
│   ├── about/                    # 소개 (Timeline)
│   ├── ui/                       # 공용 UI (Button, ConfirmModal, ThemeToggle, Skeleton)
│   └── seo/                      # SEO (JsonLdScript)
├── lib/
│   ├── constants.ts              # 사이트 설정, PROSE_CLASSES
│   ├── format.ts                 # 날짜 포맷팅
│   ├── types.ts                  # 앱 레벨 타입 (PostListItem 등)
│   ├── posts.ts                  # 글 데이터 접근 함수
│   ├── markdown-parser.ts        # 마크다운 파싱 (Mermaid/Chart 블록 추출)
│   ├── cdn-loader.ts             # CDN 스크립트 동적 로딩 유틸
│   ├── hooks/
│   │   └── usePostEditor.ts      # PostEditor 상태 관리 훅
│   └── supabase/
│       ├── types.ts              # DB 스키마 타입 (자동 생성)
│       ├── server.ts             # 서버 클라이언트 (service role / anon)
│       ├── auth-server.ts        # SSR 인증 클라이언트 (쿠키)
│       └── auth-client.ts        # 브라우저 인증 클라이언트
├── data/
│   ├── profile.ts                # 프로필 데이터
│   └── timeline.ts               # 이력 데이터
├── scripts/
│   └── publish-post.ts           # CLI 글 발행 스크립트
├── drafts/                       # 마크다운 초안
└── docs/
    ├── prd.md                    # 제품 요구사항 문서
    └── architecture.md           # 아키텍처 문서 (이 파일)
```

---

## 3. 데이터 흐름

### 읽기 (공개 페이지)

```
Server Component
  → lib/posts.ts (getAllPosts, getPostBySlug)
    → lib/supabase/server.ts (createReadOnlyClient, anon key)
      → Supabase DB
```

- React `cache()`로 동일 렌더링 내 중복 호출 방지
- ISR `revalidate: 60`으로 60초마다 재검증

### 쓰기 (관리자)

```
Client Component (PostEditor, DeletePostButton 등)
  → Server Action (admin/actions.ts)
    → lib/supabase/auth-server.ts (createAuthClient, 쿠키 기반)
      → Supabase DB
```

### 쓰기 (CLI 발행)

```
scripts/publish-post.ts
  → API Route (/api/posts, Bearer token)
    → lib/supabase/server.ts (createServerClient, service role key)
      → Supabase DB
```

---

## 4. DB 스키마

### 현재 테이블

#### posts

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | UUID (PK) | 자동 생성 |
| slug | TEXT (UNIQUE) | URL 슬러그 |
| title | TEXT | 제목 |
| description | TEXT | 설명 |
| content | TEXT | 마크다운 본문 |
| tags | TEXT[] | 태그 배열 |
| category | TEXT | 카테고리 |
| cover_image | TEXT | 커버 이미지 URL |
| published | BOOLEAN | 공개 여부 |
| published_at | TIMESTAMPTZ | 발행일 |
| created_at | TIMESTAMPTZ | 생성일 |
| updated_at | TIMESTAMPTZ | 수정일 |

#### page_views

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | UUID (PK) | 자동 생성 |
| slug | TEXT (UNIQUE) | 글 슬러그 |
| view_count | INTEGER | 조회수 |
| updated_at | TIMESTAMPTZ | 수정일 |

#### DB 함수

- `increment_view_count(p_slug TEXT)`: 조회수 원자적 증가

### 향후 추가 테이블

#### likes (계획)

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | UUID (PK) | 자동 생성 |
| post_id | UUID (FK → posts) | 글 ID |
| fingerprint | TEXT | 브라우저 핑거프린트 |
| created_at | TIMESTAMPTZ | 생성일 |
| UNIQUE(post_id, fingerprint) | | 중복 방지 |

#### comments (계획)

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | UUID (PK) | 자동 생성 |
| post_id | UUID (FK → posts) | 글 ID |
| parent_id | UUID (FK → comments) | 대댓글 부모 |
| author_name | TEXT | 작성자 닉네임 |
| content | TEXT | 댓글 내용 |
| approved | BOOLEAN | 승인 여부 |
| created_at | TIMESTAMPTZ | 생성일 |

---

## 5. Supabase 클라이언트 역할

| 클라이언트 | 파일 | 키 | 용도 |
|-----------|------|-----|------|
| readOnlyClient | server.ts | anon key | Server Component에서 공개 데이터 조회 |
| serverClient | server.ts | service role key | API Route에서 관리자 작업 (CLI 발행) |
| authClient | auth-server.ts | anon key + 쿠키 | Server Action에서 인증된 작업 |
| authBrowserClient | auth-client.ts | anon key | 브라우저에서 로그인/로그아웃 |

---

## 6. 배포 파이프라인

```
개발자 (로컬)
  → git push (main 브랜치)
    → GitHub
      → Vercel (자동 빌드 + 배포)
        → https://dkyos.vercel.app
```

- 환경변수: Vercel 대시보드에서 관리
- 프리뷰 배포: PR 생성 시 자동
