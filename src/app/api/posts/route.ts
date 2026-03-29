import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

// 별도 API 시크릿으로 인증 (서비스 롤 키 노출 방지)
function isAuthorized(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  const apiSecret = process.env.API_SECRET;
  if (!authHeader || !apiSecret) return false;
  return authHeader === `Bearer ${apiSecret}`;
}

// POST: 새 글 생성 또는 업데이트 (upsert)
export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "인증 필요" }, { status: 401 });
  }

  const body = await request.json();
  const { slug, title, description, content, tags, category, cover_image, published, published_at } = body;

  if (!slug || !title) {
    return NextResponse.json(
      { error: "slug와 title은 필수입니다" },
      { status: 400 }
    );
  }

  const supabase = createServerClient();

  // 기존 글이 있으면 published_at 보존
  const { data: existing } = await supabase
    .from("posts")
    .select("published_at")
    .eq("slug", slug)
    .single();

  const { data, error } = await supabase
    .from("posts")
    .upsert(
      {
        slug,
        title,
        description: description || "",
        content: content || "",
        tags: tags || [],
        category: category || "",
        cover_image: cover_image || null,
        published: published ?? true,
        published_at:
          published === false
            ? null
            : published_at || existing?.published_at || new Date().toISOString(),
      },
      { onConflict: "slug" }
    )
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

// GET: 전체 글 목록 (관리용, 비공개 포함)
export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "인증 필요" }, { status: 401 });
  }

  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

// DELETE: 글 삭제
export async function DELETE(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "인증 필요" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "slug가 필요합니다" }, { status: 400 });
  }

  const supabase = createServerClient();
  const { error } = await supabase.from("posts").delete().eq("slug", slug);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
