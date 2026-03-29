export interface TimelineItem {
  period: string;
  title: string;
  organization: string;
  description: string;
  type: "education" | "work" | "lecture";
}

export const timeline: TimelineItem[] = [
  // ── 경력 ──
  {
    period: "2017.01 ~ 현재",
    title: "개발/PM",
    organization: "S-Core",
    description:
      "디지털 마케팅 플랫폼 TF: 버즈 분석 데이터 마케팅 플랫폼 개발. 딥러닝 TF: 조달청 수요 예측 머신러닝/딥러닝 모델링 프로젝트 수행, 텍스트 마이닝 데이터 분석 프로젝트 수행.",
    type: "work",
  },
  {
    period: "2016.07 ~ 2016.12",
    title: "개발",
    organization: "S-Core",
    description:
      "블록체인 Ethereum 기반의 음식점 쿠폰 서비스 PoC. 블록체인 Hyperledger 분석.",
    type: "work",
  },
  {
    period: "2016.01 ~ 2016.06",
    title: "개발/기획",
    organization: "S-Core",
    description: "분산파일시스템 개발 (GlusterFS).",
    type: "work",
  },
  {
    period: "2015.01 ~ 2015.12",
    title: "개발/PM",
    organization: "S-Core",
    description: "Tizen SDK CLI 개발, Tizen SDK SDB 개발 PM.",
    type: "work",
  },
  {
    period: "2012.06 ~ 2014.12",
    title: "개발/수석",
    organization: "S-Core",
    description: "Xen/KVM/QEMU 등을 활용한 가상화 SW 개발.",
    type: "work",
  },
  {
    period: "2010.09 ~ 2012.05",
    title: "개발/수석보",
    organization: "S-Core",
    description: "QEMU/KVM을 사용한 Tizen SDK의 Emulator 개발.",
    type: "work",
  },
  {
    period: "2009.12 ~ 2010.08",
    title: "개발/과장",
    organization: "SK C&C",
    description: "OpenNebula를 이용한 IaaS 관리 소프트웨어 설계.",
    type: "work",
  },
  {
    period: "2007.04 ~ 2009.11",
    title: "개발/책임",
    organization: "티맥스코어",
    description: "윈도우 PE 바이너리 호환 개발, 윈도우 DLL 호환 개발.",
    type: "work",
  },
  {
    period: "2006.12 ~ 2007.03",
    title: "개발/선임",
    organization: "삼성전자",
    description: "SSD 성능 분석.",
    type: "work",
  },
  {
    period: "2005.05 ~ 2006.11",
    title: "개발/선임",
    organization: "티맥스소프트",
    description: "자체 OS 커널 개발, FreeBSD Network driver 포팅.",
    type: "work",
  },
  {
    period: "2004.05 ~ 2006.11",
    title: "개발/선임",
    organization: "티맥스소프트",
    description:
      "Secure OS 개발 (SysKeeper OS). CC, GS, 국정원 보안성 통과. 지원 OS: Solaris, Linux, HPUX, AIX, Windows, UnixWare. 디바이스 드라이버 개발, 통합 관리 모듈 개발, 기본 설계부터 개발·테스트 및 제품화.",
    type: "work",
  },
  {
    period: "2003.12 ~ 2004.04",
    title: "개발/대리",
    organization: "코코넛",
    description:
      "ESM 표준 API 개발 (네트워크 프로그래밍, C, MFC). Sefinity ESM 개발.",
    type: "work",
  },
  {
    period: "2003.02 ~ 2003.11",
    title: "개발/대리",
    organization: "코코넛",
    description:
      "프리해킹존 개발, 김천과학대학 온라인 해킹 스페이스 PM.",
    type: "work",
  },
  {
    period: "2002.01 ~ 2003.01",
    title: "기획/사원",
    organization: "코코넛",
    description:
      "Shell Script를 이용한 취약성 점검 툴 개발. 모의해킹 및 보안 컨설팅 수행.",
    type: "work",
  },
  // ── 학력 ──
  {
    period: "2000.07 ~ 2002.01",
    title: "대학원 (수학과)",
    organization: "포항공과대학교",
    description:
      "암호학 연구. HCC 암호 시스템(초타원 곡선 분류) ACISP'2002 논문 발표 — \"Isomorphism Classes of Hyperelliptic Curves of Genus 2 over Fq\" (32회 인용). Crypto++ 암호 라이브러리 프로젝트 수행.",
    type: "education",
  },
  {
    period: "1999.03 ~ 2000.06",
    title: "대학원 (수학과)",
    organization: "포항공과대학교",
    description:
      "GPS를 이용한 무인화 기법 연구. 국방과학연구소 무인 자동차 과제 연구 및 개발.",
    type: "education",
  },
  {
    period: "1995.03 ~ 1999.02",
    title: "수학과 학사",
    organization: "포항공과대학교",
    description: "대학생 수학경시대회 입상. 성적 우수 장학금.",
    type: "education",
  },
  {
    period: "1983 ~ 1994",
    title: "문일고등학교 · 강서중학교 · 백산초등학교",
    organization: "",
    description:
      "수학 10000문제 풀기 성공 (고등학교). 100m 13초 기록 (중학교).",
    type: "education",
  },
];

export const lectures: TimelineItem[] = [
  {
    period: "",
    title: "IDC 고객 정기 세미나",
    organization: "",
    description: "VPN, 윈도우 보안",
    type: "lecture",
  },
  {
    period: "",
    title: "삼성 멀티캠퍼스",
    organization: "",
    description: "보안전문가 과정",
    type: "lecture",
  },
  {
    period: "",
    title: "정보보안 세미나",
    organization: "",
    description: "정보보호시스템",
    type: "lecture",
  },
  {
    period: "",
    title: "정보보호 전문가 과정",
    organization: "",
    description: "네트워크 보안, 해킹 기법",
    type: "lecture",
  },
];
