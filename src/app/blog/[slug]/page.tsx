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

  const ogImageUrl = `${siteConfig.url}/api/og?title=${encodeURIComponent(post.title)}`;

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `${siteConfig.url}/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.published_at ?? undefined,
      authors: [siteConfig.author.name],
      locale: siteConfig.locale,
      images: [{ url: ogImageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImageUrl],
    },
    other: {
      // GEO: AI 검색엔진 인용 최적화
      "citation_title": post.title,
      "citation_author": siteConfig.author.name,
      "citation_publication_date": post.published_at ?? "",
      "citation_language": siteConfig.language,
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
  const ogImageUrl = `${siteConfig.url}/api/og?title=${encodeURIComponent(post.title)}`;

  // GEO: 본문 단어 수 — 한글은 공백 기준이 어색하므로 글자 수도 같이 기록
  const wordCount = post.content
    .replace(/```[\s\S]*?```/g, "") // 코드 블록 제외
    .split(/\s+/)
    .filter(Boolean).length;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
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

      {/* 소셜 공유 */}
      <div className="mt-16">
        <ShareSection
          url={`${siteConfig.url}/blog/${post.slug}`}
          title={post.title}
          variant="card"
        />
      </div>

      {/* 관련 글 */}
      <RelatedPosts posts={relatedPosts} />

      <JsonLdScript data={jsonLd} />
      <JsonLdScript data={breadcrumbJsonLd} />
      {faqJsonLd && <JsonLdScript data={faqJsonLd} />}
    </div>
  );
}

