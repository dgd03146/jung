/** 밀리초 단위 시간 상수 */
export const TIME = {
	SECOND: 1_000,
	MINUTE: 60 * 1_000,
	HOUR: 60 * 60 * 1_000,
	DAY: 24 * 60 * 60 * 1_000,
	WEEK: 7 * 24 * 60 * 60 * 1_000,
} as const;

/** 초 단위 ISR revalidate 상수 */
export const REVALIDATE = {
	FIVE_MINUTES: 300,
	ONE_HOUR: 3_600,
	ONE_DAY: 86_400,
} as const;

/**
 * Next.js revalidate config용 리터럴 상수
 * Note: Next.js는 revalidate에 리터럴 값만 허용 (객체 멤버 접근 불가)
 * @see https://nextjs.org/docs/messages/invalid-page-config
 */
export const REVALIDATE_FIVE_MINUTES = 300 as const;
export const REVALIDATE_ONE_HOUR = 3_600 as const;

/** UI 관련 시간 상수 */
export const UI_TIMING = {
	TOAST_DURATION_MS: 3_000,
	RELATIVE_TIME_THRESHOLD_MS: 3_000,
	AUTO_SAVE_THROTTLE_MS: 3_000,
} as const;

/** API 레이트 리미트 딜레이 */
export const RATE_LIMIT_DELAY = {
	GEMINI_MS: 4_000,
	EMBEDDING_MS: 200,
} as const;
