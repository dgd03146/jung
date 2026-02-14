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
const SESSION_STORAGE_KEY = 'analytics_session_id';

function resolveLocale(): 'ko' | 'en' | undefined {
	const lang = document.documentElement.lang;
	const isValidLocale = (VALID_LOCALES as readonly string[]).includes(lang);
	return isValidLocale ? (lang as 'ko' | 'en') : undefined;
}

function getOrCreateSessionId(): string {
	try {
		let sessionId = sessionStorage.getItem(SESSION_STORAGE_KEY);
		if (!sessionId) {
			sessionId = `sess_${crypto.randomUUID()}`;
			sessionStorage.setItem(SESSION_STORAGE_KEY, sessionId);
		}
		return sessionId;
	} catch {
		return `sess_${crypto.randomUUID()}`;
	}
}

function sendToGA4(params: TrackEventParams) {
	gtagEvent(params.event_name, {
		...params.properties,
		event_category: params.event_category,
		resource_type: params.resource_type,
		resource_id: params.resource_id,
	});
}

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
		sendToGA4(params);

		mutation.mutate({
			...params,
			page_path: window.location.pathname,
			page_title: document.title,
			referrer: document.referrer || undefined,
			session_id: getOrCreateSessionId(),
			locale: resolveLocale(),
		});
	};

	return { trackEvent };
}
