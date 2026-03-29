/**
 * 블로그 글 발행 스크립트
 *
 * 사용법:
 *   npx tsx scripts/publish-post.ts --slug "my-post" --title "제목" --description "설명" --tags "tag1,tag2" --content content.md
 *   npx tsx scripts/publish-post.ts --file drafts/my-post.md  (frontmatter 포함 마크다운)
 *
 * 환경변수 필요: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 */

import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";
import * as path from "path";
import matter from "gray-matter";

// .env.local 파일에서 환경변수 로드
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex === -1) continue;
    const key = trimmed.slice(0, eqIndex).trim();
    const value = trimmed.slice(eqIndex + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error(
    "환경변수가 설정되지 않았습니다: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY"
  );
  console.error(".env.local 파일을 확인하세요.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
  db: { schema: "public" },
});

function parseArgs(args: string[]): Record<string, string> {
  const result: Record<string, string> = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith("--") && i + 1 < args.length) {
      result[args[i].slice(2)] = args[i + 1];
      i++;
    }
  }
  return result;
}

async function publishFromFile(filePath: string) {
  const absolutePath = path.resolve(filePath);
  const fileContent = fs.readFileSync(absolutePath, "utf-8");
  const { data: frontmatter, content } = matter(fileContent);

  const slug =
    frontmatter.slug || path.basename(filePath, path.extname(filePath));
  const title = frontmatter.title;
  const description = frontmatter.description || "";
  const tags = frontmatter.tags || [];
  const category = frontmatter.category || "";
  const coverImage = frontmatter.cover_image || null;
  const published =
    frontmatter.published !== undefined ? frontmatter.published : true;

  if (!title) {
    console.error("frontmatter에 title이 필요합니다.");
    process.exit(1);
  }

  return publishPost({
    slug,
    title,
    description,
    content: content.trim(),
    tags: Array.isArray(tags) ? tags : tags.split(",").map((t: string) => t.trim()),
    category,
    cover_image: coverImage,
    published,
    published_at: published ? new Date().toISOString() : null,
  });
}

async function publishPost(post: {
  slug: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
  category: string;
  cover_image: string | null;
  published: boolean;
  published_at: string | null;
}) {
  const { data, error } = await supabase
    .from("posts")
    .upsert(post, { onConflict: "slug" })
    .select()
    .single();

  if (error) {
    console.error("발행 실패:", error.message);
    process.exit(1);
  }

  console.log(`✓ 글이 발행되었습니다: "${data.title}" (slug: ${data.slug})`);
  console.log(
    `  게시 상태: ${data.published ? "공개" : "비공개"}`
  );
  return data;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.file) {
    await publishFromFile(args.file);
  } else if (args.slug && args.title) {
    let content = "";
    if (args.content) {
      const contentPath = path.resolve(args.content);
      if (fs.existsSync(contentPath)) {
        content = fs.readFileSync(contentPath, "utf-8");
      } else {
        content = args.content;
      }
    }

    await publishPost({
      slug: args.slug,
      title: args.title,
      description: args.description || "",
      content,
      tags: args.tags ? args.tags.split(",").map((t) => t.trim()) : [],
      category: args.category || "",
      cover_image: null,
      published: true,
      published_at: new Date().toISOString(),
    });
  } else {
    console.log("사용법:");
    console.log(
      "  npx tsx scripts/publish-post.ts --file drafts/my-post.md"
    );
    console.log(
      '  npx tsx scripts/publish-post.ts --slug "my-post" --title "제목" --content content.md'
    );
    process.exit(1);
  }
}

main();
