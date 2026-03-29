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
