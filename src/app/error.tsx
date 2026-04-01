"use client";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h2 className="mb-2 text-2xl font-bold">문제가 발생했습니다</h2>
      <p className="mb-6 text-muted-foreground">
        {error.message || "페이지를 불러오는 중 오류가 발생했습니다."}
      </p>
      <button
        onClick={unstable_retry}
        className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
      >
        다시 시도
      </button>
    </div>
  );
}
