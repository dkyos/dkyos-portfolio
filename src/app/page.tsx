import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/constants";
import { getRecentPosts } from "@/lib/posts";
import { PostCard } from "@/components/blog/PostCard";
import { ShareSection } from "@/components/share/ShareSection";
import { JsonLdScript } from "@/components/seo/JsonLdScript";

export const revalidate = 60;

const homeOgUrl = `${siteConfig.url}/api/og?${new URLSearchParams({
  title: "Build. Ship. Reflect.",
  desc: siteConfig.description,
  section: "Home",
}).toString()}`;

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    locale: siteConfig.locale,
    images: [
      {
        url: homeOgUrl,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — Build. Ship. Reflect.`,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [{ url: homeOgUrl, alt: siteConfig.name }],
    creator: siteConfig.author.name,
  },
};

export default async function Home() {
  const recentPosts = await getRecentPosts(5);

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
    inLanguage: siteConfig.language,
  };

  return (
    <div className="mx-auto max-w-3xl px-6">
      {/* 히어로 섹션 */}
      <section className="py-24">
        <h1 className="mb-4 text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
          Build.{" "}
          <span className="text-muted-foreground">Ship.</span>{" "}
          <span className="text-muted-foreground">Reflect.</span>
        </h1>
        <p className="mb-8 max-w-lg text-lg leading-relaxed text-muted-foreground">
          웹·AI·소프트웨어 엔지니어링에 대해
          매일 조금씩 더 잘하기 위한 기록.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            블로그 보기
            <ArrowRight size={16} />
          </Link>
          <ShareSection
            url={siteConfig.url}
            title={siteConfig.title}
            variant="compact"
            label="이 사이트 공유하기"
          />
        </div>
      </section>

      {/* 최근 글 섹션 */}
      <section className="border-t border-border py-16">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            최근 글
          </h2>
          <Link
            href="/blog"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            전체 보기 &rarr;
          </Link>
        </div>
        {recentPosts.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            아직 작성된 글이 없습니다. 곧 기술 블로그 글을 올릴 예정입니다.
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {recentPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>

      <JsonLdScript data={websiteJsonLd} />
    </div>
  );
}
