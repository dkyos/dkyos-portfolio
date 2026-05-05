import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  /** 페이지 번호를 받아 해당 페이지 URL을 반환 */
  buildHref: (page: number) => string;
}

const SIBLING_COUNT = 1;

/**
 * 표시할 페이지 번호 시퀀스를 계산.
 * 항상 첫·마지막 페이지를 노출하고, 현재 페이지 ±SIBLING_COUNT를 노출.
 * 사이가 멀면 "..."(ellipsis) 자리표시자(0)를 끼움.
 */
function getPageItems(currentPage: number, totalPages: number): number[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const left = Math.max(2, currentPage - SIBLING_COUNT);
  const right = Math.min(totalPages - 1, currentPage + SIBLING_COUNT);

  const items: number[] = [1];
  if (left > 2) items.push(0); // ellipsis
  for (let i = left; i <= right; i++) items.push(i);
  if (right < totalPages - 1) items.push(0); // ellipsis
  items.push(totalPages);

  return items;
}

export function Pagination({
  currentPage,
  totalPages,
  buildHref,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const items = getPageItems(currentPage, totalPages);
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const baseClass =
    "inline-flex h-8 min-w-[2rem] items-center justify-center rounded-md px-2 text-sm font-medium transition-colors";
  const inactiveClass =
    "text-muted-foreground hover:bg-foreground/10 hover:text-foreground";
  const disabledClass = "pointer-events-none opacity-40";
  const activeClass = "bg-foreground text-background";

  return (
    <nav
      className="mt-10 flex items-center justify-center gap-1"
      aria-label="페이지 네비게이션"
    >
      {hasPrev ? (
        <Link
          href={buildHref(currentPage - 1)}
          aria-label="이전 페이지"
          className={`${baseClass} ${inactiveClass}`}
        >
          <ChevronLeft size={16} />
        </Link>
      ) : (
        <span
          aria-hidden
          className={`${baseClass} ${inactiveClass} ${disabledClass}`}
        >
          <ChevronLeft size={16} />
        </span>
      )}

      {items.map((p, idx) =>
        p === 0 ? (
          <span
            key={`ellipsis-${idx}`}
            aria-hidden
            className="px-1 text-sm text-muted-foreground"
          >
            …
          </span>
        ) : p === currentPage ? (
          <span
            key={p}
            aria-current="page"
            className={`${baseClass} ${activeClass}`}
          >
            {p}
          </span>
        ) : (
          <Link
            key={p}
            href={buildHref(p)}
            aria-label={`${p} 페이지`}
            className={`${baseClass} ${inactiveClass}`}
          >
            {p}
          </Link>
        )
      )}

      {hasNext ? (
        <Link
          href={buildHref(currentPage + 1)}
          aria-label="다음 페이지"
          className={`${baseClass} ${inactiveClass}`}
        >
          <ChevronRight size={16} />
        </Link>
      ) : (
        <span
          aria-hidden
          className={`${baseClass} ${inactiveClass} ${disabledClass}`}
        >
          <ChevronRight size={16} />
        </span>
      )}
    </nav>
  );
}
