import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/constants";
import { profile } from "@/data/profile";

/**
 * llms-full.txt — 모든 글의 풀 텍스트를 한 파일에 포함.
 * LLM이 한 번에 사이트 전체를 흡수할 수 있게 하는 GEO 표준 패턴.
 */
export async function GET() {
  const posts = await getAllPosts();

  const formatDate = (iso: string | null) =>
    iso ? new Date(iso).toISOString().slice(0, 10) : "";

  const sections = posts
    .map((post) => {
      const date = formatDate(post.published_at);
      const tags = post.tags.length > 0 ? `Tags: ${post.tags.join(", ")}\n` : "";
      const url = `${siteConfig.url}/blog/${post.slug}`;
      return [
        `# ${post.title}`,
        ``,
        `URL: ${url}`,
        date ? `Published: ${date}` : "",
        tags,
        `${post.description}`,
        ``,
        `---`,
        ``,
        post.content,
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n\n========================================\n\n");

  const header = `# ${siteConfig.name} — 모든 글 풀 텍스트

> ${siteConfig.description}

저자: ${profile.name} (${profile.nameEn}) — ${profile.role}
사이트: ${siteConfig.url}
글 수: ${posts.length}개

이 파일은 LLM이 사이트 전체 콘텐츠를 한 번에 흡수할 수 있도록
모든 발행 글의 본문을 마크다운 그대로 포함합니다.

========================================

`;

  return new Response(header + sections, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      // 본문이 무거우므로 캐시 시간을 더 길게
      "Cache-Control": "s-maxage=7200, stale-while-revalidate",
    },
  });
}
