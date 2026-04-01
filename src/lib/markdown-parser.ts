// 마크다운 콘텐츠에서 Mermaid/Chart.js 블록을 추출하고 분할하는 파서

const MERMAID_REGEX = /<div class="mermaid">([\s\S]*?)<\/div>/g;
const CHART_REGEX =
  /<div class="chart-container"([^>]*)>\s*<canvas id="([^"]+)"[^>]*>\s*<\/canvas>\s*<\/div>/g;
const SCRIPT_REGEX = /<script[^>]*>([\s\S]*?)<\/script>/gi;

export interface ParsedBlock {
  type: "markdown" | "mermaid" | "chart";
  content: string;
  chartId?: string;
}

export interface ParsedContent {
  blocks: ParsedBlock[];
  scripts: string[];
}

// 마크다운 콘텐츠를 블록 단위로 분할
export function parseContent(content: string): ParsedContent {
  // 스크립트 추출
  const scripts: string[] = [];
  let cleaned = content.replace(SCRIPT_REGEX, (_, code) => {
    scripts.push(code);
    return "";
  });

  // Mermaid/Chart 블록을 플레이스홀더로 교체
  const blocks: ParsedBlock[] = [];
  let blockIndex = 0;

  cleaned = cleaned.replace(MERMAID_REGEX, (_, mermaidCode) => {
    const placeholder = `<!--BLOCK_${blockIndex}-->`;
    blocks.push({ type: "mermaid", content: mermaidCode.trim() });
    blockIndex++;
    return placeholder;
  });

  cleaned = cleaned.replace(CHART_REGEX, (_, styleAttrs, chartId) => {
    const placeholder = `<!--BLOCK_${blockIndex}-->`;
    blocks.push({ type: "chart", content: styleAttrs || "", chartId });
    blockIndex++;
    return placeholder;
  });

  // 마크다운을 플레이스홀더 기준으로 분할
  const parts = cleaned.split(/<!--BLOCK_(\d+)-->/);
  const finalBlocks: ParsedBlock[] = [];

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 0) {
      if (parts[i].trim()) {
        finalBlocks.push({ type: "markdown", content: parts[i] });
      }
    } else {
      const idx = parseInt(parts[i]);
      finalBlocks.push(blocks[idx]);
    }
  }

  return { blocks: finalBlocks, scripts };
}

// Chart 블록의 style 속성 문자열을 React 스타일 객체로 변환
export function parseChartStyle(
  styleAttrs: string
): Record<string, string> {
  const styleMatch = styleAttrs.match(/style="([^"]+)"/);
  if (!styleMatch) return {};

  return Object.fromEntries(
    styleMatch[1]
      .split(";")
      .filter(Boolean)
      .map((s) => {
        const [key, val] = s.split(":").map((v) => v.trim());
        const camelKey = key.replace(/-([a-z])/g, (_, c: string) =>
          c.toUpperCase()
        );
        return [camelKey, val];
      })
  );
}
