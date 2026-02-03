-- 익명 댓글 지원을 위한 마이그레이션
-- 비로그인 사용자도 닉네임/비밀번호로 댓글 작성 가능

-- 1. user_id를 nullable로 변경 (익명 댓글은 user_id가 null)
ALTER TABLE post_comments
  ALTER COLUMN user_id DROP NOT NULL;

-- 2. 익명 사용자 관련 컬럼 추가
ALTER TABLE post_comments
  ADD COLUMN IF NOT EXISTS anonymous_id TEXT,
  ADD COLUMN IF NOT EXISTS anonymous_name TEXT,
  ADD COLUMN IF NOT EXISTS password_hash TEXT;

-- 3. 최소 하나의 식별자(user_id 또는 anonymous_id) 필수 제약조건
ALTER TABLE post_comments
  ADD CONSTRAINT comment_author_check
  CHECK (user_id IS NOT NULL OR anonymous_id IS NOT NULL);

-- 4. 익명 댓글은 닉네임과 비밀번호 필수 제약조건
ALTER TABLE post_comments
  ADD CONSTRAINT anonymous_comment_check
  CHECK (
    user_id IS NOT NULL
    OR (anonymous_id IS NOT NULL AND anonymous_name IS NOT NULL AND password_hash IS NOT NULL)
  );

-- 5. anonymous_id 인덱스 (조회 성능)
CREATE INDEX IF NOT EXISTS idx_post_comments_anonymous_id
  ON post_comments(anonymous_id)
  WHERE anonymous_id IS NOT NULL;

-- 6. 코멘트: 기존 RLS 정책은 유지, 익명 댓글은 public 접근 허용
-- RLS가 활성화되어 있다면 익명 사용자도 댓글을 생성할 수 있도록 정책 추가 필요
-- (Supabase Dashboard에서 별도 설정)
