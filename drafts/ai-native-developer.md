---
title: "AI Native 개발자와 하네스 엔지니어링: 파도를 타는 두 가지 기술"
slug: ai-native-developer
description: "실밸 개발자 채널의 두 영상을 출발점 삼아, AI Native라는 마인드셋과 하네스 엔지니어링이라는 실천을 한 흐름으로 풀어냅니다. Microsoft·BCG·Karpathy·Martin Fowler 등 1차 자료로 보강한 정리본."
tags:
  - AI
  - AINative
  - HarnessEngineering
  - ClaudeCode
  - AgenticEngineering
  - SpecDrivenDevelopment
  - 생산성
category: AI
published: true
---

## Prologue — 새벽 영상 한 편

새벽, 아내와 아기가 자고 있어 조용히 마이크를 켠 메타 엔지니어가 있습니다. 화면 너머의 그는 평소 갖고 있던 생각을 짧게 풀어놓겠다며 한 가지 질문을 던집니다.

> "지금 이 AI 시대에, 나는 파도를 타고 있는가? 아니면 파도에 휩쓸려 가고 있는가?"

이 질문이 던져진 영상이 첫 번째 출처입니다. 그리고 며칠 뒤 같은 채널에 올라온 두 번째 영상은, "그래서 그 파도를 어떻게 타느냐"에 대한 매우 구체적인 답입니다. 두 영상은 한 사람이 같은 책에 쓴 두 장(章)처럼 이어집니다. 첫 영상이 **"왜"**라면, 둘째 영상은 **"어떻게"**입니다.

<div class="info-box blue">
<strong>이 글의 두 출처</strong><br/>
채널: <strong>실밸 개발자</strong><br/>
영상 1 (개념): <a href="https://youtu.be/vUkUqChwoHU?si=HCxT08ErPbCf9cx1" target="_blank">AI Native가 되는 법</a><br/>
영상 2 (실전): <a href="https://youtu.be/AQOvNx87Urs?si=iJS3SA_Fc9qnkWFs" target="_blank">하네스 엔지니어링 — 직접 세팅하기</a><br/>
이 글은 두 영상의 메시지를 골자로, 영상에서 인용된 수치들의 1차 자료(Microsoft Research, BCG/Harvard, Andrej Karpathy 강연, Martin Fowler)와 외부 권위 자료를 보강해 다시 쓴 정리본입니다. 후반부 강의 안내는 제외하고 메시지에만 초점을 맞췄습니다.
</div>

---

# Part 1. AI Native — 능력이 아니라 디폴트가 된 시대

## 1.1 75%가 쓴다, 그러나 그것은 시작일 뿐이다

영상 1의 첫 질문은 단순합니다.

- "AI를 자기 돈 내고 쓰는 사람이 한국에 몇 %나 있을까?"
- "그렇다면 AI를 쓰는 모든 사람이 AI Native일까?"

답은 "아니다"입니다. **AI를 쓴다는 것**과 **AI Native가 된다는 것**은 완전히 다른 차원의 문제입니다.

수치로 먼저 풀어봅시다. Microsoft와 LinkedIn이 31개국 31,000명의 지식 노동자를 대상으로 진행한 [2024 Work Trend Index](https://blogs.microsoft.com/blog/2024/05/08/microsoft-and-linkedin-release-the-2024-work-trend-index-on-the-state-of-ai-at-work/)에 따르면, **글로벌 지식 노동자의 75%가 이미 업무에서 생성형 AI를 쓰고 있고 그 비율은 6개월 만에 2배 가까이 늘었습니다**. ChatGPT 한 곳만 봐도 [2025년 10월에 주간 활성 사용자 8억 명을 돌파](https://techcrunch.com/2025/10/06/sam-altman-says-chatgpt-has-hit-800m-weekly-active-users/)했고, 2026년 들어 9억 명에 가까워졌습니다.

<div class="info-box yellow">
<strong>핵심</strong><br/>
이제 격차는 "AI를 쓰느냐 안 쓰느냐"에서 벌어지지 않습니다.<br/>
<strong>"AI를 어떻게 쓰느냐 — 즉, AI Native하게 쓰느냐"</strong>에서 벌어지고, 매일 누적됩니다.
</div>

## 1.2 "Native"라는 단어의 무게

한국어 네이티브를 떠올려 보면 직관적입니다. 한국에서 태어나 한국어로 생각하고, 한국어로 농담하고, 한국어로 꿈꾸는 사람. 누가 가르쳐서 잘하는 게 아니라 **의식하지 않아도 한국어가 먼저 나오는 상태**입니다.

AI Native도 마찬가지입니다.

<div class="info-box green">
<strong>AI Native의 정의 (영상 1)</strong><br/>
AI를 "필요할 때 꺼내 쓰는 도구"가 아니라, <strong>AI로 일하고, AI로 생각하고, AI로 만드는 것이 자연스러운 사람.</strong><br/>
새 일이 생기면 의식하지 않아도 손이 먼저 AI 쪽으로 가는 상태.
</div>

조금 더 직관적으로 말하면 — **AI를 도구가 아니라 동료로 대하는 사람**입니다. 도구는 필요할 때 꺼내고 끝나면 서랍에 넣지만, 동료는 옆에 계속 있고 새 일이 떨어지면 같이 시작하고 막히면 같이 풉니다.

## 1.3 AI-Enhanced vs AI-Native

영상 1은 AI를 활용하는 사람을 두 그룹으로 나눕니다.

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

영상 1에서 누군가는 "AI Native 직원은 일반 직원보다 10배 생산적"이라고 표현했다고 합니다. 과장처럼 들리지만 — 그렇게까지 비현실적이지 않을 수 있다는 것이 영상의 주장이고, 뒤에 나올 실험 데이터가 그 주장을 일부 뒷받침합니다.

## 1.4 같은 시기에 Karpathy가 한 말 — Software 3.0

이 흐름은 한 명의 메타 엔지니어 혼자 던지는 메시지가 아닙니다. OpenAI 공동창업자였던 Andrej Karpathy는 2026년 봄 AI Ascent 강연 [**"From Vibe Coding to Agentic Engineering"**](https://www.youtube.com/watch?v=96jN2OCOfLs)에서 거의 같은 진단을 합니다 — 우리는 지금 **"Software 3.0"** 시대에 들어섰다고. 신경망이 곧 프로그래머블 컴퓨터가 되고, 프롬프트가 코딩을 대체하기 시작한 시대.

Karpathy의 표현을 빌리면, 영상 1의 메시지는 이렇게 다시 읽힙니다.

> "AI Native가 된다는 것은, 'Software 3.0' 환경의 모국어를 쓰는 사람이 된다는 뜻이다."

영상 1과 Karpathy의 강연이 향하는 곳은 같습니다. 다만 다음 질문이 남습니다 — **"AI Native가 안 되면, 정확히 무엇이 잘못되는가?"**

---

# Part 2. 격차는 매일 누적되고 있다

영상 1은 AI를 쓰는 75%와 AI Native 1%의 차이를 추상적으로만 말하지 않고, 세 층위의 데이터로 보여줍니다 — **개인, 채용 시장, 회사**.

## 2.1 개인 단위 — GitHub Copilot 연구의 진짜 디테일

영상 1이 인용한 "AI를 적극 활용한 개발자가 55% 더 빨랐다"는 수치는 GitHub와 Microsoft Research가 함께 진행한 [arXiv 논문 2302.06590](https://arxiv.org/abs/2302.06590)에서 나옵니다. 영상에서는 한 줄로 지나간 이 연구가 사실 꽤 흥미로운 디테일을 담고 있습니다.

<div class="info-box blue">
<strong>GitHub Copilot 통제 실험 (Microsoft Research)</strong><br/>
- 모집 개발자에게 JavaScript로 HTTP 서버를 구현하게 한 통제 실험<br/>
- Copilot 사용 그룹: <strong>평균 1시간 11분 완료</strong><br/>
- 미사용 그룹: <strong>평균 2시간 41분 완료</strong><br/>
- 시간 단축 효과 <strong>55.8%</strong> (P=0.0017, 95% CI [21%, 89%])<br/>
- <strong>경험이 적거나, 나이가 많거나, 하루 종일 코딩하는 사람일수록 효과가 더 크다</strong>
</div>

영상이 다루지 않은 부분이 더 흥미롭습니다 — **품질을 깎아 속도를 얻은 게 아니었다**는 점입니다. 개발자들은 보일러플레이트와 문법 검색에 쓰던 시간을 줄이고, 그 시간을 **비즈니스 문제와 아키텍처 결정**에 더 썼습니다.

## 2.2 작업 품질 — BCG/Harvard "Jagged Frontier" 연구

영상 1의 두 번째 인용은 BCG와 Harvard Business School이 758명의 컨설턴트를 대상으로 진행한 [Navigating the Jagged Technological Frontier](https://www.hbs.edu/faculty/Pages/item.aspx?num=64700) 실험입니다. 영상에서는 "12% 더 많은 작업, 40% 더 높은 품질" 두 숫자만 언급되지만, 원 논문은 그보다 훨씬 입체적입니다.

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
      labels: ['작업 속도\n(GitHub Copilot)', '같은 시간 내 작업량\n(BCG/HBS)', '결과물 품질 점수\n(BCG/HBS)', '속도 향상\n(BCG/HBS)'],
      datasets: [{
        label: 'AI 적극 활용 그룹의 우위 (%)',
        data: [55, 12, 40, 25],
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'],
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: { display: true, text: 'AI 적극 활용 그룹의 성과 격차 (1차 자료 기준)', font: { size: 15 } },
        legend: { position: 'bottom' }
      },
      scales: { y: { beginAtZero: true, title: { display: true, text: '% 우위' } } }
    }
  });
}, 300);
</script>

논문이 강조하는 더 중요한 메시지는 **"Jagged Frontier(들쭉날쭉한 프론티어)"**라는 개념입니다.

<div class="info-box red">
<strong>Jagged Frontier — 영상이 다루지 않은 경고</strong><br/>
같은 도구를 쓰더라도, AI가 잘하는 일과 못하는 일의 경계는 매우 들쭉날쭉하다.<br/>
<strong>프론티어 안쪽 작업</strong>: AI 사용 그룹이 12.2% 더 많이, 25.1% 더 빨리, 40% 더 높은 품질로 처리<br/>
<strong>프론티어 바깥 작업</strong>: AI를 쓴 컨설턴트가 안 쓴 컨설턴트보다 <strong>19% 더 자주 틀린 답</strong>을 냈다<br/>
즉, AI Native는 단순히 AI를 더 많이 쓰는 사람이 아니라, <strong>"AI에게 맡길 일과 맡기면 안 될 일"을 정확히 가르는 사람</strong>이다.
</div>

영상의 데이터와 합쳐 읽으면 이렇게 됩니다 — **AI를 잘 쓰는 사람은 빨라지고 좋아진다. 그러나 어디까지 맡길지 모르는 사람이 AI를 더 많이 쓰면 더 자주 틀린다.** 이 둘의 격차는 같은 회사, 같은 직급, 같은 월급에서 매일 벌어지고 있습니다.

## 2.3 채용 시장 — "AI 써 보셨나요"는 더 이상 면접 질문이 아니다

작년만 해도 "AI를 잘 다루면 우대"였던 채용 공고가, 올해는 **기본 자격**으로 옮겨가고 있습니다. [LinkedIn Economic Graph](https://economicgraph.linkedin.com/research/ai-skills-resources)의 분석에 따르면 미국 내 **AI 리터러시를 요구하는 채용 공고가 전년 대비 70% 증가**했고, AI 엔지니어 직군은 2년 연속으로 가장 빠르게 성장하는 직군입니다.

면접에서 묻는 질문도 그래서 달라졌습니다.

| 예전 질문 | 지금 질문 |
|----------|----------|
| "AI 써 보셨나요?" | "어떤 AI 도구를 쓰시나요?" |
| (전제가 아님) | "어떤 워크플로를 만들었나요?" |
| | "어떤 결과물·임팩트를 내셨나요?" |

답을 못 하면 다음 질문으로 넘어가지도 않는다는 것이 영상의 표현이고, LinkedIn 데이터는 그 진단을 뒷받침합니다.

## 2.4 회사 단위 — 6주 vs 6시간

가장 무서운 건 회사 단위입니다.

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

여기까지가 영상 1의 진단입니다. 자연스럽게 다음 질문이 따라옵니다.

> "그래서, 무엇을 해야 하는가?"

---

# Part 3. 다리 — Karpathy가 같은 시기에 한 말

흥미롭게도, 영상 1·2가 올라온 비슷한 시점에 Karpathy도 정확히 같은 질문에 답하는 강연을 했습니다. 그의 답을 한 줄로 옮기면 이렇습니다.

<div class="info-box yellow">
<strong>Andrej Karpathy, "From Vibe Coding to Agentic Engineering" (AI Ascent 2026)</strong><br/>
"<strong>People have to be in charge of this spec, this plan.</strong><br/>
Work with your agent to design a spec that is very detailed."<br/>
— 사람은 스펙과 계획에 대한 책임자여야 한다. 에이전트와 함께 매우 디테일한 스펙을 설계해라.
</div>

Karpathy는 같은 강연에서 한 가지 개념도 함께 던집니다 — **"Jagged Intelligence"**. LLM은 검증 가능한 영역(수학·코드·논리)에선 정점에 가깝지만, 열린 추론에서는 여전히 들쭉날쭉하다는 진단입니다. BCG/HBS 논문의 "Jagged Frontier"와 결을 같이하는 통찰입니다.

영상 2가 풀어내는 "하네스 엔지니어링"은 정확히 이 질문에 대한 한 사람의 구체적 답입니다 — **"디테일한 스펙과 가드레일을 어떻게 시스템으로 만들 것인가."**

---

# Part 4. 하네스 — AI라는 말에 채우는 마구

## 4.1 결론부터: 우리는 이미 하네스를 쓰고 있다

영상 2의 첫 메시지가 의외입니다.

<div class="info-box green">
<strong>핵심 명제</strong><br/>
<strong>Claude Code, Codex, Cursor 같은 AI 코딩 도구 자체가 이미 하네스다.</strong><br/>
하네스 엔지니어링은 "내가 처음부터 만드는 무언가"가 아니라, 이미 깔린 하네스 위에 <strong>한 층 더 쌓아 올리는</strong> 작업이다.
</div>

2026년 초 [Claude Code의 시스템 프롬프트가 부분적으로 유출](https://natesnewsletter.substack.com/p/surfing-the-guardrails-7-production)되면서 이 사실이 더 분명해졌습니다. 그 안에는 강력한 가드레일이 박혀 있었습니다.

- **메인 브랜치에 force push 절대 금지**
- 자동화 불가능한 위험 명령 차단
- **항상 새 커밋을 생성해 히스토리 보존** (`--amend` 우회 방지)
- 위험한 git 명령은 시스템 차원에서 막아 놓음

영상 1에서 말한 하네스의 네 기둥 — **컨텍스트 파일, 게이팅, 도구 경계, 피드백 루프** — 이 이미 Claude Code 안에 모두 내장되어 있다는 뜻입니다.

## 4.2 Martin Fowler의 정의 — Guides + Sensors

이 "하네스"라는 단어는 영상 2가 만든 용어가 아닙니다. 같은 시기 소프트웨어 업계의 거장 **Martin Fowler**도 같은 표현을 쓰며 [Harness Engineering for Coding Agents](https://martinfowler.com/articles/harness-engineering.html)라는 권위 있는 글을 발표했습니다. 정의는 이렇습니다.

<div class="info-box blue">
<strong>Martin Fowler, Harness Engineering (2026)</strong><br/>
"하네스란 <strong>AI 에이전트에서 모델 그 자체를 제외한 모든 것</strong>이다."<br/>
즉, <strong>Agent = Model + Harness</strong>.<br/>
좋은 하네스는 사람의 개입을 완전히 없애려 하지 않는다. <strong>"사람의 개입이 가장 중요한 곳에 그 개입을 집중시키는 것"</strong>이 하네스의 목적이다.
</div>

Fowler는 하네스를 두 메커니즘으로 분해합니다 — 영상 2의 "컨텍스트 vs 가드레일" 구분과 정확히 매핑됩니다.

<div class="mermaid">
graph TB
    A["하네스 (Harness)<br/>= Agent − Model"] --> B["1. Guides (Feedforward)<br/>행동 전에 안내"]
    A --> C["2. Sensors (Feedback)<br/>행동 후에 관찰·교정"]

    B --> B1["아키텍처 문서"]
    B --> B2["코딩 컨벤션"]
    B --> B3["부트스트랩 스크립트"]
    B --> B4["CLAUDE.md / 시스템 프롬프트"]

    C --> C1["린트, 타입 체크, 테스트"]
    C --> C2["CI 게이트"]
    C --> C3["AI 코드 리뷰어"]
    C --> C4["서킷 브레이커"]

    style A fill:#3b82f6,stroke:#2563eb,color:#fff
    style B fill:#10b981,stroke:#059669,color:#fff
    style C fill:#f59e0b,stroke:#d97706,color:#fff
</div>

| Fowler의 분류 | 영상 2의 표현 | 예시 |
|---------------|---------------|------|
| **Guides (Feedforward)** | "컨텍스트 / 프로젝트 헌법" | `docs/`, `CLAUDE.md`, ADR |
| **Sensors (Feedback)** | "가드레일 / 자동 검증" | TDD 강제 훅, 위험 명령 차단, 서킷 브레이커 |
| **Computational** (결정적) | "정해진 검증" | 린트, 타입 체크, 테스트 |
| **Inferential** (추론적) | "AI 리뷰" | LLM 기반 코드 리뷰 에이전트 |

영상 2의 비유 — **"하네스는 AI라는 거대한 말이 우리가 원하는 방향으로 달리게 만들어 주는 마구(馬具)다"** — 와 Fowler의 정의는 다른 언어로 같은 개념을 가리킵니다.

## 4.3 내장 하네스의 한계

하지만 Claude Code의 내장 하네스에는 한계가 있습니다 — **범용**이라는 점입니다. 모두를 위해 만든 것이라, **내 프로젝트만의 규칙**은 모릅니다.

- "API 호출은 반드시 이 wrapper를 거쳐라"
- "이 외부 라이브러리는 쓰지 마라"
- "DB 스키마는 이미 확정됐으니 절대 건드리지 마라"

이런 도메인 스페시픽한 규칙·아키텍처 결정·기술 선택의 이유 — 이걸 AI에게 알려주는 것이 곧 **2층 하네스를 쌓는 일**입니다.

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

## 4.4 두 갈래 — 오픈소스 vs 커스텀

2층을 쌓는 방법은 크게 두 가지입니다.

| 구분 | 오픈소스 하네스 | 커스텀 하네스 |
|------|----------------|----------------|
| 예시 | [`oh-my-claudecode`](https://github.com/yeachan-heo/oh-my-claudecode) 등 | 직접 만든 `docs/`, `CLAUDE.md`, hooks |
| 장점 | 잘 짜인 에이전트·파이프라인·스킬 즉시 활용 | 내 프로젝트에 정확히 맞는 가벼운 세팅 |
| 단점 | 내 프로젝트 컨텍스트는 비어 있음 | 처음부터 내가 채워야 함 |
| 추천 시점 | 프로젝트 커지고 워크플로 다양해질 때 | 처음 시작할 때 |

영상 2가 소개한 [`oh-my-claudecode`](https://github.com/yeachan-heo/oh-my-claudecode)는 한국 개발자 Yeachan Heo가 만든 오픈소스로, GitHub 스타가 빠르게 누적되며 한국어 README까지 포함되어 있습니다. 핵심 사양은 다음과 같습니다.

- **19개의 전문 에이전트**: analyst, architect, code-reviewer, exploration, getter 등 역할별 분리
- **자동 파이프라인**: `plan → execute → verify → fix` 루프를 시스템이 알아서 진행
- **36개+ 스킬**: 자주 쓰는 작업 패턴을 스킬로 저장해 한 번에 실행

회사에서 팀원들이 역할을 나눠 일하듯, AI도 분야별로 전문화시키면 **자기 분야에 집중하니까 품질이 올라간다**는 발상입니다. 다만 한 가지 — 처음부터 풀 세팅으로 갈 필요는 없습니다. **프로젝트가 커지면서 하나씩 붙여 나가는** 방식이 더 현실적이라는 게 영상 2의 권고입니다.

---

# Part 5. 커스텀 하네스 — 4가지 기둥

영상 2가 직접 만든 가벼운 프레임워크는 네 부분으로 구성됩니다.

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

## 5.1 docs/ — 프로젝트의 뇌

여기에 프로젝트의 **모든 컨텍스트**가 들어갑니다. Fowler 분류로는 모두 **Guides(Feedforward)**입니다.

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

## 5.2 CLAUDE.md — 프로젝트 헌법

<div class="info-box blue">
<strong>크리티컬 규칙은 신호로 표시</strong><br/>
"<strong>CRITICAL — 반드시 읽을 것</strong>" 같은 우선순위 마커를 붙이면 AI가 이를 더 강하게 인식한다.
</div>

예시 규칙:
- "Anthropic SDK 사용 금지" (외부 라이브러리 제한)
- "API는 반드시 이 wrapper로 호출"
- "UI에는 AI slop 패턴 금지"

## 5.3 실행 엔진 — `/harness` 커맨드 + 파이프라인

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

### `claude -p` 헤드리스 모드 — 페이즈별 컨텍스트 분리

```
하나의 세션에서 모든 페이즈 돌리기 (X)
→ 컨텍스트가 누적되어 후반 페이즈 품질 저하

페이즈마다 claude -p 새 세션 (O)
→ 컨텍스트 분리, 일정한 품질 유지
→ 단점: 기억이 없으니 상태 관리 필수
```

### JSON 상태 파일 — AI가 자기 진행을 읽을 수 있게

페이즈마다 결과·에러를 JSON으로 기록합니다. AI는 사람보다 JSON을 더 잘 읽고, 다음 세션이 이전 상태를 정확히 이어받을 수 있습니다.

## 5.4 Hooks — 자동 검증 게이트

Fowler 분류로는 **Sensors(Feedback)**입니다.

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

# Part 6. FeedbackPulse 데모와 그 안의 두 메시지

영상 2의 후반부는 이 프레임워크로 **유튜브 댓글 분석 앱(FeedbackPulse)**을 만드는 과정을 실시간으로 보여줍니다. 핵심 워크플로만 정리하면 다음과 같습니다.

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

이 데모는 단순한 "AI로 앱 만들기" 시연이 아니라, 두 가지 묵직한 메시지를 품고 있습니다.

## 6.1 메시지 1: 기획이 결정한다 — Spec-Driven Development

<div class="info-box yellow">
<strong>"docs와 CLAUDE.md의 디테일이 부족하면, 파이프라인을 돌려도 딱 그만큼만 결과가 나온다."</strong><br/>
에러 핸들링이 빠져 있으면 빠진 채로, 디자인이 모호하면 모호한 채로 나온다. <strong>기획 단계에 20\~30분을 쏟는 것이 결과 품질의 90%를 결정한다.</strong>
</div>

이 메시지는 영상 2 혼자만의 통찰이 아닙니다. 같은 시기 업계는 비슷한 방향으로 움직이고 있었습니다 — **vibe coding의 한계**가 분명해지면서 **Spec-Driven Development(SDD)**가 프로페셔널 표준으로 자리 잡고 있었습니다. [Red Hat](https://developers.redhat.com/articles/2026/02/17/uncomfortable-truth-about-vibe-coding)을 비롯한 여러 출처가 같은 진단을 내립니다.

> "Vibe coding은 프로토타입에는 좋지만 프로덕션에서는 무너진다.<br/>
> 코드가 아니라 스펙이 source of truth가 되어야 한다."

Karpathy의 강연 인용을 다시 꺼내봅니다.

> "사람은 스펙과 계획에 대한 책임자여야 한다.<br/>
> 에이전트와 함께 매우 디테일한 스펙을 설계해라."

영상 2의 "기획에 20\~30분, 5\~6번 갈굼, 관점 바꿔 보강" 워크플로는 **이 SDD 흐름을 한 사람의 작업 패턴으로 구체화한 것**입니다.

### 한 번에 만족하지 마라 — 5\~6번은 갈궈야 한다

영상 2의 인상적인 표현:

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

극단까지 밀고 가면 사람이 개입하지 않아도 밤새 돌아가는 **Ralph 루프**(밤새 돌리는 자동화 루프)가 되고, 스펙을 마크다운이 아니라 **JSON 구조**로 작성하면 AI가 더 잘 읽고 상태 관리가 자동화됩니다 — 이것이 SDD의 심화 버전입니다.

## 6.2 메시지 2: AI 시대, 더 중요해지는 것은 "취향"

영상 2의 마지막 통찰이 가장 묵직합니다.

<div class="info-box blue">
<strong>"하네스 프레임워크 자체는 누구나 똑같이 쓴다.<br/>
결과물의 품질을 결정하는 건, 우리가 거기에 채워 넣는 PRD·아키텍처·ADR의 품질이다.<br/>
그건 결국 우리 머릿속에 있는 '취향'에서 나온다."</strong>
</div>

이 진단은 Karpathy의 **"Jagged Intelligence"**와 정확히 맞물립니다 — LLM이 검증 가능한 영역에서는 정점에 가깝지만 열린 추론에선 들쭉날쭉하다면, **그 들쭉날쭉한 빈 공간을 채우는 것이 결국 사람의 판단·취향**이 됩니다.

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

같은 의미를 Fowler는 이렇게 말했습니다 — **"좋은 하네스는 사람의 개입을 없애는 것이 아니라, 사람의 개입이 가장 중요한 곳에 그것을 집중시키는 것이다."**

---

# Epilogue. 파도를 탈 결정은 우리에게 있다

두 영상의 메시지를 한 줄씩 묶으면 이렇게 됩니다.

| | 핵심 메시지 |
|---|---|
| **영상 1** | AI Native가 되어야 살아남는 시대다 — 그 결정권은 우리에게 있다 |
| **영상 2** | AI Native의 구체적 실천이 곧 하네스 엔지니어링이고, 누구나 오늘 시작할 수 있다 |
| **+ 외부 흐름** | Karpathy·Fowler·BCG 모두 같은 방향을 가리키고 있다 |

<div class="info-box yellow">
<strong>오늘의 가장 큰 기회이자 레버리지</strong><br/>
파도에 휩쓸려 떠내려갈지, 파도를 타는 사람이 될지, 파도 위에서 즐기는 사람이 될지 — <strong>그 결정권은 우리에게 있다.</strong>
</div>

## 이 글이 남기는 체크리스트

### AI Native 마인드셋 (영상 1 + Karpathy)
- [ ] 새 일이 떨어졌을 때, 손이 먼저 AI로 가는가? 아니면 의식적으로 "AI 써 볼까?" 망설이는가?
- [ ] 같은 프로젝트 컨텍스트를 매번 처음부터 다시 설명하고 있지는 않은가?
- [ ] 자주 쓰는 워크플로가 **스킬·에이전트·프롬프트 템플릿**으로 정리되어 있는가?
- [ ] **Jagged Frontier**를 의식하는가? AI에게 맡길 일과 맡기면 안 될 일을 가르고 있는가?

### 하네스 엔지니어링 실천 (영상 2 + Fowler)
- [ ] `CLAUDE.md`에 **CRITICAL 신호로 표시한 프로젝트 헌법**이 있는가? (Guide)
- [ ] `docs/` 폴더에 **PRD / Architecture / ADR**이 모두 채워져 있는가? (Guide, 특히 **MVP 제외 사항**)
- [ ] **TDD 강제 / 위험 명령 차단 / 서킷 브레이커** 훅이 깔려 있는가? (Sensor)
- [ ] 기획 단계에서 **5\~6번 갈구고 관점 바꿔 보강**하는 절차가 있는가? (Spec-Driven)
- [ ] 페이즈를 `claude -p` 헤드리스로 분리해 **컨텍스트 누적을 막고** 있는가?

---

## 출처 일괄

### 영상 (이 글의 출발점)
- 채널: **실밸 개발자**
- 영상 1: [AI Native가 되는 법](https://youtu.be/vUkUqChwoHU?si=HCxT08ErPbCf9cx1)
- 영상 2: [하네스 엔지니어링 — 직접 세팅하기](https://youtu.be/AQOvNx87Urs?si=iJS3SA_Fc9qnkWFs)

### 1차 자료 (수치·정의 출처)
- ChatGPT 8억 WAU: [TechCrunch (Sam Altman 발표, 2025-10-06)](https://techcrunch.com/2025/10/06/sam-altman-says-chatgpt-has-hit-800m-weekly-active-users/)
- 지식 노동자 75% AI 사용: [Microsoft & LinkedIn 2024 Work Trend Index](https://blogs.microsoft.com/blog/2024/05/08/microsoft-and-linkedin-release-the-2024-work-trend-index-on-the-state-of-ai-at-work/)
- GitHub Copilot 55%: [Microsoft Research, arXiv 2302.06590](https://arxiv.org/abs/2302.06590)
- BCG/HBS 12% / 40% / Jagged Frontier: [HBS Working Paper 24-013, Dell'Acqua et al. (2023)](https://www.hbs.edu/faculty/Pages/item.aspx?num=64700)
- AI 채용 시장: [LinkedIn Economic Graph — AI Skills Resources](https://economicgraph.linkedin.com/research/ai-skills-resources)

### 외부 권위 (개념 보강)
- Andrej Karpathy, [From Vibe Coding to Agentic Engineering (AI Ascent 2026)](https://www.youtube.com/watch?v=96jN2OCOfLs)
- Martin Fowler, [Harness Engineering for Coding Agents](https://martinfowler.com/articles/harness-engineering.html)
- Vibe coding 한계 진단: [Red Hat Developer — "The uncomfortable truth about vibe coding"](https://developers.redhat.com/articles/2026/02/17/uncomfortable-truth-about-vibe-coding)
- Claude Code 시스템 프롬프트 분석: [Nate's Substack — Surfing the Guardrails](https://natesnewsletter.substack.com/p/surfing-the-guardrails-7-production)

### 오픈소스
- [`oh-my-claudecode`](https://github.com/yeachan-heo/oh-my-claudecode) — Yeachan Heo, 19 agents · 36 skills · 한국어 README
