-- posts 테이블
CREATE TABLE IF NOT EXISTS posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  tags TEXT[] DEFAULT '{}',
  category TEXT DEFAULT '',
  cover_image TEXT,
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- slug 인덱스
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts (slug);
-- 게시 상태 + 날짜 인덱스 (목록 조회 최적화)
CREATE INDEX IF NOT EXISTS idx_posts_published ON posts (published, published_at DESC);

-- page_views 테이블
CREATE TABLE IF NOT EXISTS page_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  view_count BIGINT DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS 활성화
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- posts: 게시된 글만 공개 읽기
CREATE POLICY "게시된 글 공개 읽기" ON posts
  FOR SELECT USING (published = true);

-- page_views: 공개 읽기
CREATE POLICY "조회수 공개 읽기" ON page_views
  FOR SELECT USING (true);

-- updated_at 자동 갱신 트리거
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER page_views_updated_at
  BEFORE UPDATE ON page_views
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- 조회수 원자적 증가 함수 (레이스 컨디션 방지)
CREATE OR REPLACE FUNCTION increment_view_count(p_slug TEXT)
RETURNS BIGINT AS $$
DECLARE
  new_count BIGINT;
BEGIN
  INSERT INTO page_views (slug, view_count)
  VALUES (p_slug, 1)
  ON CONFLICT (slug)
  DO UPDATE SET view_count = page_views.view_count + 1
  RETURNING view_count INTO new_count;
  RETURN new_count;
END;
$$ LANGUAGE plpgsql;
