import { NextRequest, NextResponse } from "next/server";
import { createServerClient, isConfigured } from "@/lib/supabase/server";

// POST: 조회수 원자적 증가 (DB 함수 사용)
export async function POST(request: NextRequest) {
  const { slug } = await request.json();

  if (!slug) {
    return NextResponse.json({ error: "slug가 필요합니다" }, { status: 400 });
  }

  if (!isConfigured()) {
    return NextResponse.json({ view_count: 0 });
  }

  const supabase = createServerClient();
  const { data, error } = await supabase.rpc("increment_view_count", {
    p_slug: slug,
  });

  if (error) {
    return NextResponse.json({ view_count: 0 });
  }

  return NextResponse.json({ view_count: data ?? 0 });
}

// GET: 조회수 조회
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "slug가 필요합니다" }, { status: 400 });
  }

  if (!isConfigured()) {
    return NextResponse.json({ view_count: 0 });
  }

  const supabase = createServerClient();
  const { data } = await supabase
    .from("page_views")
    .select("view_count")
    .eq("slug", slug)
    .single();

  return NextResponse.json({ view_count: data?.view_count ?? 0 });
}
