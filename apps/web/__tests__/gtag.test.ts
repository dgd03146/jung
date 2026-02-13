// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../src/shared/config/env', () => ({
	getGA4MeasurementId: () => 'G-TEST123',
}));

import { gtagEvent, pageview } from '../src/shared/lib/gtag';

describe('gtag utilities', () => {
	const mockGtag = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
		window.gtag = mockGtag;
	});

	afterEach(() => {
		// @ts-expect-error -- reset gtag
		delete window.gtag;
	});

	describe('pageview', () => {
		it('calls window.gtag with config and page_path', () => {
			pageview('/en/blog');

			expect(mockGtag).toHaveBeenCalledWith('config', 'G-TEST123', {
				page_path: '/en/blog',
			});
		});

		it('does nothing when window.gtag is undefined', () => {
			// @ts-expect-error -- reset gtag
			delete window.gtag;

			expect(() => pageview('/en/blog')).not.toThrow();
		});
	});

	describe('gtagEvent', () => {
		it('calls window.gtag with event action and params', () => {
			const params = {
				event_category: 'engagement',
				resource_type: 'post',
			};

			gtagEvent('like', params);

			expect(mockGtag).toHaveBeenCalledWith('event', 'like', params);
		});

		it('does nothing when window.gtag is undefined', () => {
			// @ts-expect-error -- reset gtag
			delete window.gtag;

			expect(() =>
				gtagEvent('like', { event_category: 'engagement' }),
			).not.toThrow();
		});
	});
});
