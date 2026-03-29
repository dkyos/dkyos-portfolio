"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, Eye, Send, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { createAuthBrowserClient } from "@/lib/supabase/auth-client";
import { PostContent } from "@/components/blog/PostContent";

interface PostEditorProps {
  initialData?: {
    id: string;
    slug: string;
    title: string;
    description: string;
    content: string;
    tags: string[];
    category: string;
    published: boolean;
  };
}

export function PostEditor({ initialData }: PostEditorProps) {
  const router = useRouter();
  const isEditing = !!initialData;

  const [title, setTitle] = useState(initialData?.title ?? "");
  const [slug, setSlug] = useState(initialData?.slug ?? "");
  const [description, setDescription] = useState(
    initialData?.description ?? ""
  );
  const [content, setContent] = useState(initialData?.content ?? "");
  const [tags, setTags] = useState(initialData?.tags?.join(", ") ?? "");
  const [category, setCategory] = useState(initialData?.category ?? "");
  const [showPreview, setShowPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [message, setMessage] = useState("");

  // 제목으로 슬러그 자동 생성 (새 글일 때만)
  useEffect(() => {
    if (!isEditing && title) {
      const generated = title
        .toLowerCase()
        .replace(/[^a-z0-9가-힣\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
      setSlug(generated);
    }
  }, [title, isEditing]);

  const savePost = useCallback(
    async (published: boolean) => {
      if (!title.trim()) {
        setMessage("제목을 입력해주세요.");
        return;
      }
      if (!slug.trim()) {
        setMessage("슬러그를 입력해주세요.");
        return;
      }

      const isSave = !published;
      if (isSave) setSaving(true);
      else setPublishing(true);
      setMessage("");

      const supabase = createAuthBrowserClient();

      // 공개 시에도 저장 먼저 수행 (자동 저장 후 공개)
      const postData = {
        slug: slug.trim(),
        title: title.trim(),
        description: description.trim(),
        content,
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        category: category.trim(),
        published,
        ...(published && !initialData?.published
          ? { published_at: new Date().toISOString() }
          : {}),
      };

      if (isEditing && initialData) {
        const { error } = await supabase
          .from("posts")
          .update(postData)
          .eq("id", initialData.id);

        if (error) {
          setMessage(`저장 실패: ${error.message}`);
        } else {
          setMessage(published ? "저장 후 공개되었습니다." : "저장되었습니다.");
          router.refresh();
        }
      } else {
        const { data: newPost, error } = await supabase
          .from("posts")
          .insert(postData)
          .select("id")
          .single();

        if (error) {
          setMessage(`저장 실패: ${error.message}`);
        } else {
          setMessage(published ? "저장 후 공개되었습니다." : "저장되었습니다.");
          if (newPost) {
            router.push(`/admin/posts/${newPost.id}/edit`);
          }
          router.refresh();
        }
      }

      setSaving(false);
      setPublishing(false);
    },
    [
      title,
      slug,
      description,
      content,
      tags,
      category,
      isEditing,
      initialData,
      router,
    ]
  );

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      {/* 상단 바 */}
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
            onClick={() => setShowPreview(!showPreview)}
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
            onClick={() => savePost(false)}
            disabled={saving}
            className="inline-flex items-center gap-1.5 rounded-md border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            저장
          </button>
          <button
            onClick={() => savePost(true)}
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

      {/* 메타데이터 입력 */}
      <div className="grid grid-cols-2 gap-3 border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
        <div className="col-span-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="글 제목"
            className="w-full bg-transparent text-xl font-bold text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-100"
          />
        </div>
        <div>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="slug (URL 경로)"
            className="w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1.5 text-sm text-zinc-700 outline-none focus:border-zinc-400 dark:border-zinc-800 dark:text-zinc-300"
          />
        </div>
        <div>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="태그 (쉼표 구분)"
            className="w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1.5 text-sm text-zinc-700 outline-none focus:border-zinc-400 dark:border-zinc-800 dark:text-zinc-300"
          />
        </div>
        <div className="col-span-2">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="글 요약 (SEO 설명)"
            className="w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1.5 text-sm text-zinc-700 outline-none focus:border-zinc-400 dark:border-zinc-800 dark:text-zinc-300"
          />
        </div>
      </div>

      {/* 에디터 + 미리보기 */}
      <div className="flex flex-1 overflow-hidden">
        {/* 마크다운 에디터 */}
        <div
          className={`flex-1 ${showPreview ? "border-r border-zinc-200 dark:border-zinc-800" : ""}`}
        >
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="마크다운으로 글을 작성하세요..."
            className="h-full w-full resize-none bg-transparent p-4 font-mono text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-100"
            spellCheck={false}
          />
        </div>

        {/* 미리보기 패널 */}
        {showPreview && (
          <div className="flex-1 overflow-y-auto p-6">
            {content ? (
              <PostContent content={content} />
            ) : (
              <p className="text-sm text-zinc-400">
                왼쪽에 마크다운을 입력하면 미리보기가 표시됩니다.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
