import Link from "next/link";
import { Plus, Pencil, Eye, EyeOff } from "lucide-react";
import { createAuthClient } from "@/lib/supabase/auth-server";
import { formatDate } from "@/lib/format";
import { DeletePostButton } from "@/components/admin/DeletePostButton";

export default async function AdminPostsPage() {
  const supabase = await createAuthClient();

  const { data: posts } = await supabase
    .from("posts")
    .select("id, slug, title, published, published_at, created_at, updated_at")
    .order("updated_at", { ascending: false });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          글 관리
        </h1>
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          <Plus size={16} />
          새 글 작성
        </Link>
      </div>

      {!posts || posts.length === 0 ? (
        <p className="text-zinc-500 dark:text-zinc-400">
          작성된 글이 없습니다.
        </p>
      ) : (
        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
                <th className="px-4 py-3 text-left font-medium text-zinc-600 dark:text-zinc-400">
                  제목
                </th>
                <th className="px-4 py-3 text-left font-medium text-zinc-600 dark:text-zinc-400">
                  상태
                </th>
                <th className="px-4 py-3 text-left font-medium text-zinc-600 dark:text-zinc-400">
                  수정일
                </th>
                <th className="px-4 py-3 text-right font-medium text-zinc-600 dark:text-zinc-400">
                  작업
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {posts.map((post) => (
                <tr key={post.id}>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/posts/${post.id}/edit`}
                      className="font-medium text-zinc-900 hover:underline dark:text-zinc-100"
                    >
                      {post.title || "(제목 없음)"}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    {post.published ? (
                      <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400">
                        <Eye size={14} /> 공개
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
                        <EyeOff size={14} /> 임시저장
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-zinc-500 dark:text-zinc-400">
                    {formatDate(post.updated_at)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="rounded p-1 text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                        title="수정"
                      >
                        <Pencil size={16} />
                      </Link>
                      <Link
                        href={
                          post.published
                            ? `/blog/${post.slug}`
                            : `/admin/posts/${post.id}/preview`
                        }
                        target={post.published ? "_blank" : undefined}
                        className="rounded p-1 text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                        title={post.published ? "보기" : "미리보기"}
                      >
                        <Eye size={16} />
                      </Link>
                      <DeletePostButton postId={post.id} title={post.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
