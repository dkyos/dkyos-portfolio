"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { togglePublish } from "@/app/admin/actions";
import { ConfirmModal } from "@/components/ui/ConfirmModal";

interface TogglePublishButtonProps {
  postId: string;
  published: boolean;
}

export function TogglePublishButton({
  postId,
  published,
}: TogglePublishButtonProps) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  async function handleToggle() {
    setShowModal(false);
    setError("");
    const result = await togglePublish(postId, published);

    if (!result.success) {
      setError(result.error ?? "상태 변경에 실패했습니다.");
      return;
    }

    router.refresh();
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors ${
          published
            ? "text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/20"
            : "text-muted-foreground hover:bg-accent"
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

      {error && (
        <span className="text-xs text-destructive">{error}</span>
      )}

      <ConfirmModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleToggle}
        title={published ? "비공개로 전환" : "공개로 전환"}
        description={
          published
            ? "이 글을 비공개로 전환하면 블로그에서 더 이상 보이지 않습니다."
            : "이 글을 공개하면 블로그에서 모든 방문자가 볼 수 있습니다."
        }
        confirmText={published ? "비공개 전환" : "공개 전환"}
      />
    </>
  );
}
