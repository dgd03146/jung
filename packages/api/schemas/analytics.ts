import { z } from 'zod';

export const MAX_EVENT_NAME_LENGTH = 100;
export const MAX_PATH_LENGTH = 2000;
export const MAX_TITLE_LENGTH = 500;
export const MAX_ID_LENGTH = 200;

export const trackInputSchema = z.object({
	event_name: z.string().min(1).max(MAX_EVENT_NAME_LENGTH),
	event_category: z.enum([
		'navigation',
		'engagement',
		'content',
		'interaction',
	]),
	page_path: z.string().max(MAX_PATH_LENGTH).optional(),
	page_title: z.string().max(MAX_TITLE_LENGTH).optional(),
	referrer: z.string().max(MAX_PATH_LENGTH).optional(),
	resource_type: z
		.enum(['post', 'photo', 'place', 'guestbook', 'comment'])
		.optional(),
	resource_id: z.string().max(MAX_ID_LENGTH).optional(),
	session_id: z.string().max(MAX_ID_LENGTH).optional(),
	locale: z.enum(['ko', 'en']).optional(),
	properties: z
		.record(z.union([z.string(), z.number(), z.boolean(), z.null()]))
		.optional(),
});

export type TrackEventInput = z.infer<typeof trackInputSchema>;
