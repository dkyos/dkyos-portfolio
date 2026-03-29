import Link from "next/link";
import type { Post } from "@/lib/supabase/types";
import { formatDate } from "@/lib/format";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
      <Link href={`/blog/${post.slug}`} className="block">
        <h3 className="text-lg font-semibold text-card-foreground transition-colors group-hover:text-primary">
          {post.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {post.description}
        </p>
        <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
          {post.published_at && (
            <>
              <time dateTime={post.published_at}>
                {formatDate(post.published_at)}
              </time>
            </>
          )}
          {post.tags.length > 0 && (
            <>
              {post.published_at && <span>&middot;</span>}
              <div className="flex gap-1.5">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-secondary px-2 py-0.5 text-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </Link>
    </article>
  );
}
