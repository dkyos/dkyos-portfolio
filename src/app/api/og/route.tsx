import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import { siteConfig } from "@/lib/constants";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || siteConfig.title;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#09090b",
          padding: "60px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div
            style={{
              fontSize: 24,
              color: "#a1a1aa",
              fontWeight: 500,
            }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: "#fafafa",
              lineHeight: 1.3,
              maxWidth: "900px",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 20,
              color: "#71717a",
              marginTop: "20px",
            }}
          >
            {siteConfig.author.name} · {siteConfig.url.replace("https://", "")}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
