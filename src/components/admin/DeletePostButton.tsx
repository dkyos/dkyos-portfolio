"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { createAuthBrowserClient } from "@/lib/supabase/auth-client";
import { ConfirmModal } from "@/components/ui/ConfirmModal";

interface DeletePostButtonProps {
  postId: string;
  title: string;
}

export function DeletePostButton({ postId, title }: DeletePostButtonProps) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  async function handleDelete() {
    setShowModal(false);
    const supabase = createAuthBrowserClient();
    const { error } = await supabase.from("posts").delete().eq("id", postId);

    if (error) {
      alert("삭제에 실패했습니다: " + error.message);
      return;
    }

    router.refresh();
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="rounded p-1 text-muted-foreground hover:text-destructive"
        title="삭제"
      >
        <Trash2 size={16} />
      </button>

      <ConfirmModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
        title="글 삭제"
        description={`"${title}" 글을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`}
        confirmText="삭제"
        variant="destructive"
      />
    </>
  );
}
