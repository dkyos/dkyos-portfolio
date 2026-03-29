import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/constants";
import { getRecentPosts } from "@/lib/posts";
import { PostCard } from "@/components/blog/PostCard";

export const revalidate = 60;

export default async function Home() {
  const recentPosts = await getRecentPosts(5);

  return (
    <div className="mx-auto max-w-3xl px-6">
      {/* 히어로 섹션 */}
      <section className="py-20">
        <p className="mb-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
          안녕하세요, 저는
        </p>
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          {siteConfig.author.name}
          <span className="text-zinc-400 dark:text-zinc-600">입니다.</span>
        </h1>
        <p className="mb-8 max-w-lg text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          소프트웨어 개발자로서 다양한 기술 경험과 인사이트를 공유합니다. 웹
          기술, AI, 그리고 소프트웨어 엔지니어링에 관심이 많습니다.
        </p>
        <div className="flex gap-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            블로그 보기
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            소개
          </Link>
        </div>
      </section>

      {/* 최근 글 섹션 */}
      <section className="border-t border-zinc-200 py-12 dark:border-zinc-800">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            최근 글
          </h2>
          <Link
            href="/blog"
            className="text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            전체 보기 &rarr;
          </Link>
        </div>
        {recentPosts.length === 0 ? (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            아직 작성된 글이 없습니다. 곧 기술 블로그 글을 올릴 예정입니다.
          </p>
        ) : (
          <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {recentPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
