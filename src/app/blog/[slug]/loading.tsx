import { Skeleton } from "@/components/ui/Skeleton";

export default function BlogPostLoading() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Skeleton className="mb-8 h-5 w-36" />
      <div className="mb-10 border-b border-border pb-8">
        <Skeleton className="mb-3 h-9 w-full" />
        <Skeleton className="mb-4 h-5 w-48" />
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
      </div>
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-32 w-full rounded-lg" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}
