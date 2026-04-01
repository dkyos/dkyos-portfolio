"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createAuthBrowserClient } from "@/lib/supabase/auth-client";

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
          .eq("id", initialData.id!);

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
    [title, slug, description, content, tags, category, isEditing, initialData, router]
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
