/**
 * JSON-LD 구조화 데이터 컴포넌트
 *
 * 보안 참고: JSON.stringify()로 직렬화된 서버 데이터만 사용하므로
 * XSS 위험이 없습니다. 이는 Next.js 공식 문서에서 권장하는 패턴입니다.
 * https://nextjs.org/docs/app/building-your-application/optimizing/metadata#json-ld
 */
export function JsonLdScript({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
