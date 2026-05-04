---
title: "AI Native 개발자와 하네스 엔지니어링: 파도를 타는 두 가지 기술"
slug: ai-native-developer
description: "실밸 개발자 채널의 두 영상(AI Native, 하네스 엔지니어링)을 정리했습니다. AI를 쓰는 것과 AI Native가 되는 것의 차이부터, Claude Code 위에 커스텀 하네스를 한 층 더 쌓아 올리는 실전 프레임워크까지 다룹니다."
tags:
  - AI
  - AINative
  - HarnessEngineering
  - ClaudeCode
  - AgenticEngineering
  - 생산성
category: AI
published: true
---

## 들어가며

이 글은 유튜브 **실밸 개발자** 채널의 두 영상을 한 흐름으로 묶어 정리한 글입니다. 첫 번째 영상은 **"AI Native가 무엇인가"**라는 개념을 다루고, 두 번째 영상은 그 개념을 **"하네스 엔지니어링"**이라는 구체적 실천으로 풀어냅니다. 한 묶음으로 읽으면 "왜"와 "어떻게"가 한 줄로 이어집니다.

<div class="info-box blue">
<strong>원본 출처</strong><br/>
채널: <strong>실밸 개발자</strong><br/>
영상 1 (개념): <a href="https://youtu.be/vUkUqChwoHU?si=HCxT08ErPbCf9cx1" target="_blank">AI Native가 되는 법</a><br/>
영상 2 (실전): <a href="https://youtu.be/AQOvNx87Urs?si=iJS3SA_Fc9qnkWFs" target="_blank">하네스 엔지니어링 — 직접 세팅하기</a><br/>
이 글의 모든 인사이트와 수치는 위 두 영상에서 출발했으며, 강의 홍보 부분은 제외하고 메시지에 초점을 맞춰 재구성했습니다.
</div>

영상 1이 던지는 한 가지 질문으로 시작합니다.

> "지금 이 AI 시대에, 나는 파도를 타고 있는가? 아니면 파도에 휩쓸려 가고 있는가?"

---

# Part 1. AI Native란 무엇인가 (영상 1 정리)

## AI를 "쓰는 것"과 "AI Native"는 다르다

영상에서 던지는 첫 질문은 단순합니다.

- "AI를 자기 돈 내고 쓰는 사람이 한국에 몇 %나 있을까?"
- "그렇다면 AI를 쓰는 모든 사람이 AI Native일까?"

답은 "아니다"입니다. **AI를 쓴다는 것**과 **AI Native가 된다는 것**은 완전히 다른 차원의 문제입니다.

### "Native"라는 단어의 무게

한국어 네이티브를 떠올려 보면 직관적입니다. 한국에서 태어나 한국어로 생각하고, 한국어로 농담하고, 한국어로 꿈꾸는 사람. 누가 가르쳐서 잘하는 게 아니라 **의식하지 않아도 한국어가 먼저 나오는 상태**입니다.

AI Native도 마찬가지입니다.

<div class="info-box green">
<strong>AI Native의 정의 (영상 기준)</strong><br/>
AI를 "필요할 때 꺼내 쓰는 도구"가 아니라, <strong>AI로 일하고, AI로 생각하고, AI로 만드는 것이 자연스러운 사람.</strong><br/>
새 일이 생기면 의식하지 않아도 손이 먼저 AI 쪽으로 가는 상태.
</div>

조금 더 직관적으로 말하면 — **AI를 도구가 아니라 동료로 대하는 사람**입니다. 도구는 필요할 때만 꺼내 쓰고 끝나면 서랍에 넣지만, 동료는 옆에 계속 있고 새 일이 떨어지면 같이 시작하고 막히면 같이 풉니다.

---

## AI-Enhanced vs AI-Native

영상에서는 AI를 활용하는 사람을 크게 두 그룹으로 나눕니다.

<div class="mermaid">
graph LR
    A["새로운 작업"] --> B{"내 워크플로의<br/>디폴트는?"}
    B -->|"기존 방식 위에<br/>AI를 추가"| C["AI-Enhanced<br/>(기존 방식 + AI 보조)"]
    B -->|"AI를 전제로<br/>처음부터 설계"| D["AI-Native<br/>(AI가 디폴트)"]
    C --> E["막힐 때 질문<br/>유용하지만 워크플로 동일"]
    D --> F["먼저 AI에 던짐<br/>안 되면 5번 10번 다른 방식<br/>잘된 건 저장해 재사용"]

    style C fill:#f59e0b,stroke:#d97706,color:#fff
    style D fill:#10b981,stroke:#059669,color:#fff
</div>

| 구분 | AI-Enhanced | AI-Native |
|------|-------------|-----------|
| 워크플로 | 기존 방식 + AI 추가 | 처음부터 AI 전제로 설계 |
| 디폴트 | 사람이 먼저, 막히면 AI | AI에 먼저 던지고 같이 풂 |
| 재사용 | 매번 처음부터 | 잘된 패턴은 저장해 다음에도 활용 |
| 도구 관점 | 도구 | 동료 |

영상에서 누군가는 "AI Native 직원은 일반 직원보다 10배 생산적"이라고 표현했다고 합니다. 과장처럼 들리지만, 이 숫자가 그렇게 비현실적이지 않을 수 있다는 게 핵심입니다.

---

## AI Native가 안 되면 어떻게 되는가

영상은 "AI를 안 쓰는 사람은 거의 없다"는 사실에서 출발합니다. ChatGPT 주간 활성 사용자는 2025년 후반 기준 **8억 명**을 넘겼고, 마이크로소프트 트렌드 리포트에 따르면 전 세계 지식 노동자의 **75%**가 이미 업무에서 AI를 쓰고 있다고 답했습니다.

<div class="info-box yellow">
<strong>핵심</strong><br/>
이제 격차는 "AI를 쓰느냐 안 쓰느냐"에서 벌어지지 않습니다.<br/>
<strong>"AI를 어떻게 쓰느냐, AI Native하게 쓰느냐"</strong>에서 벌어지고, 매일 누적됩니다.
</div>

### 개인 단위의 격차

<div class="chart-container" style="max-width: 640px; margin: 0 auto;">
<canvas id="aiNativeProductivityChart"></canvas>
</div>

<script type="text/javascript">
setTimeout(function() {
  if (typeof Chart === 'undefined') return;
  var ctx = document.getElementById('aiNativeProductivityChart');
  if (!ctx || ctx.getAttribute('data-rendered')) return;
  ctx.setAttribute('data-rendered', 'true');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['작업 속도\n(GitHub Copilot 연구)', '같은 시간 내 작업량\n(BCG 연구)', '결과물 품질 점수\n(BCG 연구)'],
      datasets: [{
        label: 'AI 적극 활용 그룹의 우위 (%)',
        data: [55, 12, 40],
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b'],
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: { display: true, text: 'AI를 적극 활용한 그룹의 성과 격차', font: { size: 15 } },
        legend: { position: 'bottom' }
      },
      scales: { y: { beginAtZero: true, title: { display: true, text: '% 우위' } } }
    }
  });
}, 300);
</script>

- **GitHub Copilot 연구**: AI를 적극 활용한 개발자가 그렇지 않은 개발자보다 작업을 평균 **55% 더 빨리** 완료
- **BCG 컨설팅 연구**: GPT를 잘 활용한 컨설턴트 그룹이 같은 시간에 **12% 더 많은 작업**을 처리하고, 결과물 품질 점수가 **40% 더 높음**

같은 회사, 같은 직급, 같은 월급에서 산출물의 양과 질이 완전히 달라진다는 이야기입니다. 1년이면 수백 시간의 차이, 몇 년이면 메우기 어려운 격차가 됩니다.

### 채용 시장의 변화

작년만 해도 "AI를 잘 다루면 우대"였던 채용 공고가, 올해는 **기본 자격**으로 옮겨가고 있습니다. LinkedIn에 따르면 AI 관련 스킬을 요구하는 채용 공고가 1년 사이 **두 배 이상** 늘었습니다.

| 예전 질문 | 지금 질문 |
|----------|----------|
| "AI 써 보셨나요?" | "어떤 AI 도구를 쓰시나요?" |
| (전제가 아님) | "어떤 워크플로를 만들었나요?" |
| | "어떤 결과물·임팩트를 내셨나요?" |

답을 못 하면 다음 질문으로 넘어가지도 않는다는 게 영상의 표현입니다.

### 회사 단위의 의사결정 패턴

<div class="mermaid">
graph TD
    A["고객이 새 기능을 요청"] --> B{"회사의 디폴트는?"}
    B -->|"AI-Enhanced 회사"| C["백로그에 추가"]
    C --> D["몇 주 뒤 스프린트 편성"]
    D --> E["6주 뒤 출시"]
    B -->|"AI-Native 회사"| F["AI로 지금 풀 수 있을까?"]
    F --> G["같은 날 답변 가능"]
    G --> H["6시간 뒤 출시"]

    style E fill:#ef4444,stroke:#dc2626,color:#fff
    style H fill:#10b981,stroke:#059669,color:#fff
</div>

같은 시장인데 한 회사는 6주, 다른 회사는 6시간이 걸린다면 — 1년이 누적될 때 시장 점유율이 어떻게 될지는 굳이 보지 않아도 뻔합니다.

---

## 그럼 어떻게 AI Native가 되는가 — 두 가지 핵심 역량

영상의 후반부는 개발자 관점에서 AI Native가 되는 길을 두 가지로 정리합니다.

<div class="mermaid">
graph TB
    A["AI Native 개발자의<br/>두 가지 핵심 역량"] --> B["1. 컨텍스트 관리<br/>& 토큰 효율"]
    A --> C["2. 하네스(Harness) 설계<br/>= 가드레일 + 자동 검증"]

    B --> B1["프로젝트 컨텍스트를<br/>한 번에 잘 정리"]
    B --> B2["반복되는 워크플로는<br/>스킬·에이전트로 분리"]
    B --> B3["같은 작업에 토큰 절반,<br/>품질은 두 배"]

    C --> C1["테스트를 먼저 만들고 시작"]
    C --> C2["lint·type check 자동화"]
    C --> C3["위험한 명령은 권한 차단"]
    C --> C4["작은 단위 PR + AI 리뷰"]

    style A fill:#3b82f6,stroke:#2563eb,color:#fff
    style B fill:#10b981,stroke:#059669,color:#fff
    style C fill:#f59e0b,stroke:#d97706,color:#fff
</div>

영상의 비유가 인상적입니다.

> "하네스(Harness)는 AI라는 거대한 말이, 우리가 원하는 방향으로 달리게 만들어 주는 마구(馬具)다."

<div class="info-box blue">
<strong>새로운 개발자 역량 (영상 1 요약)</strong><br/>
"이제 개발자의 역량은 코드를 얼마나 잘 짜느냐에서 나오지 않는다.<br/>
<strong>내가 운영하는 AI 에이전트를 얼마나 잘 이해했는지,<br/>
내 하네스를 얼마나 정교하게 설계했는지</strong>에서 갈리기 시작한다."
</div>

여기까지가 영상 1의 메시지입니다. 그런데 자연스레 다음 질문이 따라옵니다.

> "그래서 그 '하네스'라는 거, 도대체 어떻게 만드는 건데?"

영상 2가 정확히 그 질문에 답합니다.

---

# Part 2. 하네스 엔지니어링, 직접 세팅하기 (영상 2 정리)

## 결론부터: 우리는 이미 하네스를 쓰고 있다

영상 2의 첫 메시지가 의외입니다.

<div class="info-box green">
<strong>핵심 명제</strong><br/>
<strong>Claude Code, Codex, Cursor 같은 AI 코딩 도구 자체가 이미 하네스다.</strong><br/>
하네스 엔지니어링은 "내가 처음부터 만드는 무언가"가 아니라, 이미 깔린 하네스 위에 <strong>한 층 더 쌓아 올리는</strong> 작업이다.
</div>

최근 Claude Code 내부 코드가 유출됐을 때 사람들이 들여다본 시스템 프롬프트에는 이미 강력한 가드레일이 박혀 있었습니다.

- **메인 브랜치에 force push 절대 금지**
- 자동화 불가능한 위험 명령 차단
- **항상 새 커밋을 생성해 히스토리 보존** (`--amend` 우회 방지)
- 위험한 git 명령은 시스템 차원에서 막아 놓음

영상 1에서 말한 하네스의 네 기둥 — **컨텍스트 파일, 게이팅, 도구 경계, 피드백 루프** — 이 이미 Claude Code 안에 모두 내장되어 있다는 뜻입니다.

<div class="mermaid">
graph TB
    A["AI 코딩 도구의 내장 하네스<br/>(Claude Code / Codex 등)"] --> B["범용 가드레일<br/>force push 차단, 권한 게이팅 등"]
    A --> C["기본 피드백 루프<br/>도구 호출 → 결과 확인"]

    D["내 프로젝트만의 컨텍스트<br/>(아키텍처, 컨벤션, DB 스키마 등)"] --> E["커스텀 하네스 (2층)"]

    B --> F["부족한 점:<br/>모두를 위해 만들어<br/>'범용적'이라는 한계"]
    C --> F
    F --> E
    E --> G["도메인 스페시픽한<br/>가드레일 + 컨텍스트"]

    style A fill:#3b82f6,stroke:#2563eb,color:#fff
    style E fill:#10b981,stroke:#059669,color:#fff
    style G fill:#f59e0b,stroke:#d97706,color:#fff
</div>

내장 하네스의 한계는 **범용**이라는 것입니다. 내 프로젝트에서 "API 호출은 반드시 이 wrapper를 거쳐라", "이 외부 라이브러리는 쓰지 마라", "DB 스키마는 이미 확정됐으니 절대 건드리지 마라" 같은 규칙은 모릅니다. **이런 도메인 스페시픽한 규칙·아키텍처 결정·기술 선택의 이유 — 이걸 AI에게 알려주는 것이 곧 2층 하네스를 쌓는 일**입니다.

---

## 두 가지 길: 오픈소스 하네스 vs 커스텀 하네스

2층을 쌓는 방법은 크게 두 가지입니다.

| 구분 | 오픈소스 하네스 | 커스텀 하네스 |
|------|----------------|----------------|
| 예시 | `oh-my-claudecode` 등 | 직접 만든 `docs/`, `CLAUDE.md`, hooks |
| 장점 | 잘 짜인 에이전트·파이프라인·스킬 즉시 활용 | 내 프로젝트에 정확히 맞는 가벼운 세팅 |
| 단점 | 내 프로젝트 컨텍스트는 비어 있음 | 처음부터 내가 채워야 함 |
| 추천 시점 | 프로젝트 커지고 워크플로 다양해질 때 | 처음 시작할 때 |

### 오픈소스 사례: oh-my-claudecode

영상에서 소개한 [`oh-my-claudecode`](https://github.com/) (한국인이 만든 오픈소스, GitHub 스타 27,000개+)는 Claude Code를 **AI 에이전트 팀처럼 운영**하는 시스템 하네스입니다.

- **19개의 전문 에이전트**: analyst, architect, code-reviewer, exploration, getter 등 역할별 분리
- **자동 파이프라인**: `plan → execute → verify → fix` 루프를 시스템이 알아서 진행
- **37개+ 스킬**: 자주 쓰는 작업 패턴을 스킬로 저장해 한 번에 실행

회사에서 팀원들이 역할을 나눠 일하듯, AI도 분야별로 전문화시키면 **자기 분야에 집중하니까 품질이 올라간다**는 발상입니다.

다만 한 가지 — 처음부터 풀 세팅으로 갈 필요는 없습니다. **프로젝트가 커지면서 하나씩 붙여 나가는** 방식이 더 현실적입니다.

---

## 커스텀 하네스 프레임워크 — 4가지 기둥

영상에서 직접 만든 가벼운 프레임워크는 네 부분으로 구성됩니다.

<div class="mermaid">
graph TB
    A["커스텀 하네스 프레임워크"] --> B["1. docs/<br/>프로젝트의 뇌"]
    A --> C["2. CLAUDE.md<br/>프로젝트 헌법"]
    A --> D["3. 실행 엔진<br/>/harness + execute.py"]
    A --> E["4. Hooks<br/>자동 검증 게이트"]

    B --> B1["PRD: 무엇을 만드는가"]
    B --> B2["Architecture: 어떻게 만드는가"]
    B --> B3["ADR: 왜 이렇게 결정했는가"]
    B --> B4["UI Guide (선택)"]

    C --> C1["기술 스택, 컨벤션"]
    C --> C2["크리티컬 규칙<br/>(우선순위 신호 부여)"]

    D --> D1["docs 전부 읽고 의도 파악"]
    D --> D2["페이즈 단위로 작업 분할"]
    D --> D3["claude -p 헤드리스 모드로<br/>페이즈별 컨텍스트 분리"]
    D --> D4["JSON 상태 파일로 진행 관리"]

    E --> E1["TDD 강제 (테스트 없이 구현 차단)"]
    E --> E2["위험 명령 차단 (rm -rf, force push)"]
    E --> E3["서킷 브레이커<br/>(같은 에러 N회 시 중단)"]

    style A fill:#3b82f6,stroke:#2563eb,color:#fff
    style B fill:#10b981,stroke:#059669,color:#fff
    style C fill:#f59e0b,stroke:#d97706,color:#fff
    style D fill:#8b5cf6,stroke:#7c3aed,color:#fff
    style E fill:#ef4444,stroke:#dc2626,color:#fff
</div>

### 1. docs/ — 프로젝트의 뇌

여기에 프로젝트의 **모든 컨텍스트**가 들어갑니다.

| 문서 | 역할 | 핵심 포함 사항 |
|------|------|----------------|
| **PRD** | 무엇을 만드는가 | 목표, 핵심 기능, **MVP 제외 사항** |
| **Architecture** | 어떻게 만드는가 | 디렉토리 구조, 패턴, 데이터 흐름 |
| **ADR** | 왜 이렇게 결정했는가 | 결정, 이유, 트레이드오프 |
| **UI Guide** | 디자인 가이드 | (선택) |

<div class="info-box yellow">
<strong>실전 팁: MVP 제외 사항을 꼭 넣어라</strong><br/>
"이건 만들지 말 것"을 명시하지 않으면 AI는 가능한 모든 걸 다 만들려고 한다. MVP의 가벼움은 <strong>제외 사항으로 지킨다.</strong>
</div>

### 2. CLAUDE.md — 프로젝트 헌법

<div class="info-box blue">
<strong>크리티컬 규칙은 신호로 표시</strong><br/>
"<strong>CRITICAL — 반드시 읽을 것</strong>" 같은 우선순위 마커를 붙이면 AI가 이를 더 강하게 인식한다.
</div>

예시 규칙:
- "Anthropic SDK 사용 금지" (외부 라이브러리 제한)
- "API는 반드시 이 wrapper로 호출"
- "UI에는 AI slop 패턴 금지"

### 3. 실행 엔진 — `/harness` 커맨드 + 파이프라인 스크립트

`/harness` 슬래시 커맨드 하나로 다음이 자동화됩니다.

<div class="mermaid">
graph LR
    A["사용자: /harness"] --> B["docs/ 전체 읽기"]
    B --> C["의도 파악 + 필요시 질문"]
    C --> D["페이즈 단위로 작업 분할<br/>(5~10개)"]
    D --> E["페이즈 파일 생성"]
    E --> F["execute.py 실행"]
    F --> G["페이즈 1<br/>claude -p"]
    F --> H["페이즈 2<br/>claude -p"]
    F --> I["페이즈 N<br/>claude -p"]
    G --> J["JSON 상태 기록"]
    H --> J
    I --> J
    J --> K["완료 / 실패 시 재개"]

    style A fill:#3b82f6,stroke:#2563eb,color:#fff
    style F fill:#8b5cf6,stroke:#7c3aed,color:#fff
    style K fill:#10b981,stroke:#059669,color:#fff
</div>

여기서 핵심 두 가지 개념이 등장합니다.

#### `claude -p` 헤드리스 모드 — 페이즈별 컨텍스트 분리

```
하나의 세션에서 모든 페이즈 돌리기 (X)
→ 컨텍스트가 누적되어 후반 페이즈 품질 저하

페이즈마다 claude -p 새 세션 (O)
→ 컨텍스트 분리, 일정한 품질 유지
→ 단점: 기억이 없으니 상태 관리 필수
```

#### JSON 상태 파일 — AI가 자기 진행을 읽을 수 있게

페이즈마다 결과·에러를 JSON으로 기록합니다. AI는 사람보다 JSON을 더 잘 읽고, 다음 세션이 이전 상태를 정확히 이어받을 수 있습니다.

### 4. Hooks — 자동 검증 게이트

| 훅 | 역할 |
|----|------|
| **TDD 강제** | 테스트 없이 구현 시도 시 차단, 테스트부터 작성하게 유도 |
| **위험 명령 차단** | `rm -rf`, `git push --force`, `git reset --hard` 등 권한 자체를 막음 |
| **서킷 브레이커** | 같은 에러가 N회 반복되면 루프 중단 — 무한 루프 토큰 폭주 방지 |

<div class="info-box red">
<strong>서킷 브레이커가 왜 필수인가</strong><br/>
파이프라인 루프를 돌릴 때 AI가 "됐나? 안 됐나?"를 무한 반복하며 토큰만 소비하는 사태가 가능하다. <strong>같은 에러 5회 = 강제 중단</strong> 같은 회로 차단기를 반드시 걸어둔다.
</div>

---

## 실전 데모 — FeedbackPulse 만들기

영상에서는 이 프레임워크로 **유튜브 댓글 분석 앱(FeedbackPulse)**을 만드는 과정을 보여줍니다. 핵심 워크플로만 정리하면 다음과 같습니다.

<div class="mermaid">
graph TB
    A["1. 뼈대 클론<br/>(빈 docs + 하네스 프레임워크)"] --> B["2. 한 줄 요청<br/>'유튜브 댓글 분석 앱 기획해줘'"]
    B --> C["3. AI가 docs/ 를 자동으로 채움<br/>(PRD, Architecture, ADR)"]
    C --> D["4. 갈구기 1차<br/>'더 인리치하게, 디테일 다 채워'"]
    D --> E["5. 갈구기 2차<br/>'UX 관점에서 다시 봐'"]
    E --> F["6. 병렬: 다른 세션에<br/>하네스 자체 개선도 맡김"]
    F --> G["7. /harness 한 번 실행<br/>→ 페이즈별 자동 실행"]
    G --> H["8. 완성된 웹앱"]
    H --> I["9. 실행 결과 리뷰<br/>→ 개선점은 다시 하네스에 반영"]

    style A fill:#94a3b8,stroke:#64748b,color:#fff
    style C fill:#3b82f6,stroke:#2563eb,color:#fff
    style G fill:#8b5cf6,stroke:#7c3aed,color:#fff
    style H fill:#10b981,stroke:#059669,color:#fff
    style I fill:#f59e0b,stroke:#d97706,color:#fff
</div>

여기서 가장 강조되는 메시지가 두 가지 있습니다.

---

## 메시지 1: 기획 단계가 결정한다 — Spec-Driven Development

<div class="info-box yellow">
<strong>"docs와 CLAUDE.md의 디테일이 부족하면, 파이프라인을 돌려도 딱 그만큼만 결과가 나온다."</strong><br/>
에러 핸들링이 빠져 있으면 빠진 채로, 디자인이 모호하면 모호한 채로 나온다. <strong>기획 단계에 20\~30분을 쏟는 것이 결과 품질의 90%를 결정한다.</strong>
</div>

### 한 번에 만족하지 마라 — 5\~6번은 갈궈야 한다

영상의 인상적인 표현:

> "AI는 많이 갈궈 줘야 좋은 계획을 더 많이 준다.<br/>
> 처음에는 '이 정도면 충분할 것 같다'고 했다가, '이건 어때? 저건 어때? 한 번 더 생각해 봐' 하면 더 좋은 계획을 준다.<br/>
> 한 5\~6번은 갈궈야 된다."

### 관점을 바꿔서 보강하라

같은 문서도 관점을 바꿔서 다시 검토하게 시키면 매번 빠진 점이 새로 나옵니다.

| 관점 | 발견되는 빠진 점 |
|------|------------------|
| 일반 검토 | 기본 요구사항, 기능 누락 |
| **UX 관점** | 사용자 흐름의 단절, 에러 메시지 부재 |
| **에러 핸들링 관점** | 엣지 케이스, 타임아웃, 재시도 |
| **배포 관점** | 환경 변수, 비밀 관리, 모니터링 |
| **운영 관점** | 로그, 알람, 배포 후 검증 |

### 다음 단계 — Spec-Driven Development의 심화

스펙을 마크다운이 아니라 **JSON 구조**로 작성하면 AI가 더 잘 읽고, 상태 관리가 자동화됩니다. 이걸 극단까지 밀고 가면 사람이 개입하지 않아도 밤새 돌아가는 **Ralph 루프**(밤새 돌리는 자동화 루프)가 됩니다.

---

## 메시지 2: AI 시대, 더 중요해지는 것은 "취향"

영상의 마지막 통찰이 가장 묵직합니다.

<div class="info-box blue">
<strong>"하네스 프레임워크 자체는 누구나 똑같이 쓴다.<br/>
결과물의 품질을 결정하는 건, 우리가 거기에 채워 넣는 PRD·아키텍처·ADR의 품질이다.<br/>
그건 결국 <strong>우리 머릿속에 있는 '취향'</strong>에서 나온다."</strong>
</div>

### 패러다임의 전환

<div class="mermaid">
graph LR
    A["과거 개발자의 일"] --> A1["코드 한 줄 한 줄<br/>직접 작성"]
    A1 --> A2["코드 품질이<br/>개발자 역량"]

    B["AI Native 개발자의 일"] --> B1["AI에게 주는 맥락의<br/>품질을 최대로 끌어올림"]
    B1 --> B2["가드레일을 정교하게 깔고"]
    B2 --> B3["'출발' 명령 한 번"]
    B3 --> B4["취향과 설계가<br/>개발자 역량"]

    style A fill:#94a3b8,stroke:#64748b,color:#fff
    style B fill:#10b981,stroke:#059669,color:#fff
</div>

> "코드를 매번 손으로 고치는 게 아니라, AI에게 주는 맥락의 품질을 최대로 올린 다음 가드레일을 깔고 — 그냥 출발하면 끝까지 갈 수 있도록 만드는 것. 그게 하네스 세팅의 본질이다."

---

# 정리하며 — 파도를 탈 결정은 우리에게 있다

두 영상의 메시지를 한 줄씩 묶으면 이렇게 됩니다.

| | 핵심 메시지 |
|---|---|
| **영상 1** | AI Native가 되어야 살아남는 시대다 — 그 결정권은 우리에게 있다 |
| **영상 2** | AI Native의 구체적 실천이 곧 하네스 엔지니어링이고, 누구나 오늘 시작할 수 있다 |

<div class="info-box yellow">
<strong>오늘의 가장 큰 기회이자 레버리지</strong><br/>
파도에 휩쓸려 떠내려갈지, 파도를 타는 사람이 될지, 파도 위에서 즐기는 사람이 될지 — <strong>그 결정권은 우리에게 있다.</strong>
</div>

### 이 글이 남기는 체크리스트

영상 둘을 정리하면서 제가 스스로에게 던진 질문들입니다.

#### AI Native 마인드셋 (영상 1)
- [ ] 새 일이 떨어졌을 때, 손이 먼저 AI로 가는가? 아니면 의식적으로 "AI 써 볼까?" 망설이는가?
- [ ] 같은 프로젝트 컨텍스트를 매번 처음부터 다시 설명하고 있지는 않은가?
- [ ] 자주 쓰는 워크플로가 **스킬·에이전트·프롬프트 템플릿**으로 정리되어 있는가?

#### 하네스 엔지니어링 실천 (영상 2)
- [ ] `CLAUDE.md`에 **CRITICAL 신호로 표시한 프로젝트 헌법**이 있는가?
- [ ] `docs/` 폴더에 **PRD / Architecture / ADR**이 모두 채워져 있는가? (특히 **MVP 제외 사항**)
- [ ] **TDD 강제 / 위험 명령 차단 / 서킷 브레이커** 훅이 깔려 있는가?
- [ ] 기획 단계에서 **5\~6번 갈구고 관점 바꿔 보강**하는 절차가 있는가?
- [ ] 페이즈를 `claude -p` 헤드리스로 분리해 **컨텍스트 누적을 막고** 있는가?

---

<div class="info-box blue">
<strong>다시 한 번 출처</strong><br/>
이 글의 두 원본 영상은 모두 <strong>유튜브 채널 "실밸 개발자"</strong>입니다.<br/>
영상 1: <a href="https://youtu.be/vUkUqChwoHU?si=HCxT08ErPbCf9cx1" target="_blank">AI Native가 되는 법</a><br/>
영상 2: <a href="https://youtu.be/AQOvNx87Urs?si=iJS3SA_Fc9qnkWFs" target="_blank">하네스 엔지니어링 — 직접 세팅하기</a><br/>
영상 후반의 강의 안내 부분은 이 글에서 제외했습니다. 톤과 뉘앙스, 그리고 실시간 데모는 영상으로 직접 보시는 것을 강력히 추천드립니다.
</div>
