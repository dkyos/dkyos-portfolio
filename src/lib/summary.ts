/**
 * 마크다운 본문에서 SNS/검색 결과용 평문 요약을 추출.
 *
 * - 코드 블록·HTML·이미지·링크의 URL은 제거
 * - 마크다운 기호 제거
 * - 첫 maxLength자까지 잘라 단어 경계로 마무리
 *
 * generateMetadata나 fallback description에 사용한다.
 */
export function extractSummary(
  markdown: string,
  maxLength = 200
): string {
  const text = markdown
    .replace(/```[\s\S]*?```/g, " ") // 코드 블록 제거
    .replace(/`[^`]*`/g, " ") // 인라인 코드 제거
    .replace(/<[^>]+>/g, " ") // HTML 태그 제거
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ") // 이미지
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // 링크 → 텍스트만
    .replace(/^[#>\-*+\d.]+\s+/gm, "") // 헤딩/리스트 마커
    .replace(/[*_~`>]/g, "") // 강조·취소선·인용 기호
    .replace(/\s+/g, " ")
    .trim();

  if (text.length <= maxLength) return text;

  // 단어 경계에서 자르기: 마지막 공백·문장부호 위치
  const cut = text.slice(0, maxLength);
  const lastBreak = Math.max(
    cut.lastIndexOf(". "),
    cut.lastIndexOf("。"),
    cut.lastIndexOf("? "),
    cut.lastIndexOf("! "),
    cut.lastIndexOf(", "),
    cut.lastIndexOf(" ")
  );
  const safe = lastBreak > maxLength * 0.6 ? cut.slice(0, lastBreak) : cut;
  return safe.trim() + "…";
}

/**
 * description이 비었거나 너무 짧으면 본문에서 자동 추출.
 * 안전한 fallback 체인으로 메타 누락을 방지.
 */
export function resolveDescription(opts: {
  description?: string | null;
  content: string;
  fallback?: string;
  minLength?: number;
  maxLength?: number;
}): string {
  const { description, content, fallback = "", minLength = 40, maxLength = 200 } = opts;

  const trimmed = (description ?? "").trim();
  if (trimmed.length >= minLength) return trimmed;

  const auto = extractSummary(content, maxLength);
  if (auto.length >= minLength) return auto;

  return trimmed || auto || fallback;
}
