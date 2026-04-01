import type { Post } from "@/lib/supabase/types";

// 목록 표시용 Post 타입 (content 제외)
export type PostListItem = Omit<Post, "content">;

// Server Action 공통 응답
export type ActionResult = {
  success: boolean;
  error?: string;
};
