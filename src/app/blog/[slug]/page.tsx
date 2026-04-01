import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getPostBySlug, getAllSlugs, getRelatedPosts, calculateReadingTime } from "@/lib/posts";
import { formatDate } from "@/lib/format";
import { PostContent } from "@/components/blog/PostContent";
import { ShareButton } from "@/components/blog/ShareButton";
import { TagBadge } from "@/components/blog/TagBadge";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { extractFaqFromMarkdown, buildFaqJsonLd } from "@/lib/faq-extractor";
import { siteConfig } from "@/lib/constants";

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
      url: siteConfig.url,
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
    ...(post.tags.length > 0 && { keywords: post.tags.join(", ") }),
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
      <Link
        href="/blog"
        className="-ml-2 mb-8 inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
      >
        <ArrowLeft size={14} />
        블로그로 돌아가기
      </Link>

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
      <div className="mt-16 rounded-xl border border-border bg-card p-6 shadow-sm">
        <p className="mb-3 text-sm font-medium text-card-foreground">
          공유하기
        </p>
        <div className="flex gap-3">
          <ShareButton
            platform="LinkedIn"
            url={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${siteConfig.url}/blog/${post.slug}`)}`}
          />
          <ShareButton
            platform="Facebook"
            url={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${siteConfig.url}/blog/${post.slug}`)}`}
          />
        </div>
      </div>

      {/* 관련 글 */}
      <RelatedPosts posts={relatedPosts} />

      <JsonLdScript data={jsonLd} />
      <JsonLdScript data={breadcrumbJsonLd} />
      {faqJsonLd && <JsonLdScript data={faqJsonLd} />}
    </div>
  );
}

