import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/constants";

/**
 * AI 크롤러를 명시적으로 화이트리스트에 두면 LLM 검색·인용 시그널이 강해진다.
 * 기본 봇(*) 정책과 동일하게 두되 의도를 명시 — 차단이 아닌 공식 허용.
 */
const aiCrawlers = [
  "GPTBot", // OpenAI 학습용
  "OAI-SearchBot", // OpenAI / ChatGPT 검색
  "ChatGPT-User", // ChatGPT 브라우징
  "ClaudeBot", // Anthropic 학습용
  "Claude-Web", // Anthropic 브라우징
  "PerplexityBot", // Perplexity
  "Perplexity-User",
  "Google-Extended", // Bard / Gemini 학습용
  "Applebot-Extended", // Apple Intelligence
  "CCBot", // Common Crawl
  "anthropic-ai",
  "Bytespider", // Doubao / Bytedance
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      ...aiCrawlers.map((bot) => ({
        userAgent: bot,
        allow: "/",
        disallow: ["/admin/", "/api/"],
      })),
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
