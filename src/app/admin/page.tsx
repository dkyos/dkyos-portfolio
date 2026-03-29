import Link from "next/link";
import { Plus } from "lucide-react";
import { createAuthClient } from "@/lib/supabase/auth-server";

export default async function AdminDashboardPage() {
  const supabase = await createAuthClient();

  const { count: totalPosts } = await supabase
    .from("posts")
    .select("*", { count: "exact", head: true });

  const { count: publishedPosts } = await supabase
    .from("posts")
    .select("*", { count: "exact", head: true })
    .eq("published", true);

  const { count: draftPosts } = await supabase
    .from("posts")
    .select("*", { count: "exact", head: true })
    .eq("published", false);

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          대시보드
        </h1>
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          <Plus size={16} />
          새 글 작성
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <StatCard label="전체 글" count={totalPosts ?? 0} />
        <StatCard label="공개" count={publishedPosts ?? 0} />
        <StatCard label="임시저장" count={draftPosts ?? 0} />
      </div>
    </div>
  );
}

function StatCard({ label, count }: { label: string; count: number }) {
  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-800">
      <p className="text-sm text-zinc-500 dark:text-zinc-400">{label}</p>
      <p className="mt-1 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
        {count}
      </p>
    </div>
  );
}
