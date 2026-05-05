import Link from "next/link";

interface TagBadgeProps {
  tag: string;
  /** true이면 현재 선택된 태그 스타일 */
  active?: boolean;
  /** 해당 태그의 글 개수 (있으면 옆에 표시) */
  count?: number;
}

export function TagBadge({ tag, active, count }: TagBadgeProps) {
  return (
    <Link
      href={`/blog?tag=${encodeURIComponent(tag)}`}
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors ${
        active
          ? "bg-foreground text-background"
          : "bg-secondary text-secondary-foreground hover:bg-foreground/10"
      }`}
    >
      {tag}
      {count !== undefined && (
        <span
          className={
            active ? "text-background/70" : "text-muted-foreground"
          }
        >
          {count}
        </span>
      )}
    </Link>
  );
}
