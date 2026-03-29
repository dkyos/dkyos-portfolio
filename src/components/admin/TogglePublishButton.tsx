"use client";

import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { createAuthBrowserClient } from "@/lib/supabase/auth-client";

interface TogglePublishButtonProps {
  postId: string;
  published: boolean;
}

export function TogglePublishButton({
  postId,
  published,
}: TogglePublishButtonProps) {
  const router = useRouter();

  async function handleToggle() {
    const action = published ? "비공개" : "공개";
    if (!confirm(`이 글을 ${action}로 전환하시겠습니까?`)) return;

    const supabase = createAuthBrowserClient();
    const updateData: Record<string, unknown> = { published: !published };

    if (!published) {
      updateData.published_at = new Date().toISOString();
    }

    const { error } = await supabase
      .from("posts")
      .update(updateData)
      .eq("id", postId);

    if (error) {
      alert("상태 변경 실패: " + error.message);
      return;
    }

    router.refresh();
  }

  return (
    <button
      onClick={handleToggle}
      className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors ${
        published
          ? "text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/20"
          : "text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
      }`}
      title={published ? "비공개로 전환" : "공개로 전환"}
    >
      {published ? (
        <>
          <Eye size={14} /> 공개
        </>
      ) : (
        <>
          <EyeOff size={14} /> 비공개
        </>
      )}
    </button>
  );
}
