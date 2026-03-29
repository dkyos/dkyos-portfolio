import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Pencil } from "lucide-react";
import { createAuthClient } from "@/lib/supabase/auth-server";
import { PostContent } from "@/components/blog/PostContent";
import { calculateReadingTime } from "@/lib/posts";
import { formatDate } from "@/lib/format";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PreviewPostPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createAuthClient();

  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (!post) notFound();

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/admin/posts"
          className="inline-flex items-center gap-1 text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          <ArrowLeft size={14} />
          글 목록
        </Link>
        <div className="flex items-center gap-3">
          {!post.published && (
            <span className="rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
              임시저장
            </span>
          )}
          <Link
            href={`/admin/posts/${post.id}/edit`}
            className="inline-flex items-center gap-1 rounded-md border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            <Pencil size={14} />
            수정
          </Link>
        </div>
      </div>

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
          {post.tags && post.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
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
    </div>
  );
}
