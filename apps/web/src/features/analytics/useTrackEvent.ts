'use client';

import type { TrackEventInput } from '@jung/api/routes/analytics';
import { useMutation } from '@tanstack/react-query';
import { useTRPC } from '@/fsd/app';
import { gtagEvent } from '@/fsd/shared';

type TrackEventParams = Pick<
	TrackEventInput,
	| 'event_name'
	| 'event_category'
	| 'resource_type'
	| 'resource_id'
	| 'properties'
>;

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
		// GA4 — spread properties first so explicit fields always win
		gtagEvent(params.event_name, {
			...params.properties,
			event_category: params.event_category,
			resource_type: params.resource_type,
			resource_id: params.resource_id,
		});

		// Locale validation
		const lang = document.documentElement.lang;
		const isValidLocale = VALID_LOCALES.includes(
			lang as (typeof VALID_LOCALES)[number],
		);
		const locale = isValidLocale ? (lang as 'ko' | 'en') : undefined;

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
