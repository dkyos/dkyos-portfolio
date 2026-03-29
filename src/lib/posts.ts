import { cache } from "react";
import { createReadOnlyClient } from "@/lib/supabase/server";
import type { Post } from "@/lib/supabase/types";

// 목록 조회용 컬럼 (content 제외로 네트워크 전송량 절감)
const LIST_COLUMNS =
  "id, slug, title, description, tags, category, cover_image, published, published_at, created_at, updated_at" as const;

// 게시된 글 전체 조회 (최신순, content 제외)
export async function getAllPosts(): Promise<Post[]> {
  const supabase = createReadOnlyClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("posts")
    .select(LIST_COLUMNS)
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (error) {
    console.error("글 목록 조회 실패:", error);
    return [];
  }

  return (data ?? []) as Post[];
}

// 슬러그로 단일 글 조회 (cache로 동일 요청 내 중복 호출 방지)
export const getPostBySlug = cache(
  async (slug: string): Promise<Post | null> => {
    const supabase = createReadOnlyClient();
    if (!supabase) return null;

    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();

    if (error) return null;
    return data;
  }
);

// 최근 글 N개 조회 (content 제외)
export async function getRecentPosts(limit: number = 5): Promise<Post[]> {
  const supabase = createReadOnlyClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("posts")
    .select(LIST_COLUMNS)
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("최근 글 조회 실패:", error);
    return [];
  }

  return (data ?? []) as Post[];
}

// 모든 슬러그 조회 (sitemap용)
export async function getAllSlugs(): Promise<string[]> {
  const supabase = createReadOnlyClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("posts")
    .select("slug")
    .eq("published", true);

  if (error) return [];
  return (data ?? []).map((post) => post.slug);
}

// 읽기 시간 계산 (한국어 기준 분당 약 500자)
export function calculateReadingTime(content: string): string {
  const charCount = content.replace(/\s/g, "").length;
  const minutes = Math.ceil(charCount / 500);
  return `${minutes}분`;
}
