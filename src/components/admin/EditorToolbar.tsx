"use client";

import { Save, Eye, EyeOff, Send, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

interface EditorToolbarProps {
  isEditing: boolean;
  showPreview: boolean;
  saving: boolean;
  publishing: boolean;
  published: boolean;
  message: string;
  onTogglePreview: () => void;
  onSave: () => void;
  onTogglePublish: () => void;
}

export function EditorToolbar({
  isEditing,
  showPreview,
  saving,
  publishing,
  published,
  message,
  onTogglePreview,
  onSave,
  onTogglePublish,
}: EditorToolbarProps) {
  return (
    <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/posts"
          className="text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          {isEditing ? "글 수정" : "새 글 작성"}
        </h1>
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
            published
              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
              : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
          }`}
          title={published ? "현재 공개 상태" : "현재 비공개 상태"}
        >
          {published ? <Eye size={12} /> : <EyeOff size={12} />}
          {published ? "공개됨" : "비공개"}
        </span>
      </div>

      <div className="flex items-center gap-2">
        {message && (
          <span className="mr-2 text-sm text-zinc-600 dark:text-zinc-400">
            {message}
          </span>
        )}
        <button
          onClick={onTogglePreview}
          className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${
            showPreview
              ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
              : "border-zinc-300 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          }`}
        >
          <Eye size={14} />
          미리보기
        </button>
        <button
          onClick={onSave}
          disabled={saving || publishing}
          className="inline-flex items-center gap-1.5 rounded-md border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          title="현재 공개 상태를 유지한 채 저장"
        >
          {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          저장
        </button>
        <button
          onClick={onTogglePublish}
          disabled={saving || publishing}
          className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors disabled:opacity-50 ${
            published
              ? "border border-zinc-300 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
              : "bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          }`}
          title={published ? "비공개로 전환" : "공개로 전환"}
        >
          {publishing ? (
            <Loader2 size={14} className="animate-spin" />
          ) : published ? (
            <EyeOff size={14} />
          ) : (
            <Send size={14} />
          )}
          {published ? "비공개로 전환" : "공개"}
        </button>
      </div>
    </div>
  );
}
