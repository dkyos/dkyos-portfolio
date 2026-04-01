import Link from "next/link";

export default function PostNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h2 className="mb-2 text-2xl font-bold">글을 찾을 수 없습니다</h2>
      <p className="mb-6 text-muted-foreground">
        요청하신 블로그 글이 존재하지 않거나 비공개 상태입니다.
      </p>
      <Link
        href="/blog"
        className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
      >
        블로그 목록으로
      </Link>
    </div>
  );
}
