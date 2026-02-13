import { TRPCError } from '@trpc/server';

/**
 * Rate Limiter
 *
 * ⚠️ 주의: In-memory 저장소 사용으로 단일 인스턴스 배포에서만 유효합니다.
 * 다중 인스턴스 환경에서는 Redis/Upstash로 교체 필요.
 */

interface RateLimitRecord {
	count: number;
	resetAt: number;
}

// 시간 상수
const RATE_LIMIT_WINDOW_MS = 60_000; // 1분
const CLEANUP_INTERVAL_MS = 5 * 60_000; // 5분

// In-memory 저장소 (단일 인스턴스 전용, 프로덕션 다중 인스턴스는 Redis 권장)
const rateLimitStore = new Map<string, RateLimitRecord>();

// Rate Limit 설정
export const RATE_LIMITS = {
	anonymousComment: { maxRequests: 5, windowMs: RATE_LIMIT_WINDOW_MS },
	anonymousLike: { maxRequests: 30, windowMs: RATE_LIMIT_WINDOW_MS },
	authenticatedComment: { maxRequests: 20, windowMs: RATE_LIMIT_WINDOW_MS },
	authenticatedLike: { maxRequests: 100, windowMs: RATE_LIMIT_WINDOW_MS },
	anonymousGuestbook: { maxRequests: 3, windowMs: RATE_LIMIT_WINDOW_MS },
	embeddingGeneration: { maxRequests: 10, windowMs: RATE_LIMIT_WINDOW_MS },
	analyticsTrack: { maxRequests: 60, windowMs: RATE_LIMIT_WINDOW_MS },
} as const;

/**
 * Rate Limit 검사
 * @throws TRPCError 429 Too Many Requests
 */
export const checkRateLimit = (
	identifier: string,
	action: keyof typeof RATE_LIMITS,
): void => {
	const config = RATE_LIMITS[action];
	const key = `${action}:${identifier}`;
	const now = Date.now();

	const record = rateLimitStore.get(key);

	// 기존 기록이 없거나 윈도우가 만료된 경우
	if (!record || now > record.resetAt) {
		rateLimitStore.set(key, {
			count: 1,
			resetAt: now + config.windowMs,
		});
		return;
	}

	// Rate Limit 초과
	if (record.count >= config.maxRequests) {
		const retryAfter = Math.ceil((record.resetAt - now) / 1000);
		throw new TRPCError({
			code: 'TOO_MANY_REQUESTS',
			message: `요청이 너무 많습니다. ${retryAfter}초 후에 다시 시도해주세요.`,
		});
	}

	// 카운트 증가
	record.count++;
};

// 주기적으로 만료된 레코드 정리 (메모리 누수 방지)
setInterval(() => {
	const now = Date.now();
	for (const [key, record] of rateLimitStore.entries()) {
		if (now > record.resetAt) {
			rateLimitStore.delete(key);
		}
	}
}, CLEANUP_INTERVAL_MS);
