import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/blog/PostCard";
import { TagFilter } from "@/components/blog/TagFilter";
import { Pagination } from "@/components/blog/Pagination";
import { ShareSection } from "@/components/share/ShareSection";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { siteConfig } from "@/lib/constants";

export const revalidate = 60;

const POSTS_PER_PAGE = 10;

interface PageProps {
  searchParams: Promise<{ tag?: string; page?: string }>;
}

/**
 * 페이지네이션·태그 필터링된 결과는 검색엔진 진입로로 적합하지 않다.
 * - tag 또는 page>1: noindex (중복 콘텐츠 방지)
 * - 기본 /blog: index, canonical=/blog
 */
export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const { tag, page: pageParam } = await searchParams;
  const page = pageParam ? Number(pageParam) : 1;
  const isFiltered = !!tag || (Number.isInteger(page) && page > 1);

  const title = tag ? `${tag} 태그` : "블로그";
  const description = tag
    ? `${tag} 태그가 달린 모든 글을 모았습니다. 웹·AI·소프트웨어 엔지니어링 관련 글들을 함께 둘러보세요.`
    : "웹·AI·소프트웨어 엔지니어링에 대해 매일 조금씩 더 잘하기 위한 기록. 시스템 설계 결정과 회고를 정리합니다.";

  const ogParams = new URLSearchParams({
    title: tag ? `#${tag}` : "블로그",
    desc: description,
    section: "Blog",
  });
  const ogImageUrl = `${siteConfig.url}/api/og?${ogParams.toString()}`;
  const url = tag ? `${siteConfig.url}/blog?tag=${encodeURIComponent(tag)}` : `${siteConfig.url}/blog`;

  return {
    title,
    description,
    alternates: {
      canonical: "/blog",
    },
    openGraph: {
      title,
      description,
      type: "website",
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${title} — ${siteConfig.name}`,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: ogImageUrl, alt: title }],
      creator: siteConfig.author.name,
    },
    ...(isFiltered && {
      robots: { index: false, follow: true },
    }),
  };
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
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">
            블로그
          </h1>
          <p className="text-muted-foreground">
            기술과 개발에 대한 생각을 기록합니다.
          </p>
        </div>
        <ShareSection
          url={`${siteConfig.url}/blog`}
          title={`${siteConfig.name} 블로그`}
          variant="compact"
          label="블로그 공유하기"
        />
      </div>

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
