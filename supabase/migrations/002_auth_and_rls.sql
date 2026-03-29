-- posts 테이블에 author_id 추가
ALTER TABLE posts ADD COLUMN IF NOT EXISTS author_id UUID REFERENCES auth.users(id);

-- 기존 RLS 정책 삭제 후 재생성
DROP POLICY IF EXISTS "게시된 글 공개 읽기" ON posts;

-- 게시된 글은 누구나 읽기 가능
CREATE POLICY "게시된 글 공개 읽기" ON posts
  FOR SELECT USING (published = true);

-- 인증된 사용자는 자신의 모든 글(비공개 포함) 읽기 가능
CREATE POLICY "작성자 본인 글 읽기" ON posts
  FOR SELECT USING (auth.uid() = author_id);

-- 인증된 사용자만 글 생성 가능
CREATE POLICY "인증 사용자 글 생성" ON posts
  FOR INSERT WITH CHECK (auth.uid() = author_id);

-- 작성자만 글 수정 가능
CREATE POLICY "작성자 글 수정" ON posts
  FOR UPDATE USING (auth.uid() = author_id);

-- 작성자만 글 삭제 가능
CREATE POLICY "작성자 글 삭제" ON posts
  FOR DELETE USING (auth.uid() = author_id);

-- page_views: 인증 사용자가 조회수 삽입/업데이트 가능하도록
CREATE POLICY "조회수 upsert" ON page_views
  FOR ALL USING (true) WITH CHECK (true);
