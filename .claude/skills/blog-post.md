---
name: blog-post
description: 기술 블로그 글 작성 및 발행. 주제를 받아 전문적인 기술 블로그 글을 작성하고 Supabase에 발행합니다.
user_invocable: true
---

# 블로그 글 작성 및 발행

기술 블로그 글을 작성하고 Supabase에 발행하는 워크플로우입니다.

## 워크플로우

### 1단계: 주제 확인

사용자에게 다음을 확인합니다:
- **주제**: 어떤 기술/경험에 대해 쓸 것인지
- **참고 자료**: 관련 코드, 문서, URL이 있는지
- **대상 독자**: 초급/중급/고급 개발자 중 누구를 대상으로 할지

### 2단계: 글 작성

`drafts/` 디렉토리에 마크다운 파일을 생성합니다.

#### 파일 구조

```markdown
---
title: "제목"
slug: url-slug
description: "SEO용 요약 (1-2문장)"
tags:
  - 태그1
  - 태그2
category: 카테고리
published: true
---

본문 내용...
```

#### 작성 원칙

**반드시 CLAUDE.md의 "블로그 콘텐츠 규칙"을 준수합니다.**

- **구조**: "문제 → 왜 어려운가 → 해결 전략 → 시각 자료 → 교훈" 흐름
- **코드**: 전체 코드 나열 금지. 핵심 개념만 짧은 스니펫으로 보여줌
- **시각 자료**: 글에 반드시 1개 이상의 다이어그램/차트 포함
- **회사 정보**: 회사명, 사내 프로젝트명, 내부 시스템명 절대 금지. 일반화하여 표현

#### 시각 자료 사용법

**Mermaid 다이어그램** (순서도, 아키텍처):
```html
<div class="mermaid">
graph TD
    A["시작"] --> B["처리"]
    B --> C["완료"]
    style A fill:#3b82f6,stroke:#2563eb,color:#fff
</div>
```

**Chart.js 차트** (데이터 시각화):
```html
<div class="chart-container" style="max-width: 600px; margin: 0 auto;">
<canvas id="고유아이디"></canvas>
</div>

<script type="text/javascript">
setTimeout(function() {
  if (typeof Chart === 'undefined') return;
  var ctx = document.getElementById('고유아이디');
  if (!ctx || ctx.getAttribute('data-rendered')) return;
  ctx.setAttribute('data-rendered', 'true');
  new Chart(ctx, {
    type: 'bar',  // bar, line, doughnut, pie, radar 등
    data: { labels: [...], datasets: [...] },
    options: { responsive: true, plugins: { title: { display: true, text: '제목' } } }
  });
}, 200);
</script>
```

**info-box** (강조 박스):
```html
<div class="info-box blue">   <!-- blue, yellow, red, green -->
<strong>제목</strong><br/>
내용
</div>
```

**주의**: chart의 canvas id는 글 내에서 고유해야 합니다. setTimeout 딜레이는 200, 300, 400ms로 차트마다 다르게 설정합니다.

### 3단계: 발행

```bash
NODE_TLS_REJECT_UNAUTHORIZED=0 npx tsx scripts/publish-post.ts --file drafts/파일명.md
```

### 4단계: 확인

Playwright로 렌더링 결과를 확인합니다:

1. `mcp__playwright__browser_navigate`로 `http://localhost:3333/blog/slug` 접속
2. `mcp__playwright__browser_take_screenshot`으로 전체 스크린샷 확인
3. `mcp__playwright__browser_console_messages`로 에러 확인
4. 문제가 있으면 수정 후 재발행

### 5단계: 커밋

사용자가 요청하면 git commit & push합니다.

## 체크리스트

발행 전 확인사항:
- [ ] 회사 관련 내용이 없는지 확인 (와디즈, 직장명, 사내 프로젝트명 등)
- [ ] `~` 문자가 `\~`로 이스케이프되어 있는지
- [ ] Mermaid 문법이 올바른지 (block-beta 사용 금지, graph/flowchart 사용)
- [ ] Chart.js canvas id가 고유한지
- [ ] frontmatter의 slug, title, description, tags가 모두 채워져 있는지
- [ ] 시각 자료가 1개 이상 포함되어 있는지
