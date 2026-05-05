import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/constants";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "DKyos — Build. Ship. Reflect.";

/**
 * 사이트 기본 OG 이미지.
 * 글 페이지는 /api/og?title=...로 동적 생성하지만,
 * 홈/블로그/about 같은 인덱스 페이지는 이 정적 이미지가 사용된다.
 */
export default function OpenGraphImage() {
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
          padding: "80px 100px",
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: "#a1a1aa",
            fontWeight: 500,
            marginBottom: 32,
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            display: "flex",
            gap: 24,
            fontSize: 96,
            fontWeight: 700,
            color: "#fafafa",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          <span>Build.</span>
          <span style={{ color: "#52525b" }}>Ship.</span>
          <span style={{ color: "#52525b" }}>Reflect.</span>
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#a1a1aa",
            marginTop: 48,
            maxWidth: 900,
            lineHeight: 1.4,
          }}
        >
          웹·AI·소프트웨어 엔지니어링에 대해
          매일 조금씩 더 잘하기 위한 기록.
        </div>
        <div
          style={{
            fontSize: 22,
            color: "#52525b",
            marginTop: 56,
          }}
        >
          {siteConfig.url.replace("https://", "")}
        </div>
      </div>
    ),
    size
  );
}
