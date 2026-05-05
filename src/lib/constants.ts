export const siteConfig = {
  name: "DKyos",
  title: "DKyos — Build. Ship. Reflect.",
  description:
    "웹·AI·소프트웨어 엔지니어링에 대해 매일 조금씩 더 잘하기 위한 기록. 시스템 설계 결정, AI Native 워크플로, 회고를 정리합니다.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://blog.dkyos.com",
  author: {
    name: "윤동균",
    nameEn: "Dongkyun Yun",
    email: "dongkyun.yun@gmail.com",
  },
  locale: "ko_KR",
  language: "ko",
  links: {
    github: "https://github.com/dkyos",
    linkedin: "",
    threads: "",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
    naver: process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION || "",
  },
} as const;

/**
 * 저자의 외부 프로필 URL 목록 (sameAs 용).
 * 빈 문자열은 자동 필터링되므로 미사용 플랫폼은 그대로 두어도 안전.
 */
export const authorSameAs: string[] = (
  Object.values(siteConfig.links) as string[]
).filter((v) => v.length > 0);

// 블로그 글 본문용 Prose 클래스 (PostContent, PostEditor 미리보기에서 공유)
export const PROSE_CLASSES =
  "prose prose-zinc max-w-none dark:prose-invert prose-headings:scroll-mt-24 prose-headings:leading-tight prose-headings:tracking-tight prose-p:leading-relaxed prose-li:leading-relaxed prose-a:text-foreground prose-a:underline-offset-4 prose-pre:bg-zinc-950 prose-pre:dark:bg-zinc-900 [&_.info-box]:my-4 [&_.info-box]:rounded-lg [&_.info-box]:border-l-4 [&_.info-box]:p-4 [&_.info-box.blue]:border-blue-500 [&_.info-box.blue]:bg-blue-50 dark:[&_.info-box.blue]:bg-blue-950/30 [&_.info-box.yellow]:border-yellow-500 [&_.info-box.yellow]:bg-yellow-50 dark:[&_.info-box.yellow]:bg-yellow-950/30 [&_.info-box.red]:border-red-500 [&_.info-box.red]:bg-red-50 dark:[&_.info-box.red]:bg-red-950/30 [&_.info-box.green]:border-green-500 [&_.info-box.green]:bg-green-50 dark:[&_.info-box.green]:bg-green-950/30";
