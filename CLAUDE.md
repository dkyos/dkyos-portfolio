@AGENTS.md

# 프로젝트 규칙

## 블로그 콘텐츠 규칙

### 금지 사항
- **회사 관련 내용 절대 금지**: 와디즈(wadiz), 현재/이전 직장명, 사내 프로젝트명, 내부 시스템명을 블로그 글에 포함하지 않는다
- 특정 고객사, 파트너사 이름을 언급하지 않는다
- 사내 코드 저장소 경로, 내부 API 엔드포인트를 포함하지 않는다

### 작성 원칙
- 기술 개념과 설계 결정을 중심으로 서술한다 (코드 나열 지양)
- 특정 회사 프로젝트를 "최근 프로젝트", "이커머스 플랫폼", "콘텐츠 플랫폼" 등으로 일반화한다
- "문제 → 해결 전략 → 시각 자료 → 교훈" 순서의 스토리텔링 구조를 사용한다

### 시각 자료 활용
- **Mermaid**: 순서도, 아키텍처, 프로세스 흐름에 사용 (`<div class="mermaid">`)
- **Chart.js**: 데이터 비교, 비용 분석, 성능 차트에 사용 (`<canvas>` + `<script>`)
- **info-box**: 정의, 주의사항, 팁 강조에 사용 (`<div class="info-box blue/yellow/red/green">`)
- **표**: 설계 결정의 트레이드오프 비교에 사용
- 코드 블록은 꼭 필요한 경우만 짧게 사용하고, 전체 코드를 나열하지 않는다

### 마크다운 주의사항
- `~` 문자는 GFM 취소선으로 파싱되므로 `\~`로 이스케이프한다 (예: `30\~50px`)

## 기술 스택

- Next.js 15 (App Router) + TypeScript + Tailwind CSS v4
- Supabase (DB + Auth)
- Vercel 배포 (GitHub push → 자동 배포)
- 개발 서버: `npm run dev` (포트 3333, NODE_TLS_REJECT_UNAUTHORIZED=0)

## 블로그 글 발행

```bash
NODE_TLS_REJECT_UNAUTHORIZED=0 npx tsx scripts/publish-post.ts --file drafts/파일명.md
```

## 회고 블로그 글 작성

- Confluence에서 연간 활동 데이터를 수집하여 초안 작성
- CQL 검색: `creator = "5d5cd2895a68ef0ca625626f" AND created >= "YYYY-01-01" AND created < "YYYY+1-01-01" AND type = page ORDER BY created ASC`
- Confluence Cloud ID: `67ec6394-73cd-4285-a64d-a993093af906`
- 기존 초안 참고: `drafts/` 폴더의 `20XX-*-retrospective.md` 파일들
- 분량: 400\~500줄, Mermaid/info-box/표 적극 활용
- `published_at` 날짜 규칙: N년 회고 → N+1년 1월 1일 (KST)
- Supabase `posts` 테이블, `slug` 기준 upsert
