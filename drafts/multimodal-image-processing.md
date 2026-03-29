---
title: "GPT 멀티모달 이미지 처리: 대량 이미지를 AI가 분석하는 방법"
slug: multimodal-image-processing
description: "OpenAI GPT의 멀티모달 API를 활용하여 대량의 이미지를 효율적으로 분석하는 파이프라인 설계. 이미지 분할, 청크 처리, 폴백 전략까지 실전 구현 사례를 공유합니다."
tags:
  - AI
  - OpenAI
  - 멀티모달
  - 이미지처리
  - Node.js
category: AI
published: true
---

## 들어가며

최근 프로젝트에서 **웹 페이지의 콘텐츠를 AI로 자동 검수**하는 시스템을 구축했습니다. 웹 페이지에는 텍스트뿐 아니라 제품 사진, 인증서, 상세 이미지 등 수십 장의 이미지가 포함되어 있고, 이 이미지들까지 분석해야 정확한 검수가 가능합니다.

단순히 GPT API를 호출하면 될 것 같지만, 실제로는 **이미지 전처리, 청크 분할, 결과 병합, 폴백 전략**까지 다양한 엔지니어링이 필요했습니다. 이 글에서는 그 과정에서 마주친 문제들과 해결 방법을 공유합니다.

<div class="info-box blue">
<strong>멀티모달(Multimodal)이란?</strong><br/>
텍스트, 이미지, 오디오 등 여러 종류의 입력을 동시에 처리하는 AI 모델의 능력을 말합니다. GPT-4o/GPT-4.1 이상에서 이미지+텍스트를 함께 분석할 수 있습니다.
</div>

---

## 전체 아키텍처

먼저 시스템의 전체 흐름부터 살펴보겠습니다.

<div class="mermaid">
graph TD
    A["🌐 웹 페이지 HTML 수집"] --> B["📄 HTML 파싱"]
    B --> B1["텍스트 추출"]
    B --> B2["이미지 URL 추출\n(최대 100장)"]
    B1 --> C["🖼️ 이미지 전처리"]
    B2 --> C
    C --> C1["리사이즈 & 압축"]
    C --> C2["애니메이션 GIF\n→ 첫 프레임 추출"]
    C --> C3["세로 긴 이미지\n→ 1500px 단위 분할"]
    C1 --> D["📦 청크 분할 (10장/청크)"]
    C2 --> D
    C3 --> D
    D --> E1["청크 1 → GPT 호출"]
    D --> E2["청크 2 → GPT 호출"]
    D --> E3["청크 N → GPT 호출"]
    E1 --> F["🔀 결과 병합 & 중복 제거"]
    E2 --> F
    E3 --> F
    F --> G["✅ 최종 분석 결과"]

    style A fill:#3b82f6,stroke:#2563eb,color:#fff
    style G fill:#10b981,stroke:#059669,color:#fff
    style F fill:#f59e0b,stroke:#d97706,color:#fff
</div>

핵심은 **"한 번에 모든 이미지를 GPT에 보내지 않는다"**는 것입니다. 왜 그런지 각 단계를 살펴보겠습니다.

---

## 문제 1: 이미지가 너무 많다

일반적인 상세 페이지에는 10~50장의 이미지가 들어있습니다. 그런데 GPT 멀티모달 API에 이미지를 한꺼번에 많이 보내면 두 가지 문제가 생깁니다.

<div class="chart-container" style="max-width: 600px; margin: 0 auto;">
<canvas id="chunkChart"></canvas>
</div>

<script type="text/javascript">
setTimeout(function() {
  if (typeof Chart === 'undefined') return;
  var ctx = document.getElementById('chunkChart');
  if (!ctx || ctx.getAttribute('data-rendered')) return;
  ctx.setAttribute('data-rendered', 'true');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['1-10장', '11-20장', '21-30장', '31-40장', '41-50장'],
      datasets: [{
        label: '분석 정확도 (%)',
        data: [95, 92, 88, 82, 75],
        backgroundColor: '#3b82f6',
        borderRadius: 4
      }, {
        label: '토큰 비용 (상대값)',
        data: [1.0, 2.1, 3.4, 4.8, 6.5],
        backgroundColor: '#f59e0b',
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: { display: true, text: '이미지 수에 따른 정확도 vs 비용', font: { size: 15 } },
        legend: { position: 'bottom' }
      },
      scales: { y: { beginAtZero: true } }
    }
  });
}, 300);
</script>

이미지가 10장을 넘어가면 **정확도는 떨어지고 비용은 가파르게 증가**합니다. 그래서 **10장 단위로 청크를 나눠** 각각 독립적으로 GPT를 호출하는 전략을 택했습니다.

### 청크 분할의 핵심 아이디어

| 전략 | 장점 | 단점 |
|------|------|------|
| 전체 한 번에 전송 | 구현 간단 | 이미지 많으면 정확도↓, 비용↑↑ |
| **10장씩 분할 호출** | 일정한 정확도, 비용 선형 증가 | 결과 병합 로직 필요 |
| 이미지 1장씩 호출 | 최고 정확도 | 비용 폭발, 맥락 파악 불가 |

10장이라는 숫자는 실험을 통해 정한 값입니다. 이 크기에서 GPT가 이미지 간의 관계를 파악하면서도 과부하 없이 분석할 수 있었습니다.

---

## 문제 2: 이미지 종류가 다양하다

실제 웹 페이지에서 추출되는 이미지는 단일 종류가 아닙니다.

<div class="chart-container" style="max-width: 500px; margin: 0 auto;">
<canvas id="imageTypeChart"></canvas>
</div>

<script type="text/javascript">
setTimeout(function() {
  if (typeof Chart === 'undefined') return;
  var ctx = document.getElementById('imageTypeChart');
  if (!ctx || ctx.getAttribute('data-rendered')) return;
  ctx.setAttribute('data-rendered', 'true');
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['일반 이미지 (≤1500px)', '세로 긴 이미지 (>1500px)', '애니메이션 GIF/WebP'],
      datasets: [{
        data: [65, 25, 10],
        backgroundColor: ['#3b82f6', '#f59e0b', '#10b981'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom', labels: { padding: 16, font: { size: 13 } } },
        title: { display: true, text: '실제 운영 환경에서의 이미지 유형 분포', font: { size: 15 } }
      }
    }
  });
}, 200);
</script>

각 유형별로 **다른 전처리 전략**이 필요합니다.

### 일반 이미지: JPEG 압축

대부분의 이미지는 단순히 **JPEG quality 85로 압축**하면 됩니다. 원본 대비 60~70% 용량이 줄어들지만 GPT의 분석 품질에는 영향이 없었습니다. `sharp` 라이브러리로 한 줄이면 처리됩니다.

### 애니메이션 GIF/WebP: 첫 프레임만 추출

애니메이션 이미지를 그대로 보내면 토큰을 과도하게 소비합니다. 실제로 검수에 필요한 정보는 **첫 프레임에 대부분 담겨있기 때문에**, 첫 프레임만 PNG로 추출하고 `detail: 'low'` 옵션으로 전송합니다.

### 세로 긴 이미지: 가장 까다로운 문제

이커머스 상세 페이지에서 흔히 볼 수 있는 **세로로 매우 긴 이미지**(3000px, 5000px 이상)가 가장 어려운 문제였습니다.

---

## 문제 3: 세로 긴 이미지를 어떻게 분석할까?

GPT에 세로가 긴 이미지를 통째로 전달하면 자동으로 축소되어 **텍스트가 읽을 수 없을 정도로 작아집니다.** 인증서나 성적서 이미지의 경우 텍스트 인식이 불가능해지죠.

해결책은 **1500px 단위로 분할**하는 것입니다. 하지만 단순히 자르면 경계에 걸친 텍스트가 잘립니다.

### 오버랩 분할 전략

이 문제를 해결하기 위해 **100px 오버랩**을 적용했습니다.

<div class="mermaid">
graph LR
    subgraph ORIGINAL["📷 원본 이미지 3000px"]
        direction TB
        S1["🔵 조각 1\n0 ~ 1500px"]
        O1(("↕ 100px\n오버랩"))
        S2["🟡 조각 2\n1400 ~ 2900px"]
        O2(("↕ 100px\n오버랩"))
        S3["🟢 조각 3\n2800 ~ 3000px"]
        S1 --- O1 --- S2 --- O2 --- S3
    end

    style S1 fill:#3b82f6,stroke:#2563eb,color:#fff
    style S2 fill:#f59e0b,stroke:#d97706,color:#fff
    style S3 fill:#10b981,stroke:#059669,color:#fff
    style O1 fill:#fef3c7,stroke:#f59e0b,color:#92400e
    style O2 fill:#fef3c7,stroke:#f59e0b,color:#92400e
</div>

각 조각은 인접 조각과 100px씩 겹칩니다. 한국어 텍스트 한 줄이 약 30\~50px이므로, **2\~3줄이 중복 포함**되어 경계에서 잘리는 텍스트를 보완합니다.

<div class="info-box yellow">
<strong>왜 100px인가?</strong><br/>
오버랩이 클수록 안전하지만 토큰 비용이 증가합니다. 실험 결과, 100px이면 본문 텍스트의 98%를 커버하면서도 비용 증가는 7% 미만이었습니다. 큰 폰트나 표 레이아웃이 걸리는 경우를 위해 HTML에서 추출한 텍스트 원본도 함께 전달합니다.
</div>

### 이중 안전장치: 텍스트 원본 병행 전달

이미지를 분할하더라도 완벽하지는 않습니다. 특히 이미지 안에만 존재하는 인증서나 성적서가 경계에 걸리면 분석이 누락될 수 있죠.

이를 보완하기 위해 GPT 호출 시 **HTML에서 추출한 텍스트 원본을 이미지와 함께 전달**합니다. GPT가 이미지에서 읽지 못한 내용을 텍스트로 보완할 수 있습니다.

<div class="mermaid">
graph TD
    subgraph GPT["🤖 GPT 멀티모달 호출"]
        direction TB
        P1["📋 시스템 프롬프트\n분석 기준, 응답 형식 정의"]
        P2["📄 페이지 텍스트 원본\nHTML에서 추출한 전체 텍스트"]
        P3["🖼️ 이미지 1~10 (detail: high)\nbase64 인코딩"]
        P4["📌 청크 안내\n3개 그룹 중 1번째"]
        P1 --> P2 --> P3 --> P4
    end
    P4 --> R["📊 구조화된 JSON 응답"]

    style GPT fill:#f8fafc,stroke:#3b82f6,stroke-width:2px
    style R fill:#10b981,stroke:#059669,color:#fff
</div>

텍스트 원본이 이미지와 함께 전달되기 때문에, 이미지에서 잘린 텍스트도 원본을 참조하여 분석할 수 있습니다.

---

## 문제 4: 청크별 결과를 어떻게 합칠까?

10장씩 나눠서 GPT를 호출하면 청크 수만큼 분석 결과가 나옵니다. 문제는 **동일한 이슈가 여러 청크에서 중복 보고**된다는 것입니다.

예를 들어 오버랩 영역에 포함된 이미지에서 같은 문제가 청크 1과 청크 2에서 각각 발견될 수 있습니다.

### 중복 제거 전략

중복 제거는 **분석 기준(criterion) 기준으로 그룹화**하여 처리합니다.

<div class="mermaid">
graph TD
    A["청크 1 결과\n이슈 3건"] --> D["전체 이슈 수집"]
    B["청크 2 결과\n이슈 4건"] --> D
    C["청크 3 결과\n이슈 2건"] --> D
    D --> E["분석 기준으로 그룹화"]
    E --> F["그룹별 병합\n• 가장 높은 심각도 유지\n• 발견 내용 합산"]
    F --> G["코드 재번호\nISS-01, ISS-02, ..."]
    G --> H["최종 결과\n중복 제거된 이슈 목록"]

    style D fill:#f59e0b,stroke:#d97706,color:#fff
    style H fill:#10b981,stroke:#059669,color:#fff
</div>

병합 규칙은 간단합니다:

1. **같은 분석 기준에 해당하는 이슈를 하나로 합침**
2. 심각도(severity)는 **가장 높은 값을 유지** (critical > major > minor)
3. 발견 내용(finding)은 **모두 합산**하여 어떤 청크에서 발견되었는지 추적
4. 이슈 코드를 `ISS-01`, `ISS-02`... 순서로 **재번호**

이 방식으로 9건의 이슈가 5건으로 줄어드는 경우도 흔합니다.

---

## 문제 5: 실패하면 어떻게 할까?

멀티모달 API는 텍스트 전용보다 **실패 확률이 높습니다.** 이미지 인코딩 오류, 토큰 한도 초과, Rate Limit 등 다양한 원인이 있습니다.

### 3단계 폴백 전략

단순한 재시도가 아닌, **점진적으로 요구 수준을 낮추는** 폴백 전략을 구현했습니다.

| 단계 | 전략 | 트레이드오프 |
|------|------|-------------|
| **1차** | 지수 백오프 재시도 | 일시적 오류에 효과적. 동일 품질 유지 |
| **2차** | 이미지 품질 낮춤 (`detail: 'high'` → `'low'`) | 토큰 50% 절감. 작은 텍스트 인식 저하 |
| **3차** | 텍스트 전용 폴백 | 이미지 분석 완전 생략. 텍스트만으로 판단 |

<div class="info-box red">
<strong>폴백의 한계</strong><br/>
3차 텍스트 전용 폴백에서는 이미지에만 존재하는 정보(인증서, 성적서, 제품 라벨 등)를 분석할 수 없습니다. 이 경우 결과에 <strong>"이미지 분석 생략"</strong> 플래그를 추가하여 수동 검토가 필요함을 명시합니다.
</div>

### 재시도 간격

모든 재시도는 **지수 백오프(exponential backoff)**를 적용합니다.

| 에러 유형 | 1차 대기 | 2차 대기 | 3차 대기 |
|----------|---------|---------|---------|
| 429 Rate Limit | 2초 | 4초 | 8초 |
| 이미지 처리 오류 | 3초 | 6초 | — (폴백) |
| 네트워크 오류 | 2초 | 4초 | 8초 |

핵심은 **"무조건 재시도"가 아니라 "단계별로 요구 수준을 낮추면서 재시도"**한다는 점입니다. 이미지 처리 오류는 재시도해도 해결되지 않을 가능성이 높으므로 2회 후 바로 폴백합니다.

---

## 비용 최적화 결과

이 모든 최적화를 적용한 결과, 건당 처리 비용을 **74% 절감**할 수 있었습니다.

<div class="chart-container" style="max-width: 600px; margin: 0 auto;">
<canvas id="costChart"></canvas>
</div>

<script type="text/javascript">
setTimeout(function() {
  if (typeof Chart === 'undefined') return;
  var ctx = document.getElementById('costChart');
  if (!ctx || ctx.getAttribute('data-rendered')) return;
  ctx.setAttribute('data-rendered', 'true');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['최적화 전', 'JPEG 압축', '+ 리사이즈', '+ GIF 1프레임', '+ 이미지 수 제한'],
      datasets: [{
        label: '건당 평균 비용 ($)',
        data: [0.85, 0.52, 0.35, 0.31, 0.22],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59,130,246,0.1)',
        fill: true,
        tension: 0.3,
        pointRadius: 5,
        pointBackgroundColor: '#3b82f6'
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: { display: true, text: '최적화 단계별 비용 변화', font: { size: 15 } },
        legend: { display: false }
      },
      scales: {
        y: { beginAtZero: true, title: { display: true, text: 'USD / 건' } }
      }
    }
  });
}, 400);
</script>

가장 큰 비용 절감 효과는 **JPEG 압축**이었습니다. 원본 PNG/WebP를 JPEG quality 85로 변환하는 것만으로 39% 절감. 이후 리사이즈, GIF 첫 프레임 추출, 이미지 수 제한을 순차 적용하여 최종 $0.22/건까지 낮출 수 있었습니다.

### 최적화 포인트 요약

| 최적화 | 절감 효과 | 품질 영향 |
|--------|---------|----------|
| JPEG 압축 (quality: 85) | 용량 60~70% ↓ | 없음 |
| 애니메이션 첫 프레임 추출 | 토큰 80% ↓ (해당 이미지) | 없음 (정지 이미지로 충분) |
| detail: 'low' (GIF용) | 토큰 50% ↓ | 미미 (저해상도 이미지) |
| 이미지 100장 제한 | 비용 상한 설정 | 극단적 케이스에서 누락 가능 |

---

## 알려진 한계

이 시스템에도 아직 해결하지 못한 문제가 있습니다.

**인증서/성적서 이미지**: 텍스트가 아닌 이미지로만 존재하는 문서가 분할 경계에 걸리면 분석이 누락될 수 있습니다. HTML 텍스트 원본에 포함되지 않는 정보이기 때문입니다.

**큰 폰트/표 레이아웃**: 100px 오버랩으로 커버되지 않는 큰 요소가 경계에 걸릴 수 있습니다.

**비라틴 문자 OCR**: GPT의 한국어 이미지 내 텍스트 인식은 영어 대비 정확도가 낮습니다. 특히 손글씨체나 장식 폰트에서 오인식이 발생합니다.

<div class="info-box green">
<strong>향후 개선 계획</strong>
<ul style="margin-bottom: 0;">
<li><strong>오버랩 확대</strong>: 200~300px로 늘려 경계 텍스트 커버리지 향상 (비용 10~15% 증가 예상)</li>
<li><strong>스마트 분할</strong>: 텍스트 밀도가 낮은 영역에서 자르는 로직 추가</li>
<li><strong>이미지 유형 감지</strong>: 인증서/성적서는 분할하지 않고 통째로 전달</li>
</ul>
</div>

---

## 마치며

"GPT에 이미지 보내서 분석하면 되겠지"라는 단순한 아이디어에서 시작했지만, 실제 프로덕션 환경에서는 다양한 엔지니어링 과제가 있었습니다.

**핵심 교훈 세 가지:**

1. **청크 분할은 필수입니다.** 이미지가 10장을 넘으면 반드시 분할하세요. 정확도와 비용 모두 개선됩니다.
2. **전처리가 비용의 핵심입니다.** JPEG 압축 하나만으로도 39% 비용 절감. API 호출 최적화보다 입력 최적화가 효과적입니다.
3. **폴백은 선택이 아닌 필수입니다.** 멀티모달 API는 텍스트 전용보다 실패율이 높습니다. 단계별 폴백 없이는 안정적인 서비스가 불가능합니다.

이 파이프라인은 콘텐츠 검수 외에도 **대량의 상품 이미지 검수**, **문서 OCR 파이프라인**, **콘텐츠 모더레이션** 등 이미지+텍스트를 함께 분석해야 하는 모든 분야에 응용할 수 있습니다.
