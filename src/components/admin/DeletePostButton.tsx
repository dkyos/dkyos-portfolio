"use client";

import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { createAuthBrowserClient } from "@/lib/supabase/auth-client";

interface DeletePostButtonProps {
  postId: string;
  title: string;
}

export function DeletePostButton({ postId, title }: DeletePostButtonProps) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm(`"${title}" 글을 삭제하시겠습니까?`)) return;

    const supabase = createAuthBrowserClient();
    const { error } = await supabase.from("posts").delete().eq("id", postId);

    if (error) {
      alert("삭제에 실패했습니다: " + error.message);
      return;
    }

    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      className="rounded p-1 text-zinc-500 transition-colors hover:text-red-600 dark:text-zinc-400 dark:hover:text-red-400"
      title="삭제"
    >
      <Trash2 size={16} />
    </button>
  );
}
