'use client';

import { useMutation } from '@tanstack/react-query';
import { useTRPC } from '@/fsd/app';
import { gtagEvent } from '@/fsd/shared';

type TrackEventParams = {
	event_name: string;
	event_category: 'navigation' | 'engagement' | 'content' | 'interaction';
	resource_type?: 'post' | 'photo' | 'place' | 'guestbook' | 'comment';
	resource_id?: string;
	properties?: Record<string, string | number | boolean | null>;
};

const VALID_LOCALES = ['ko', 'en'] as const;

export function useTrackEvent() {
	const trpc = useTRPC();

	const mutation = useMutation(
		trpc.analytics.track.mutationOptions({
			onError: (error) => {
				console.warn('[Analytics]', error.message);
			},
		}),
	);

	const trackEvent = (params: TrackEventParams) => {
		// GA4
		gtagEvent(params.event_name, {
			event_category: params.event_category,
			resource_type: params.resource_type,
			resource_id: params.resource_id,
			...params.properties,
		});

		// Locale 검증
		const lang = document.documentElement.lang;
		const locale = VALID_LOCALES.includes(
			lang as (typeof VALID_LOCALES)[number],
		)
			? (lang as 'ko' | 'en')
			: undefined;

		// Supabase (fire-and-forget)
		mutation.mutate({
			...params,
			page_path: window.location.pathname,
			page_title: document.title,
			referrer: document.referrer || undefined,
			session_id: getOrCreateSessionId(),
			locale,
		});
	};

	return { trackEvent };
}

function getOrCreateSessionId(): string {
	const key = 'analytics_session_id';
	try {
		let sessionId = sessionStorage.getItem(key);
		if (!sessionId) {
			sessionId = `sess_${crypto.randomUUID()}`;
			sessionStorage.setItem(key, sessionId);
		}
		return sessionId;
	} catch {
		return `sess_${crypto.randomUUID()}`;
	}
}
