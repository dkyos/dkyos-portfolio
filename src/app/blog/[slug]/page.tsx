import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllSlugs, getRelatedPosts, calculateReadingTime } from "@/lib/posts";
import { formatDate } from "@/lib/format";
import { PostContent } from "@/components/blog/PostContent";
import { ShareSection } from "@/components/share/ShareSection";
import { TagBadge } from "@/components/blog/TagBadge";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { Breadcrumb } from "@/components/blog/Breadcrumb";
import { extractFaqFromMarkdown, buildFaqJsonLd } from "@/lib/faq-extractor";
import { resolveDescription } from "@/lib/summary";
import { siteConfig, authorSameAs } from "@/lib/constants";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  // description fallback: 비었거나 짧으면 본문에서 자동 추출
  const description = resolveDescription({
    description: post.description,
    content: post.content,
    fallback: siteConfig.description,
    minLength: 60,
    maxLength: 200,
  });

  // OG 이미지에 풍부한 메타 — 제목·요약·태그·날짜·읽는시간·섹션
  const readingTime = calculateReadingTime(post.content);
  const ogDate = post.published_at
    ? new Date(post.published_at).toISOString().slice(0, 10)
    : "";
  const ogParams = new URLSearchParams({
    title: post.title,
    desc: description.length > 160 ? description.slice(0, 157) + "…" : description,
    ...(post.tags.length > 0 && { tags: post.tags.slice(0, 4).join(",") }),
    ...(ogDate && { date: ogDate }),
    ...(readingTime && { reading: readingTime }),
    ...(post.category && { section: post.category }),
  });
  const ogImageUrl = `${siteConfig.url}/api/og?${ogParams.toString()}`;
  const url = `${siteConfig.url}/blog/${slug}`;

  return {
    title: post.title,
    description,
    keywords: post.tags,
    authors: [{ name: siteConfig.author.name, url: `${siteConfig.url}/about` }],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description,
      type: "article",
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      publishedTime: post.published_at ?? undefined,
      modifiedTime: post.updated_at ?? undefined,
      authors: [siteConfig.author.name],
      ...(post.category && { section: post.category }),
      ...(post.tags.length > 0 && { tags: [...post.tags] }),
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${post.title} — ${siteConfig.name}`,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [{ url: ogImageUrl, alt: post.title }],
      creator: siteConfig.author.name,
    },
    other: {
      // GEO: AI 검색엔진 인용 최적화
      "citation_title": post.title,
      "citation_author": siteConfig.author.name,
      "citation_publication_date": post.published_at ?? "",
      "citation_language": siteConfig.language,
      ...(post.category && { "article:section": post.category }),
      ...(post.tags.length > 0 && {
        "article:tag": post.tags.join(", "),
      }),
    },
  };
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export const revalidate = 60;

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.slug, post.tags);
  const faqJsonLd = buildFaqJsonLd(extractFaqFromMarkdown(post.content));

  // generateMetadata와 동일한 풍부 OG URL — JSON-LD의 image 일치
  const description = resolveDescription({
    description: post.description,
    content: post.content,
    fallback: siteConfig.description,
    minLength: 60,
    maxLength: 200,
  });
  const readingTime = calculateReadingTime(post.content);
  const ogDate = post.published_at
    ? new Date(post.published_at).toISOString().slice(0, 10)
    : "";
  const ogImageParams = new URLSearchParams({
    title: post.title,
    desc: description.length > 160 ? description.slice(0, 157) + "…" : description,
    ...(post.tags.length > 0 && { tags: post.tags.slice(0, 4).join(",") }),
    ...(ogDate && { date: ogDate }),
    ...(readingTime && { reading: readingTime }),
    ...(post.category && { section: post.category }),
  });
  const ogImageUrl = `${siteConfig.url}/api/og?${ogImageParams.toString()}`;

  // GEO: 본문 단어 수 — 한글은 공백 기준이 어색하므로 글자 수도 같이 기록
  const wordCount = post.content
    .replace(/```[\s\S]*?```/g, "") // 코드 블록 제외
    .split(/\s+/)
    .filter(Boolean).length;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description,
    image: post.cover_image || ogImageUrl,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    url: `${siteConfig.url}/blog/${post.slug}`,
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: `${siteConfig.url}/about`,
      ...(authorSameAs.length > 0 && { sameAs: authorSameAs }),
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${post.slug}`,
    },
    inLanguage: siteConfig.language,
    wordCount,
    ...(post.category && { articleSection: post.category }),
    ...(post.tags.length > 0 && { keywords: post.tags.join(", ") }),
    // 음성 검색 / Google Assistant 노출용 (제목과 첫 본문 단락)
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "article p:first-of-type"],
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "홈",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "블로그",
        item: `${siteConfig.url}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${siteConfig.url}/blog/${post.slug}`,
      },
    ],
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Breadcrumb
        items={[
          { label: "홈", href: "/" },
          { label: "블로그", href: "/blog" },
          { label: post.title },
        ]}
      />

      <article>
        <header className="mb-10 border-b border-border pb-8">
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {post.published_at && (
                <>
                  <time dateTime={post.published_at}>
                    {formatDate(post.published_at)}
                  </time>
                  <span>&middot;</span>
                </>
              )}
              <span>{calculateReadingTime(post.content)}</span>
            </div>
            <ShareSection
              url={`${siteConfig.url}/blog/${post.slug}`}
              title={post.title}
              variant="compact"
              label="이 글 공유하기"
            />
          </div>
          {post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <TagBadge key={tag} tag={tag} />
              ))}
            </div>
          )}
        </header>

        <PostContent content={post.content} />
      </article>

      {/* 관련 글 */}
      <RelatedPosts posts={relatedPosts} />

      <JsonLdScript data={jsonLd} />
      <JsonLdScript data={breadcrumbJsonLd} />
      {faqJsonLd && <JsonLdScript data={faqJsonLd} />}
    </div>
  );
}

