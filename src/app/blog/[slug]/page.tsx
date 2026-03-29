import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getPostBySlug, getAllSlugs, calculateReadingTime } from "@/lib/posts";
import { formatDate } from "@/lib/format";
import { PostContent } from "@/components/blog/PostContent";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
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
  };
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

// ISR: 60초마다 재검증
export const revalidate = 60;

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.author.name,
    },
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center gap-1 text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        <ArrowLeft size={14} />
        블로그로 돌아가기
      </Link>

      <article>
        <header className="mb-8">
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            {post.title}
          </h1>
          <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
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
            <div className="mt-3 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-zinc-100 px-2 py-1 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <PostContent content={post.content} />
      </article>

      {/* 소셜 공유 버튼 */}
      <div className="mt-12 border-t border-zinc-200 pt-6 dark:border-zinc-800">
        <p className="mb-3 text-sm font-medium text-zinc-700 dark:text-zinc-300">
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

      <JsonLdScript data={jsonLd} />
    </div>
  );
}

function ShareButton({ platform, url }: { platform: string; url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-md border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
    >
      {platform}
    </a>
  );
}
