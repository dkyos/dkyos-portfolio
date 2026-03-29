---
title: "바이브코딩으로 337커밋 만에 전사 앱 PoC 완성하기"
slug: vibe-coding-flutter-poc
description: "1인 개발자가 AI(Claude Code) 기반 바이브코딩으로 Flutter 전사 앱 PoC를 구축한 사례. 아키텍처 설계부터 10개 기능 모듈, 19,000줄 코드, 141개 테스트까지의 여정을 공유합니다."
tags:
  - Flutter
  - 바이브코딩
  - AI
  - 아키텍처
  - PoC
category: 개발
published: true
---

## 들어가며

"앱을 만들어야 하는데, 모바일 개발자가 없다."

기업에서 흔히 겪는 상황입니다. 새로운 서비스의 가능성을 검증하려면 PoC(Proof of Concept)가 필요한데, 모바일 전담 인력을 배치하기엔 리소스가 부족합니다.

이 글은 **1인 개발자가 AI 기반 바이브코딩(Vibe Coding)으로 전사 앱 PoC를 완성한 실전 사례**입니다. Flutter로 6개 플랫폼을 지원하고, 10개 핵심 기능을 갖춘 앱을 **337커밋** 만에 구축했습니다.

<div class="info-box blue">
<strong>바이브코딩(Vibe Coding)이란?</strong><br/>
AI 코딩 어시스턴트(Claude Code, GitHub Copilot 등)와 대화하며 개발하는 방식입니다. 개발자가 아키텍처와 방향을 설정하고, AI가 구현 세부사항을 처리합니다. "코드를 직접 타이핑하는 것"에서 "AI에게 의도를 전달하고 결과를 검증하는 것"으로 개발 패러다임이 바뀝니다.
</div>

---

## 전체 아키텍처

가장 먼저 결정한 것은 **레이어 구조**입니다. PoC라도 나중에 프로덕션으로 전환할 수 있어야 하므로, 처음부터 계층을 명확히 분리했습니다.

<div class="mermaid">
graph TB
    subgraph PRESENTATION["Presentation Layer"]
        direction LR
        P1["Screens\n(50+ 화면)"]
        P2["Widgets\n(재사용 UI)"]
        P3["Providers\n(Riverpod)"]
    end

    subgraph SERVICE["Service Layer"]
        direction LR
        S1["비즈니스 로직"]
        S2["세션 동기화"]
        S3["포인트 계산"]
    end

    subgraph DATA["Data Layer"]
        direction LR
        D1["Repositories\n(데이터 접근 추상화)"]
        D2["Models\n(Freezed 불변 객체)"]
        D3["Datasources\n(외부 서비스)"]
    end

    subgraph CORE["Core Layer"]
        direction LR
        C1["Config\n(환경 관리)"]
        C2["Network\n(Dio HTTP)"]
        C3["Router\n(GoRouter)"]
        C4["Theme\n(디자인 시스템)"]
    end

    PRESENTATION --> SERVICE
    SERVICE --> DATA
    DATA --> CORE

    style PRESENTATION fill:#3b82f6,stroke:#2563eb,color:#fff
    style SERVICE fill:#f59e0b,stroke:#d97706,color:#fff
    style DATA fill:#10b981,stroke:#059669,color:#fff
    style CORE fill:#6366f1,stroke:#4f46e5,color:#fff
</div>

핵심 원칙은 **"위에서 아래로만 의존"**입니다. Presentation은 Service를 알지만, Service는 Presentation을 모릅니다. 이 덕분에 기능 모듈을 독립적으로 추가/제거할 수 있었습니다.

---

## 기술 스택: 왜 이것을 선택했나

PoC에서 기술 선택은 **"빠르게 만들 수 있으면서 나중에 프로덕션으로 전환 가능한가"**가 기준이었습니다.

| 영역 | 선택 | 대안 | 선택 이유 |
|------|------|------|----------|
| **프레임워크** | Flutter | React Native | 단일 코드로 6플랫폼 지원. Dart의 타입 안전성 |
| **상태관리** | Riverpod | BLoC, Provider | 불변성 우선, 보일러플레이트 최소, 코드 생성 친화적 |
| **라우팅** | GoRouter | Navigator 2.0 | 타입 안전 네임드 라우트, 딥링킹 지원 |
| **백엔드** | Supabase | Firebase | PostgreSQL 유연성, 복잡한 관계형 데이터에 적합 |
| **HTTP** | Dio | http 패키지 | 인터셉터, 재시도 로직, 로깅 일괄 관리 |
| **모델** | Freezed | 수동 작성 | 불변 객체 자동 생성, copyWith/toJson/fromJson |
| **보안 저장** | SecureStorage | SharedPreferences | 인증 토큰은 반드시 암호화 저장 |

<div class="info-box yellow">
<strong>Riverpod을 선택한 결정적 이유</strong><br/>
바이브코딩에서는 AI가 상태 관리 코드를 생성하는 경우가 많습니다. Riverpod은 BLoC보다 보일러플레이트가 적고, Provider보다 타입 안전하여 <strong>AI가 생성한 코드의 오류율이 현저히 낮았습니다.</strong>
</div>

---

## 10개 핵심 기능

PoC이지만 실제 서비스 수준의 기능을 구현했습니다. 각 기능은 독립 모듈로 분리되어 있습니다.

<div class="chart-container" style="max-width: 650px; margin: 0 auto;">
<canvas id="featureChart"></canvas>
</div>

<script type="text/javascript">
setTimeout(function() {
  if (typeof Chart === 'undefined') return;
  var ctx = document.getElementById('featureChart');
  if (!ctx || ctx.getAttribute('data-rendered')) return;
  ctx.setAttribute('data-rendered', 'true');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['AI 채팅', '퀴즈', '피드백/포인트', '온보딩', '가이드 검색', '그룹채팅', '생성형 AI', '라이브 이벤트', '코칭', '매뉴얼'],
      datasets: [{
        label: '추정 코드 규모 (상대값)',
        data: [18, 15, 14, 12, 10, 13, 11, 9, 8, 6],
        backgroundColor: '#3b82f6',
        borderRadius: 4
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      plugins: {
        title: { display: true, text: '기능별 코드 규모 (상대값)', font: { size: 15 } },
        legend: { display: false }
      },
      scales: { x: { beginAtZero: true } }
    }
  });
}, 200);
</script>

### 하이브리드 접근: 네이티브 + WebView

가장 중요한 아키텍처 결정은 **하이브리드 전략**이었습니다.

| 영역 | 구현 방식 | 이유 |
|------|----------|------|
| AI 채팅, 퀴즈, 포인트 | **네이티브 Flutter** | 실시간 인터랙션, 복잡한 상태 관리 필요 |
| 기존 웹 서비스 | **WebView** | 이미 완성된 웹앱 재활용, 이중 개발 방지 |

이 전략 덕분에 **기존 서비스를 그대로 유지하면서 새로운 기능만 네이티브로 추가**할 수 있었습니다. 세션 동기화가 핵심 과제였는데, 네이티브에서 로그인한 세션을 WebView에 자동 전달하는 브릿지를 구현하여 해결했습니다.

### 실시간 AI 채팅

WebSocket 기반의 실시간 AI 채팅은 가장 복잡한 기능이었습니다.

<div class="mermaid">
graph LR
    A["사용자 입력"] --> B["WebSocket\n연결"]
    B --> C["AI 서버"]
    C --> D["토큰 단위\n스트리밍"]
    D --> E["실시간\nUI 업데이트"]
    E --> F["Supabase\n히스토리 저장"]

    B -.-> G["연결 끊김"]
    G -.-> H["자동 재연결\n(지수 백오프)"]
    H -.-> B

    style A fill:#3b82f6,stroke:#2563eb,color:#fff
    style F fill:#10b981,stroke:#059669,color:#fff
    style G fill:#ef4444,stroke:#dc2626,color:#fff
</div>

핵심 설계 포인트:
- **토큰 단위 스트리밍**: 응답이 한글자씩 실시간으로 표시되어 사용자 경험 향상
- **자동 재연결**: 네트워크 불안정 시 지수 백오프로 자동 복구
- **이중 저장**: Supabase(영구)와 로컬 캐시(오프라인 대응)에 동시 저장

### 퀴즈 시스템

300+문제 풀, 카테고리별 필터링, 난이도 조절, 랭킹 시스템까지 갖춘 게이미피케이션 요소입니다. Supabase에서 문제를 가져오고 점수를 실시간으로 집계합니다.

### 4개국어 지원

처음부터 국제화를 고려했습니다. Flutter의 ARB 파일 기반 i18n을 사용하여 **한국어, 영어, 일본어, 중국어**를 지원합니다. 언어 변경 시 서버에도 동기화하여 WebView 내 콘텐츠도 함께 전환됩니다.

---

## 개발 과정: 337커밋의 5단계 진화

이 프로젝트는 한 번에 완성된 것이 아니라 **5단계에 걸쳐 점진적으로 진화**했습니다.

<div class="chart-container" style="max-width: 650px; margin: 0 auto;">
<canvas id="commitChart"></canvas>
</div>

<script type="text/javascript">
setTimeout(function() {
  if (typeof Chart === 'undefined') return;
  var ctx = document.getElementById('commitChart');
  if (!ctx || ctx.getAttribute('data-rendered')) return;
  ctx.setAttribute('data-rendered', 'true');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Phase 1\n기반 구축', 'Phase 2\n핵심 기능', 'Phase 3\n고도화', 'Phase 4\n최적화', 'Phase 5\n확장'],
      datasets: [{
        label: '누적 커밋 수',
        data: [20, 60, 100, 140, 337],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59,130,246,0.1)',
        fill: true,
        tension: 0.3,
        pointRadius: 6,
        pointBackgroundColor: '#3b82f6'
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: { display: true, text: '개발 단계별 누적 커밋 수', font: { size: 15 } },
        legend: { display: false }
      },
      scales: {
        y: { beginAtZero: true, title: { display: true, text: '커밋 수' } }
      }
    }
  });
}, 300);
</script>

### Phase 1: 기반 구축 (커밋 1\~20)

Flutter 프로젝트 초기화, WebView 통합, 기본 인증, Supabase 연결. 이 단계에서 레이어 구조를 확립했습니다.

### Phase 2: 핵심 기능 (커밋 21\~60)

WebSocket 채팅, 피드백 시스템, 퀴즈를 구현했습니다. 이 시기에 **main.dart가 826줄에서 54줄로 리팩터링**되는 대규모 구조 개선이 있었습니다. 바이브코딩의 힘으로 안전하게 대규모 리팩터링을 수행할 수 있었습니다.

### Phase 3: 고도화 (커밋 61\~100)

i18n/l10n 지원, 가이드 검색, 온보딩 시스템을 추가했습니다. 데이터 검증 로직도 강화했습니다.

### Phase 4: 최적화 (커밋 101\~140)

기능 다듬기, 자동 출석, 테스트 확장, 문서화에 집중했습니다. 이 단계에서 141개 유닛 테스트를 작성하여 안정성을 확보했습니다.

### Phase 5: 확장 (커밋 141\~337)

생성형 AI 기능, 그룹 채팅, 코칭, 라이브 이벤트 등 고급 기능을 추가했습니다. 이 단계에서 코드량이 크게 증가했지만, 모듈 구조 덕분에 복잡도를 관리할 수 있었습니다.

<div class="info-box green">
<strong>대규모 리팩터링이 가능했던 이유</strong><br/>
바이브코딩에서 AI는 "코드를 생성"할 뿐 아니라 "코드를 이해"합니다. main.dart 826줄 → 54줄 리팩터링은 수동으로 했다면 반나절이 걸렸을 작업이지만, AI와 함께하면 30분 안에 안전하게 완료할 수 있었습니다. 핵심은 <strong>테스트가 있었기 때문</strong>입니다.
</div>

---

## 바이브코딩 실전 팁

337커밋 동안 AI와 협업하면서 배운 실전 노하우입니다.

### 1. CLAUDE.md는 프로젝트의 "두뇌"

이 프로젝트의 CLAUDE.md는 **50KB**에 달합니다. 프로젝트 구조, 아키텍처 원칙, 코딩 컨벤션, 주의사항을 상세히 기록했습니다. AI가 이 파일을 읽고 프로젝트의 맥락을 이해하기 때문에, **매번 같은 설명을 반복할 필요가 없었습니다.**

### 2. "기능 단위"로 대화하라

"로그인 기능을 만들어줘"처럼 큰 단위로 요청하면 AI가 전체 구조를 이해하고 일관된 코드를 생성합니다. 반면 "이 줄을 수정해줘"처럼 작은 단위로 요청하면 맥락을 잃기 쉽습니다.

### 3. 테스트는 "안전망"이자 "소통 도구"

AI가 생성한 코드를 검증하는 가장 확실한 방법은 테스트입니다. 141개 테스트가 100% 통과하면, 리팩터링이든 기능 추가든 자신 있게 진행할 수 있습니다.

### 4. 필요 없는 기능은 과감히 제거

바이브코딩의 함정은 **기능을 너무 쉽게 추가할 수 있다는 것**입니다. PoC 중반에 불필요한 기능을 과감히 제거하는 결단이 필요했습니다. AI와 함께라면 제거도 빠르지만, 제거 판단은 사람이 해야 합니다.

<div class="info-box red">
<strong>바이브코딩의 함정</strong><br/>
AI가 코드를 빠르게 생성해주므로 "이것도 넣고 저것도 넣자"는 유혹이 큽니다. 하지만 PoC의 본질은 <strong>핵심 가설 검증</strong>입니다. 기능이 많아질수록 검증해야 할 범위도 넓어집니다. "만들 수 있느냐"가 아니라 "만들어야 하느냐"를 먼저 판단하세요.
</div>

---

## 수치로 보는 결과

<div class="chart-container" style="max-width: 550px; margin: 0 auto;">
<canvas id="statsChart"></canvas>
</div>

<script type="text/javascript">
setTimeout(function() {
  if (typeof Chart === 'undefined') return;
  var ctx = document.getElementById('statsChart');
  if (!ctx || ctx.getAttribute('data-rendered')) return;
  ctx.setAttribute('data-rendered', 'true');
  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['코드량', '기능 수', '테스트', '플랫폼', '언어 지원', '문서화'],
      datasets: [{
        label: '달성도 (상대값)',
        data: [85, 90, 70, 100, 80, 95],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59,130,246,0.2)',
        pointBackgroundColor: '#3b82f6'
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: { display: true, text: '프로젝트 완성도 (상대 평가)', font: { size: 15 } },
        legend: { display: false }
      },
      scales: {
        r: { beginAtZero: true, max: 100 }
      }
    }
  });
}, 400);
</script>

| 지표 | 수치 |
|------|------|
| 총 커밋 수 | 337 |
| 프로덕션 코드 | 19,484줄 (294 파일) |
| 유닛 테스트 | 141개 (100% 통과) |
| 주요 기능 모듈 | 10개 |
| 지원 플랫폼 | 6개 (Android, iOS, Web, Windows, macOS, Linux) |
| 지원 언어 | 4개 (한국어, 영어, 일본어, 중국어) |
| 프로덕션 의존성 | 22개 |
| 문서 파일 | 50+ |
| 개발자 | **1명** |

---

## 마치며

이 프로젝트를 통해 확인한 **핵심 교훈 세 가지**:

1. **바이브코딩은 "만능"이 아니라 "증폭기"입니다.** AI는 개발 속도를 10배 높여주지만, 아키텍처 설계와 기술 판단은 여전히 사람의 몫입니다. CLAUDE.md에 원칙을 명확히 적어두면 AI가 그 원칙을 따릅니다.

2. **PoC라도 구조를 갖추면 나중이 편합니다.** 처음부터 레이어를 분리하고, 모듈을 독립시키고, 테스트를 작성한 덕분에 Phase 5에서 기능을 대량 추가할 때도 기존 코드가 망가지지 않았습니다.

3. **1인 개발의 한계를 AI가 메워줍니다.** Flutter를 처음 접한 상태에서 시작했지만, AI의 도움으로 Riverpod, Freezed, GoRouter 등의 고급 패턴을 빠르게 적용할 수 있었습니다. 중요한 것은 "모든 것을 아는 것"이 아니라 "무엇을 만들어야 하는지 아는 것"입니다.

바이브코딩은 이제 막 시작된 개발 패러다임입니다. 이 글이 "혼자서는 무리"라고 생각했던 프로젝트에 도전하는 계기가 되길 바랍니다.
