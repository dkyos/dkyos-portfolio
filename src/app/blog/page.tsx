import type { Metadata } from "next";
import Link from "next/link";
import { X } from "lucide-react";
import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/blog/PostCard";
import { TagBadge } from "@/components/blog/TagBadge";

export const metadata: Metadata = {
  title: "블로그",
  description:
    "소프트웨어 개발, 웹 기술, AI 등 다양한 기술 주제에 대한 글을 공유합니다.",
};

export const revalidate = 60;

interface PageProps {
  searchParams: Promise<{ tag?: string }>;
}

export default async function BlogPage({ searchParams }: PageProps) {
  const { tag } = await searchParams;
  const allPosts = await getAllPosts();

  // 전체 태그 목록 (빈도순 정렬)
  const tagCounts = new Map<string, number>();
  for (const post of allPosts) {
    for (const t of post.tags) {
      tagCounts.set(t, (tagCounts.get(t) || 0) + 1);
    }
  }
  const allTags = [...tagCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([t]) => t);

  // 태그 필터링
  const posts = tag
    ? allPosts.filter((post) => post.tags.includes(tag))
    : allPosts;

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">
        블로그
      </h1>
      <p className="mb-6 text-muted-foreground">
        기술과 개발에 대한 생각을 기록합니다.
      </p>

      {/* 태그 필터 */}
      {allTags.length > 0 && (
        <div className="mb-8 flex flex-wrap items-center gap-2">
          {tag && (
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-foreground/10"
            >
              <X size={12} />
              초기화
            </Link>
          )}
          {allTags.map((t) => (
            <TagBadge key={t} tag={t} active={t === tag} />
          ))}
        </div>
      )}

      {/* 필터 결과 안내 */}
      {tag && (
        <p className="mb-4 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{tag}</span> 태그의 글
          {posts.length}개
        </p>
      )}

      {posts.length === 0 ? (
        <p className="text-muted-foreground">
          {tag
            ? `"${tag}" 태그의 글이 없습니다.`
            : "아직 작성된 글이 없습니다."}
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
