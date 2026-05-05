import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/constants";
import { profile } from "@/data/profile";

/**
 * llms.txt — LLM/AI 검색엔진을 위한 사이트 맵.
 * 표준 권고: https://llmstxt.org/
 *
 * 각 글은 발행일·태그·요약을 포함해 LLM이 컨텍스트를 잡기 쉽게 한다.
 */
export async function GET() {
  const posts = await getAllPosts();

  const formatDate = (iso: string | null) =>
    iso ? new Date(iso).toISOString().slice(0, 10) : "";

  const postLines = posts
    .map((post) => {
      const date = formatDate(post.published_at);
      const tags = post.tags.length > 0 ? ` [${post.tags.join(", ")}]` : "";
      return `- [${post.title}](${siteConfig.url}/blog/${post.slug})${date ? ` (${date})` : ""}${tags}\n  ${post.description}`;
    })
    .join("\n");

  const content = `# ${siteConfig.name}

> ${siteConfig.description}

이 파일은 LLM·AI 검색엔진을 위한 사이트 요약입니다.
풀 텍스트가 필요하면 [llms-full.txt](${siteConfig.url}/llms-full.txt)를 참고하세요.

## 저자 정보

- 이름: ${profile.name} (${profile.nameEn})
- 역할: ${profile.role}
- 소개: ${profile.bio}
- 전문 분야: ${profile.skills.join(", ")}

## 사이트 구조

- [홈](${siteConfig.url}): 메인 페이지
- [블로그](${siteConfig.url}/blog): 기술 블로그 글 목록
- [소개](${siteConfig.url}/about): 저자 소개 및 이력
- [RSS 피드](${siteConfig.url}/feed.xml): RSS 2.0 피드
- [llms-full.txt](${siteConfig.url}/llms-full.txt): 모든 글 본문 풀 텍스트

## 블로그 글 목록 (총 ${posts.length}개, 최신순)

${postLines}
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
