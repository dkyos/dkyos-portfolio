"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import {
  useEffect,
  useRef,
  useMemo,
  type ReactNode,
  type HTMLAttributes,
} from "react";

interface PostContentProps {
  content: string;
}

// 커스텀 블록 구분자
const MERMAID_REGEX = /<div class="mermaid">([\s\S]*?)<\/div>/g;
const CHART_REGEX =
  /<div class="chart-container"([^>]*)>\s*<canvas id="([^"]+)"[^>]*>\s*<\/canvas>\s*<\/div>/g;
const SCRIPT_REGEX = /<script[^>]*>([\s\S]*?)<\/script>/gi;

interface ParsedBlock {
  type: "markdown" | "mermaid" | "chart";
  content: string;
  chartId?: string;
}

function parseContent(content: string): {
  blocks: ParsedBlock[];
  scripts: string[];
} {
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

export function PostContent({ content }: PostContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { blocks, scripts } = useMemo(() => parseContent(content), [content]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Chart.js 로드 후 스크립트 실행
    if (scripts.length > 0) {
      loadScript(
        "https://cdn.jsdelivr.net/npm/chart.js@4/dist/chart.umd.min.js",
        () => {
          for (const code of scripts) {
            const script = document.createElement("script");
            script.textContent = code;
            document.body.appendChild(script);
            document.body.removeChild(script);
          }
        }
      );
    }

    // Mermaid 로드 후 렌더링
    const mermaidEls = containerRef.current.querySelectorAll(".mermaid");
    if (mermaidEls.length > 0) {
      loadScript(
        "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js",
        () => {
          const mermaid = (window as unknown as { mermaid: MermaidAPI })
            .mermaid;
          const isDark = document.documentElement.classList.contains("dark");
          mermaid.initialize({
            startOnLoad: false,
            theme: isDark ? "dark" : "default",
            fontFamily: "inherit",
          });
          mermaid.run({ nodes: mermaidEls });
        }
      );
    }
  }, [content, scripts]);

  return (
    <div ref={containerRef} className={PROSE_CLASSES}>
      {blocks.map((block, i) => {
        if (block.type === "mermaid") {
          return (
            <div key={i} className="mermaid my-6 flex justify-center overflow-x-auto">
              {block.content}
            </div>
          );
        }
        if (block.type === "chart") {
          // block.content에 style 속성 문자열이 담겨있음
          const styleMatch = block.content.match(/style="([^"]+)"/);
          const inlineStyle = styleMatch
            ? Object.fromEntries(
                styleMatch[1].split(";").filter(Boolean).map((s) => {
                  const [key, val] = s.split(":").map((v) => v.trim());
                  const camelKey = key.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
                  return [camelKey, val];
                })
              )
            : {};
          return (
            <div
              key={i}
              className="chart-container my-6 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800"
              style={inlineStyle}
            >
              <canvas id={block.chartId}></canvas>
            </div>
          );
        }
        return (
          <ReactMarkdown
            key={i}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={markdownComponents}
          >
            {block.content}
          </ReactMarkdown>
        );
      })}
    </div>
  );
}

// div에 className을 보존하는 커스텀 컴포넌트
const markdownComponents = {
  div: ({
    children,
    ...props
  }: HTMLAttributes<HTMLDivElement> & { children?: ReactNode }) => (
    <div {...props}>{children}</div>
  ),
};

const PROSE_CLASSES =
  "prose prose-zinc max-w-none dark:prose-invert prose-headings:scroll-mt-24 prose-headings:leading-tight prose-headings:tracking-tight prose-p:leading-relaxed prose-li:leading-relaxed prose-a:text-foreground prose-a:underline-offset-4 prose-pre:bg-zinc-950 prose-pre:dark:bg-zinc-900 [&_.info-box]:my-4 [&_.info-box]:rounded-lg [&_.info-box]:border-l-4 [&_.info-box]:p-4 [&_.info-box.blue]:border-blue-500 [&_.info-box.blue]:bg-blue-50 dark:[&_.info-box.blue]:bg-blue-950/30 [&_.info-box.yellow]:border-yellow-500 [&_.info-box.yellow]:bg-yellow-50 dark:[&_.info-box.yellow]:bg-yellow-950/30 [&_.info-box.red]:border-red-500 [&_.info-box.red]:bg-red-50 dark:[&_.info-box.red]:bg-red-950/30 [&_.info-box.green]:border-green-500 [&_.info-box.green]:bg-green-50 dark:[&_.info-box.green]:bg-green-950/30";

interface MermaidAPI {
  initialize: (config: Record<string, unknown>) => void;
  run: (config: { nodes: NodeListOf<Element> }) => void;
}

function loadScript(src: string, onLoad: () => void) {
  const existing = document.querySelector(`script[src="${src}"]`);
  if (existing) {
    onLoad();
    return;
  }
  const script = document.createElement("script");
  script.src = src;
  script.onload = onLoad;
  document.head.appendChild(script);
}
