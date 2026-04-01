"use server";

import { revalidatePath } from "next/cache";
import { createAuthClient, getUser } from "@/lib/supabase/auth-server";
import type { ActionResult } from "@/lib/types";

// 인증 확인 헬퍼
async function requireAuth(): Promise<ActionResult | null> {
  const user = await getUser();
  if (!user) return { success: false, error: "인증이 필요합니다." };
  return null;
}

// 글 삭제
export async function deletePost(postId: string): Promise<ActionResult> {
  const authError = await requireAuth();
  if (authError) return authError;

  const supabase = await createAuthClient();
  const { error } = await supabase.from("posts").delete().eq("id", postId);

  if (error) return { success: false, error: `삭제 실패: ${error.message}` };

  revalidatePath("/admin/posts");
  revalidatePath("/blog");
  return { success: true };
}

// 공개/비공개 토글
export async function togglePublish(
  postId: string,
  currentPublished: boolean
): Promise<ActionResult> {
  const authError = await requireAuth();
  if (authError) return authError;

  const supabase = await createAuthClient();
  const updateData: Record<string, unknown> = { published: !currentPublished };

  if (!currentPublished) {
    updateData.published_at = new Date().toISOString();
  }

  const { error } = await supabase
    .from("posts")
    .update(updateData)
    .eq("id", postId);

  if (error) return { success: false, error: `상태 변경 실패: ${error.message}` };

  revalidatePath("/admin/posts");
  revalidatePath("/blog");
  return { success: true };
}
