import { Skeleton } from "@/components/ui/Skeleton";

export default function BlogLoading() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Skeleton className="mb-2 h-9 w-24" />
      <Skeleton className="mb-8 h-5 w-64" />
      <div className="flex flex-col gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-border bg-card p-5 shadow-sm"
          >
            <Skeleton className="mb-2 h-6 w-3/4" />
            <Skeleton className="mb-3 h-4 w-full" />
            <div className="flex gap-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16 rounded-full" />
              <Skeleton className="h-4 w-16 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
