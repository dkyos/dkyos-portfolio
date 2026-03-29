import Link from "next/link";
import type { Post } from "@/lib/supabase/types";
import { formatDate } from "@/lib/format";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group">
      <Link href={`/blog/${post.slug}`} className="block py-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-zinc-900 transition-colors group-hover:text-zinc-600 dark:text-zinc-100 dark:group-hover:text-zinc-300">
            {post.title}
          </h3>
          <p className="line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
            {post.description}
          </p>
          <div className="mt-2 flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-500">
            {post.published_at && (
              <>
                <time dateTime={post.published_at}>
                  {formatDate(post.published_at)}
                </time>
                <span>&middot;</span>
              </>
            )}
            {post.tags.length > 0 && (
              <>
                <div className="flex gap-1">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-zinc-100 px-1.5 py-0.5 dark:bg-zinc-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
