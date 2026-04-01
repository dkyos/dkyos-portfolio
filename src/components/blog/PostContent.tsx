"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Image from "next/image";
import { useEffect, useRef, useMemo, type ReactNode, type HTMLAttributes, type ImgHTMLAttributes } from "react";
import { parseContent, parseChartStyle } from "@/lib/markdown-parser";
import { loadScript, initMermaid, MERMAID_CDN, CHARTJS_CDN } from "@/lib/cdn-loader";
import { PROSE_CLASSES } from "@/lib/constants";

interface PostContentProps {
  content: string;
}

export function PostContent({ content }: PostContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { blocks, scripts } = useMemo(() => parseContent(content), [content]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Chart.js 로드 후 스크립트 실행
    if (scripts.length > 0) {
      loadScript(CHARTJS_CDN, () => {
        for (const code of scripts) {
          const script = document.createElement("script");
          script.textContent = code;
          document.body.appendChild(script);
          document.body.removeChild(script);
        }
      });
    }

    // Mermaid 로드 후 렌더링
    const mermaidEls = containerRef.current.querySelectorAll(".mermaid");
    if (mermaidEls.length > 0) {
      loadScript(MERMAID_CDN, () => initMermaid(mermaidEls));
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
          return (
            <div
              key={i}
              className="chart-container my-6 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800"
              style={parseChartStyle(block.content)}
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

// 커스텀 마크다운 컴포넌트
const markdownComponents = {
  div: ({
    children,
    ...props
  }: HTMLAttributes<HTMLDivElement> & { children?: ReactNode }) => (
    <div {...props}>{children}</div>
  ),
  img: ({ src, alt }: ImgHTMLAttributes<HTMLImageElement>) => {
    if (!src || typeof src !== "string") return null;
    return (
      <Image
        src={src}
        alt={alt || "블로그 이미지"}
        width={768}
        height={432}
        className="rounded-lg"
        sizes="(max-width: 768px) 100vw, 768px"
        style={{ width: "100%", height: "auto" }}
      />
    );
  },
};
