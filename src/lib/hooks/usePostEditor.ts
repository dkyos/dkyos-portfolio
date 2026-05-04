"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createAuthBrowserClient } from "@/lib/supabase/auth-client";
import { revalidateAfterSave } from "@/app/admin/actions";

export interface PostFormData {
  id?: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
  category: string;
  published: boolean;
}

interface UsePostEditorOptions {
  initialData?: PostFormData;
}

export function usePostEditor({ initialData }: UsePostEditorOptions = {}) {
  const router = useRouter();
  const isEditing = !!initialData;

  const [title, setTitle] = useState(initialData?.title ?? "");
  const [slug, setSlug] = useState(initialData?.slug ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [content, setContent] = useState(initialData?.content ?? "");
  const [tags, setTags] = useState(initialData?.tags?.join(", ") ?? "");
  const [category, setCategory] = useState(initialData?.category ?? "");
  const [published, setPublished] = useState(initialData?.published ?? false);
  const [showPreview, setShowPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [message, setMessage] = useState("");

  // 제목 변경 시 슬러그 자동 생성 (새 글일 때만)
  function handleTitleChange(newTitle: string) {
    setTitle(newTitle);
    if (!isEditing) {
      const generated = newTitle
        .toLowerCase()
        .replace(/[^a-z0-9가-힣\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
      setSlug(generated);
    }
  }

  const savePost = useCallback(
    async (publishOverride?: boolean) => {
      if (!title.trim()) {
        setMessage("제목을 입력해주세요.");
        return;
      }
      if (!slug.trim()) {
        setMessage("슬러그를 입력해주세요.");
        return;
      }

      const willPublish =
        publishOverride !== undefined ? publishOverride : published;
      const publishStateChanged = publishOverride !== undefined;

      if (publishStateChanged) setPublishing(true);
      else setSaving(true);
      setMessage("");

      const supabase = createAuthBrowserClient();
      const trimmedSlug = slug.trim();

      const postData = {
        slug: trimmedSlug,
        title: title.trim(),
        description: description.trim(),
        content,
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        category: category.trim(),
        published: willPublish,
        ...(willPublish && !initialData?.published
          ? { published_at: new Date().toISOString() }
          : {}),
      };

      let saveError: string | null = null;
      let newPostId: string | null = null;

      if (isEditing && initialData) {
        const { error } = await supabase
          .from("posts")
          .update(postData)
          .eq("id", initialData.id!);
        if (error) saveError = error.message;
      } else {
        const { data: newPost, error } = await supabase
          .from("posts")
          .insert(postData)
          .select("id")
          .single();
        if (error) saveError = error.message;
        else if (newPost) newPostId = newPost.id;
      }

      if (saveError) {
        setMessage(`저장 실패: ${saveError}`);
        setSaving(false);
        setPublishing(false);
        return;
      }

      setPublished(willPublish);

      if (publishStateChanged) {
        setMessage(willPublish ? "공개되었습니다." : "비공개로 전환되었습니다.");
      } else {
        setMessage("저장되었습니다.");
      }

      // ISR 캐시 무효화 (블로그 리스트/개별 글/관리 목록)
      await revalidateAfterSave(trimmedSlug);

      if (newPostId) {
        router.push(`/admin/posts/${newPostId}/edit`);
      } else {
        router.refresh();
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
      published,
      isEditing,
      initialData,
      router,
    ]
  );

  return {
    // 폼 상태
    title,
    setTitle: handleTitleChange,
    slug,
    setSlug,
    description,
    setDescription,
    content,
    setContent,
    tags,
    setTags,
    category,
    setCategory,
    published,
    // UI 상태
    showPreview,
    setShowPreview,
    saving,
    publishing,
    message,
    isEditing,
    // 액션
    savePost,
  };
}
