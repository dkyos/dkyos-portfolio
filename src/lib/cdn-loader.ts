// CDN 스크립트 동적 로딩 및 Mermaid 초기화 유틸

interface MermaidAPI {
  initialize: (config: Record<string, unknown>) => void;
  run: (config: { nodes: NodeListOf<Element> }) => void;
}

// CDN 스크립트 로드 (이미 로드된 경우 재사용)
export function loadScript(src: string, onLoad: () => void) {
  const existing = document.querySelector(`script[src="${src}"]`);
  if (existing) {
    // 이미 로드됨 → 약간의 딜레이 후 실행 (초기화 대기)
    setTimeout(onLoad, 50);
    return;
  }
  const script = document.createElement("script");
  script.src = src;
  script.onload = () => setTimeout(onLoad, 50);
  document.head.appendChild(script);
}

// Mermaid 라이브러리 초기화 (로드 대기 + 리트라이)
export function initMermaid(nodes: NodeListOf<Element>, retries = 5) {
  const mermaid = (window as unknown as { mermaid?: MermaidAPI }).mermaid;
  if (!mermaid) {
    if (retries > 0) {
      setTimeout(() => initMermaid(nodes, retries - 1), 100);
    }
    return;
  }
  const isDark = document.documentElement.classList.contains("dark");
  mermaid.initialize({
    startOnLoad: false,
    theme: isDark ? "dark" : "default",
    fontFamily: "inherit",
  });
  mermaid.run({ nodes });
}

export const MERMAID_CDN =
  "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js";
export const CHARTJS_CDN =
  "https://cdn.jsdelivr.net/npm/chart.js@4/dist/chart.umd.min.js";
