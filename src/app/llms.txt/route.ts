import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/constants";
import { profile } from "@/data/profile";

export async function GET() {
  const posts = await getAllPosts();

  const postList = posts
    .map(
      (post) =>
        `- [${post.title}](${siteConfig.url}/blog/${post.slug}): ${post.description}`
    )
    .join("\n");

  const content = `# ${siteConfig.name}

> ${siteConfig.description}

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

## 블로그 글 목록

${postList}
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
