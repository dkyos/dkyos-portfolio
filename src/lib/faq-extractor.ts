/**
 * 마크다운 본문에서 질문형 헤딩과 답변을 추출하여 FAQ 구조 생성
 * GEO 최적화: LLM이 Q&A 형태로 인용할 수 있도록 FAQPage 스키마 자동 생성
 */

interface FaqItem {
  question: string;
  answer: string;
}

// 질문형 패턴: "왜", "어떻게", "무엇", "언제", "어디", "?", "What", "How", "Why" 등
const QUESTION_PATTERN =
  /^(왜|어떻게|무엇|뭐가|언제|어디|어떤|얼마나|What|How|Why|When|Where|Which|Is|Are|Can|Do|Does|Should).+|.+\?$/i;

/**
 * 마크다운에서 질문형 H2/H3 헤딩과 그 아래 본문을 FAQ로 추출
 */
export function extractFaqFromMarkdown(content: string): FaqItem[] {
  const lines = content.split("\n");
  const faqs: FaqItem[] = [];

  let currentQuestion: string | null = null;
  let currentAnswer: string[] = [];

  for (const line of lines) {
    const headingMatch = line.match(/^#{2,3}\s+(.+)$/);

    if (headingMatch) {
      // 이전 질문의 답변 저장
      if (currentQuestion && currentAnswer.length > 0) {
        faqs.push({
          question: currentQuestion,
          answer: currentAnswer
            .join(" ")
            .replace(/\s+/g, " ")
            .trim()
            .slice(0, 500),
        });
      }

      const heading = headingMatch[1].trim();
      if (QUESTION_PATTERN.test(heading)) {
        currentQuestion = heading.replace(/\?$/, "") + "?";
        currentAnswer = [];
      } else {
        currentQuestion = null;
        currentAnswer = [];
      }
    } else if (currentQuestion) {
      // 답변 본문 수집 (빈 줄, 코드 블록, HTML 태그 제외)
      const trimmed = line.trim();
      if (
        trimmed &&
        !trimmed.startsWith("```") &&
        !trimmed.startsWith("<") &&
        !trimmed.startsWith("![") &&
        !trimmed.startsWith("---")
      ) {
        // 마크다운 문법 제거
        const cleaned = trimmed
          .replace(/^[*\-+]\s+/, "")
          .replace(/^\d+\.\s+/, "")
          .replace(/\*\*(.+?)\*\*/g, "$1")
          .replace(/\*(.+?)\*/g, "$1")
          .replace(/`(.+?)`/g, "$1")
          .replace(/\[(.+?)\]\(.+?\)/g, "$1");
        if (cleaned) currentAnswer.push(cleaned);
      }
    }
  }

  // 마지막 질문 처리
  if (currentQuestion && currentAnswer.length > 0) {
    faqs.push({
      question: currentQuestion,
      answer: currentAnswer
        .join(" ")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 500),
    });
  }

  return faqs;
}

/**
 * FAQ 데이터를 FAQPage JSON-LD 스키마로 변환
 */
export function buildFaqJsonLd(faqs: FaqItem[]) {
  if (faqs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
