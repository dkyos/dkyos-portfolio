import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import { siteConfig } from "@/lib/constants";

export const runtime = "edge";

/**
 * 동적 OG 이미지 — SNS 미리보기용 1200×630.
 *
 * 받는 쿼리:
 *   title       글 제목 (필수)
 *   desc        글 요약 (없으면 슬로건 노출)
 *   tags        쉼표 구분 태그 (최대 4개 노출)
 *   date        발행일 (YYYY-MM-DD)
 *   reading     "10분 읽기" 같은 라벨
 *   section     카테고리 (좌상단 스트립)
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = (searchParams.get("title") || siteConfig.title).slice(0, 120);
  const desc = (searchParams.get("desc") || "").slice(0, 200);
  const tagsRaw = searchParams.get("tags") || "";
  const date = searchParams.get("date") || "";
  const reading = searchParams.get("reading") || "";
  const section = searchParams.get("section") || "";

  const tags = tagsRaw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 4);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#09090b",
          padding: "60px 80px",
          color: "#fafafa",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* 상단 — 사이트명 + 섹션 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 22,
            color: "#a1a1aa",
            fontWeight: 500,
          }}
        >
          <span>{siteConfig.name}</span>
          {section && (
            <>
              <span style={{ color: "#3f3f46" }}>·</span>
              <span style={{ color: "#a1a1aa" }}>{section}</span>
            </>
          )}
        </div>

        {/* 중앙 — 제목 */}
        <div
          style={{
            display: "flex",
            fontSize: title.length > 50 ? 48 : 56,
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            color: "#fafafa",
            marginTop: 36,
            maxWidth: "1040px",
          }}
        >
          {title}
        </div>

        {/* 요약 (description) */}
        {desc && (
          <div
            style={{
              display: "flex",
              fontSize: 24,
              color: "#a1a1aa",
              lineHeight: 1.4,
              marginTop: 24,
              maxWidth: "1040px",
            }}
          >
            {desc}
          </div>
        )}

        {/* 푸시 — 메타 정보 영역을 하단으로 밀어내기 */}
        <div style={{ flex: 1 }} />

        {/* 하단 — 메타 (날짜·읽는시간·태그) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            fontSize: 20,
            color: "#71717a",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span>{siteConfig.author.name}</span>
            {date && (
              <>
                <span style={{ color: "#3f3f46" }}>·</span>
                <span>{date}</span>
              </>
            )}
            {reading && (
              <>
                <span style={{ color: "#3f3f46" }}>·</span>
                <span>{reading}</span>
              </>
            )}
          </div>
          {tags.length > 0 && (
            <div style={{ display: "flex", gap: 10 }}>
              {tags.map((t) => (
                <span
                  key={t}
                  style={{
                    display: "flex",
                    padding: "6px 14px",
                    borderRadius: 9999,
                    backgroundColor: "#27272a",
                    color: "#d4d4d8",
                    fontSize: 18,
                    fontWeight: 500,
                  }}
                >
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
