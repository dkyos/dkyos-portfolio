-- service_role 키로 posts 테이블에 전체 접근 허용
-- (service_role은 auth.uid()가 없으므로 별도 정책 필요)
CREATE POLICY "서비스 키 전체 접근" ON posts
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
