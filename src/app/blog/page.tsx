import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/blog/PostCard";
import { TagFilter } from "@/components/blog/TagFilter";
import { Pagination } from "@/components/blog/Pagination";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "블로그",
  description:
    "소프트웨어 개발, 웹 기술, AI 등 다양한 기술 주제에 대한 글을 공유합니다.",
  alternates: {
    canonical: "/blog",
  },
};

export const revalidate = 60;

const POSTS_PER_PAGE = 10;

interface PageProps {
  searchParams: Promise<{ tag?: string; page?: string }>;
}

export default async function BlogPage({ searchParams }: PageProps) {
  const { tag, page: pageParam } = await searchParams;
  const allPosts = await getAllPosts();

  // 전체 태그 목록 (빈도순 정렬, 카운트 포함)
  const tagCounts = new Map<string, number>();
  for (const post of allPosts) {
    for (const t of post.tags) {
      tagCounts.set(t, (tagCounts.get(t) || 0) + 1);
    }
  }
  const allTags = [...tagCounts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([name, count]) => ({ name, count }));

  // 태그 필터링
  const filteredPosts = tag
    ? allPosts.filter((post) => post.tags.includes(tag))
    : allPosts;

  // 페이지네이션
  const totalPages = Math.max(
    1,
    Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  );
  const parsedPage = pageParam ? Number(pageParam) : 1;
  const currentPage =
    Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  // 잘못된 페이지 번호: 첫 페이지 외에는 404로 (SEO 중복 방지)
  if (currentPage > totalPages && filteredPosts.length > 0) {
    notFound();
  }

  const startIdx = (currentPage - 1) * POSTS_PER_PAGE;
  const pagePosts = filteredPosts.slice(startIdx, startIdx + POSTS_PER_PAGE);

  const buildHref = (page: number) => {
    const params = new URLSearchParams();
    if (tag) params.set("tag", tag);
    if (page > 1) params.set("page", String(page));
    const qs = params.toString();
    return qs ? `/blog?${qs}` : "/blog";
  };

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "블로그",
    description:
      "소프트웨어 개발, 웹 기술, AI 등 다양한 기술 주제에 대한 글을 공유합니다.",
    url: `${siteConfig.url}/blog`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: allPosts.slice(0, 10).map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${siteConfig.url}/blog/${post.slug}`,
        name: post.title,
      })),
    },
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">
        블로그
      </h1>
      <p className="mb-6 text-muted-foreground">
        기술과 개발에 대한 생각을 기록합니다.
      </p>

      {/* 태그 필터 */}
      <TagFilter
        tags={allTags}
        activeTag={tag}
        totalCount={allPosts.length}
      />

      {/* 필터/페이지 결과 안내 */}
      {(tag || totalPages > 1) && filteredPosts.length > 0 && (
        <p className="mb-4 text-sm text-muted-foreground">
          {tag && (
            <>
              <span className="font-medium text-foreground">{tag}</span> 태그의 글{" "}
            </>
          )}
          총 {filteredPosts.length}개
          {totalPages > 1 && (
            <>
              {" · "}
              {currentPage} / {totalPages} 페이지
            </>
          )}
        </p>
      )}

      {filteredPosts.length === 0 ? (
        <p className="text-muted-foreground">
          {tag
            ? `"${tag}" 태그의 글이 없습니다.`
            : "아직 작성된 글이 없습니다."}
        </p>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {pagePosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            buildHref={buildHref}
          />
        </>
      )}

      <JsonLdScript data={collectionJsonLd} />
    </div>
  );
}
