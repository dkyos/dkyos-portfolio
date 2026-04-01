"use client";

import { Save, Eye, Send, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

interface EditorToolbarProps {
  isEditing: boolean;
  showPreview: boolean;
  saving: boolean;
  publishing: boolean;
  message: string;
  onTogglePreview: () => void;
  onSave: () => void;
  onPublish: () => void;
}

export function EditorToolbar({
  isEditing,
  showPreview,
  saving,
  publishing,
  message,
  onTogglePreview,
  onSave,
  onPublish,
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
          disabled={saving}
          className="inline-flex items-center gap-1.5 rounded-md border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          저장
        </button>
        <button
          onClick={onPublish}
          disabled={publishing}
          className="inline-flex items-center gap-1.5 rounded-md bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          {publishing ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Send size={14} />
          )}
          공개
        </button>
      </div>
    </div>
  );
}
