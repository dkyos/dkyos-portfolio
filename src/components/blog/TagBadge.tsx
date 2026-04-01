import Link from "next/link";

interface TagBadgeProps {
  tag: string;
  /** true이면 현재 선택된 태그 스타일 */
  active?: boolean;
}

export function TagBadge({ tag, active }: TagBadgeProps) {
  return (
    <Link
      href={`/blog?tag=${encodeURIComponent(tag)}`}
      className={`rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors ${
        active
          ? "bg-foreground text-background"
          : "bg-secondary text-secondary-foreground hover:bg-foreground/10"
      }`}
    >
      {tag}
    </Link>
  );
}
