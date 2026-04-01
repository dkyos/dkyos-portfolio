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
      <section className="py-24">
        <p className="mb-3 text-sm font-medium text-muted-foreground">
          안녕하세요, 저는
        </p>
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground">
          {siteConfig.author.name}
          <span className="text-muted-foreground">입니다.</span>
        </h1>
        <p className="mb-8 max-w-lg text-lg leading-relaxed text-muted-foreground">
          소프트웨어 개발자로서 다양한 기술 경험과 인사이트를 공유합니다. 웹
          기술, AI, 그리고 소프트웨어 엔지니어링에 관심이 많습니다.
        </p>
        <div className="flex gap-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            블로그 보기
            <ArrowRight size={16} />
          </Link>
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
    </div>
  );
}
