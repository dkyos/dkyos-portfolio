import { Briefcase, GraduationCap } from "lucide-react";
import type { TimelineItem } from "@/data/timeline";

interface TimelineProps {
  items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      {/* 세로 라인 */}
      <div className="absolute left-4 top-0 h-full w-px bg-zinc-200 dark:bg-zinc-800" />

      <div className="space-y-8">
        {items.map((item, index) => (
          <div key={index} className="relative pl-12">
            {/* 아이콘 */}
            <div className="absolute left-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
              {item.type === "work" ? (
                <Briefcase size={14} className="text-zinc-600 dark:text-zinc-400" />
              ) : (
                <GraduationCap size={14} className="text-zinc-600 dark:text-zinc-400" />
              )}
            </div>

            {/* 내용 */}
            <div>
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-500">
                {item.period}
              </span>
              <h3 className="mt-1 text-base font-semibold text-zinc-900 dark:text-zinc-100">
                {item.title}
              </h3>
              <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                {item.organization}
              </p>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
