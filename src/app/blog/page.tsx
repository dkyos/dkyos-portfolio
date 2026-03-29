import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/blog/PostCard";

export const metadata: Metadata = {
  title: "블로그",
  description:
    "소프트웨어 개발, 웹 기술, AI 등 다양한 기술 주제에 대한 글을 공유합니다.",
};

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">
        블로그
      </h1>
      <p className="mb-8 text-muted-foreground">
        기술과 개발에 대한 생각을 기록합니다.
      </p>

      {posts.length === 0 ? (
        <p className="text-muted-foreground">아직 작성된 글이 없습니다.</p>
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
