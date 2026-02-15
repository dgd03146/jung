import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createCallerFactory } from '../lib/trpc';
import { analyticsRouter } from '../routes/analytics';

vi.mock('../lib/supabase', () => ({
	supabase: {
		from: () => ({
			insert: vi.fn().mockResolvedValue({ error: null }),
		}),
	},
}));

const createCaller = createCallerFactory(analyticsRouter);
const caller = createCaller({ user: null });

describe('analyticsRouter', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('track mutation', () => {
		it('accepts valid input and returns success', async () => {
			const result = await caller.track({
				event_name: 'page_view',
				event_category: 'navigation',
				page_path: '/en/blog',
			});

			expect(result).toEqual({ success: true });
		});

		it('accepts full input with all optional fields', async () => {
			const result = await caller.track({
				event_name: 'like',
				event_category: 'engagement',
				page_path: '/en/blog/my-post',
				page_title: 'My Post',
				referrer: 'https://google.com',
				resource_type: 'post',
				resource_id: '123',
				session_id: 'sess_abc',
				locale: 'ko',
				properties: { query: 'search term', count: 5, active: true },
			});

			expect(result).toEqual({ success: true });
		});

		it('rejects empty event_name', async () => {
			await expect(
				caller.track({
					event_name: '',
					event_category: 'navigation',
				}),
			).rejects.toThrow();
		});

		it('rejects invalid event_category', async () => {
			await expect(
				caller.track({
					event_name: 'test',
					// @ts-expect-error -- testing invalid input
					event_category: 'invalid_category',
				}),
			).rejects.toThrow();
		});

		it('rejects invalid resource_type', async () => {
			await expect(
				caller.track({
					event_name: 'test',
					event_category: 'engagement',
					// @ts-expect-error -- testing invalid input
					resource_type: 'invalid_type',
				}),
			).rejects.toThrow();
		});

		it('rejects invalid locale', async () => {
			await expect(
				caller.track({
					event_name: 'test',
					event_category: 'engagement',
					// @ts-expect-error -- testing invalid input
					locale: 'fr',
				}),
			).rejects.toThrow();
		});

		it('rejects event_name exceeding max length', async () => {
			await expect(
				caller.track({
					event_name: 'a'.repeat(101),
					event_category: 'navigation',
				}),
			).rejects.toThrow();
		});

		it('rejects page_path exceeding max length', async () => {
			await expect(
				caller.track({
					event_name: 'test',
					event_category: 'navigation',
					page_path: 'a'.repeat(2001),
				}),
			).rejects.toThrow();
		});
	});
});
