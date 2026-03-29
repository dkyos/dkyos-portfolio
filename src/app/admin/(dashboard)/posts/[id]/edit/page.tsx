import { notFound } from "next/navigation";
import { createAuthClient } from "@/lib/supabase/auth-server";
import { PostEditor } from "@/components/admin/PostEditor";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createAuthClient();

  const { data: post } = await supabase
    .from("posts")
    .select("id, slug, title, description, content, tags, category, published")
    .eq("id", id)
    .single();

  if (!post) notFound();

  return <PostEditor initialData={post} />;
}
