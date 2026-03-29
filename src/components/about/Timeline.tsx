import { Briefcase, GraduationCap } from "lucide-react";
import type { TimelineItem } from "@/data/timeline";

interface TimelineProps {
  items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      {/* 세로 라인 */}
      <div className="absolute left-4 top-0 h-full w-px bg-border" />

      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={index} className="relative pl-12">
            {/* 아이콘 */}
            <div className="absolute left-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-border bg-card shadow-sm">
              {item.type === "work" ? (
                <Briefcase size={14} className="text-foreground" />
              ) : (
                <GraduationCap size={14} className="text-muted-foreground" />
              )}
            </div>

            {/* 카드 */}
            <div
              className={`rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:shadow-md ${
                item.type === "work"
                  ? "border-l-2 border-l-foreground"
                  : "border-l-2 border-l-muted-foreground/30"
              }`}
            >
              <span className="text-xs font-medium text-muted-foreground">
                {item.period}
              </span>
              <h3 className="mt-1 text-base font-semibold text-card-foreground">
                {item.title}
              </h3>
              {item.organization && (
                <p className="text-sm font-medium text-muted-foreground">
                  {item.organization}
                </p>
              )}
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
