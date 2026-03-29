export interface TimelineItem {
  period: string;
  title: string;
  organization: string;
  description: string;
  type: "education" | "work";
}

export const timeline: TimelineItem[] = [
  // 최신순 정렬 - 실제 데이터로 교체 필요
  {
    period: "2023 - 현재",
    title: "소프트웨어 개발자",
    organization: "회사명",
    description: "주요 업무 및 성과를 여기에 작성합니다.",
    type: "work",
  },
  {
    period: "2020 - 2023",
    title: "소프트웨어 개발자",
    organization: "이전 회사명",
    description: "주요 업무 및 성과를 여기에 작성합니다.",
    type: "work",
  },
  {
    period: "2018 - 2020",
    title: "석사",
    organization: "대학원명",
    description: "전공 및 연구 분야를 여기에 작성합니다.",
    type: "education",
  },
  {
    period: "2014 - 2018",
    title: "학사",
    organization: "대학교명",
    description: "전공을 여기에 작성합니다.",
    type: "education",
  },
  {
    period: "2011 - 2014",
    title: "고등학교",
    organization: "고등학교명",
    description: "고등학교 시절 경험을 여기에 작성합니다.",
    type: "education",
  },
];
