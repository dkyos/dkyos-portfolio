export const siteConfig = {
  name: "DKyos",
  title: "DKyos - 개발자 포트폴리오",
  description:
    "윤동균의 기술 블로그 및 포트폴리오. 소프트웨어 개발, 웹 기술, AI 등 다양한 기술 주제를 다룹니다.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://dkyos.vercel.app",
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
} as const;

// 블로그 글 본문용 Prose 클래스 (PostContent, PostEditor 미리보기에서 공유)
export const PROSE_CLASSES =
  "prose prose-zinc max-w-none dark:prose-invert prose-headings:scroll-mt-24 prose-headings:leading-tight prose-headings:tracking-tight prose-p:leading-relaxed prose-li:leading-relaxed prose-a:text-foreground prose-a:underline-offset-4 prose-pre:bg-zinc-950 prose-pre:dark:bg-zinc-900 [&_.info-box]:my-4 [&_.info-box]:rounded-lg [&_.info-box]:border-l-4 [&_.info-box]:p-4 [&_.info-box.blue]:border-blue-500 [&_.info-box.blue]:bg-blue-50 dark:[&_.info-box.blue]:bg-blue-950/30 [&_.info-box.yellow]:border-yellow-500 [&_.info-box.yellow]:bg-yellow-50 dark:[&_.info-box.yellow]:bg-yellow-950/30 [&_.info-box.red]:border-red-500 [&_.info-box.red]:bg-red-50 dark:[&_.info-box.red]:bg-red-950/30 [&_.info-box.green]:border-green-500 [&_.info-box.green]:bg-green-50 dark:[&_.info-box.green]:bg-green-950/30";
