"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import { TagBadge } from "./TagBadge";

interface TagItem {
  name: string;
  count: number;
}

interface TagFilterProps {
  tags: TagItem[];
  activeTag?: string;
  totalCount: number;
}

const INITIAL_VISIBLE = 8;

export function TagFilter({ tags, activeTag, totalCount }: TagFilterProps) {
  const [expanded, setExpanded] = useState(false);

  if (tags.length === 0) return null;

  const hasMore = tags.length > INITIAL_VISIBLE;
  // 활성 태그가 INITIAL_VISIBLE 바깥에 있으면 항상 펼친 상태로 보여 줌
  const activeIsHidden =
    !!activeTag &&
    tags.findIndex((t) => t.name === activeTag) >= INITIAL_VISIBLE;
  const showAll = expanded || activeIsHidden;
  const visibleTags = showAll ? tags : tags.slice(0, INITIAL_VISIBLE);
  const hiddenCount = tags.length - INITIAL_VISIBLE;

  return (
    <div className="mb-8 flex flex-wrap items-center gap-2">
      {/* 전체 (선택 없음) */}
      <Link
        href="/blog"
        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors ${
          !activeTag
            ? "bg-foreground text-background"
            : "bg-secondary text-secondary-foreground hover:bg-foreground/10"
        }`}
      >
        전체
        <span
          className={
            !activeTag ? "text-background/70" : "text-muted-foreground"
          }
        >
          {totalCount}
        </span>
      </Link>

      {visibleTags.map((t) => (
        <TagBadge
          key={t.name}
          tag={t.name}
          active={t.name === activeTag}
          count={t.count}
        />
      ))}

      {hasMore && !activeIsHidden && (
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-foreground/10"
        >
          {expanded ? (
            <>
              <ChevronUp size={12} />
              접기
            </>
          ) : (
            <>
              <ChevronDown size={12} />
              더보기 +{hiddenCount}
            </>
          )}
        </button>
      )}
    </div>
  );
}
