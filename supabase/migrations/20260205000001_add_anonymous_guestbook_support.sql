-- 익명 방명록 지원을 위한 마이그레이션
-- 비로그인 사용자도 닉네임으로 방명록 메시지 작성 가능

-- 1. author_id를 nullable로 변경 (익명 메시지는 author_id가 null)
ALTER TABLE guestbook
  ALTER COLUMN author_id DROP NOT NULL;

-- 2. 익명 사용자 관련 컬럼 추가
ALTER TABLE guestbook
  ADD COLUMN IF NOT EXISTS anonymous_id TEXT,
  ADD COLUMN IF NOT EXISTS is_anonymous BOOLEAN DEFAULT false;

-- 3. 인증/익명 상호 배타성 제약조건
-- is_anonymous = true: author_id는 NULL, anonymous_id는 NOT NULL
-- is_anonymous = false: author_id는 NOT NULL, anonymous_id는 NULL
ALTER TABLE guestbook
  ADD CONSTRAINT anonymous_guestbook_check
  CHECK (
    (is_anonymous = true AND author_id IS NULL AND anonymous_id IS NOT NULL)
    OR
    (is_anonymous IS NOT TRUE AND author_id IS NOT NULL AND anonymous_id IS NULL)
  );

-- 5. anonymous_id 인덱스 (조회 성능)
CREATE INDEX IF NOT EXISTS idx_guestbook_anonymous_id
  ON guestbook(anonymous_id)
  WHERE anonymous_id IS NOT NULL;

-- 6. RLS 정책: 익명 사용자도 메시지를 생성할 수 있도록 허용
-- 모든 사용자가 방명록을 읽을 수 있음 (이미 설정되어 있을 수 있음)
-- INSERT: anon 역할도 익명 메시지 작성 가능

-- 참고: Supabase Dashboard에서 RLS 정책을 별도로 설정해야 할 수 있음
-- CREATE POLICY "Allow anonymous guestbook insert"
--   ON guestbook FOR INSERT
--   TO anon
--   WITH CHECK (anonymous_id IS NOT NULL AND author_id IS NULL);
