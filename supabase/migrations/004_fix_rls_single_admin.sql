-- 기존 작성자 기반 정책 삭제
DROP POLICY IF EXISTS "작성자 본인 글 읽기" ON posts;
DROP POLICY IF EXISTS "인증 사용자 글 생성" ON posts;
DROP POLICY IF EXISTS "작성자 글 수정" ON posts;
DROP POLICY IF EXISTS "작성자 글 삭제" ON posts;

-- 인증된 사용자는 모든 글에 대해 전체 권한 (1인 관리자 구조)
CREATE POLICY "인증 사용자 전체 접근" ON posts
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');
