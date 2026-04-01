import Link from "next/link";
import type { Post } from "@/lib/supabase/types";
import { formatDate } from "@/lib/format";

interface RelatedPostsProps {
  posts: Post[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <nav aria-label="관련 글" className="mt-16 rounded-xl border border-border bg-card p-6 shadow-sm">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        관련 글
      </h2>
      <ul className="flex flex-col gap-3">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group block rounded-lg p-3 -mx-3 transition-colors hover:bg-accent"
            >
              <p className="font-medium text-card-foreground group-hover:text-primary">
                {post.title}
              </p>
              <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                {post.description}
              </p>
              {post.published_at && (
                <time
                  dateTime={post.published_at}
                  className="mt-1 block text-xs text-muted-foreground"
                >
                  {formatDate(post.published_at)}
                </time>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
