import { z } from 'zod';

export const SpotPhotoSchema = z.object({
	id: z.string().uuid().optional(),
	url: z.string().url(),
	status: z.enum(['existing', 'new', 'deleted']),
});

export const SpotSchema = z.object({
	id: z.string().uuid(),
	title: z.string(),
	description: z.string(),
	address: z.string(),
	photos: z.array(SpotPhotoSchema),

	coordinates: z.object({
		lat: z.number(),
		lng: z.number(),
	}),

	created_at: z.string().datetime(),
	updated_at: z.string().datetime(),
	tags: z.string().array().optional(),
	tips: z.string().array().optional(),
	likes: z.number(),
	liked_by: z.array(z.string()),
	category: z.string().uuid(),
	category_id: z.string().uuid().optional(),
});

export const SpotQueryParamsSchema = z.object({
	limit: z.number().min(1).max(100).default(10),
	cursor: z.string().optional(),
	cat: z.string().optional(),
	q: z.string().optional(),
	sort: z.enum(['latest', 'popular', 'oldest']).optional(),
});

export const SpotQueryResultSchema = z.object({
	items: z.array(SpotSchema),
	nextCursor: z.string().nullable(),
});

export type SpotPhoto = z.infer<typeof SpotPhotoSchema>;
export type Spot = z.infer<typeof SpotSchema>;
export type SpotQueryParams = z.infer<typeof SpotQueryParamsSchema>;
export type SpotQueryResult = z.infer<typeof SpotQueryResultSchema>;

export type { Category } from './category';

export interface SpotImageUpload extends SpotPhoto {
	file?: File;
	preview?: string;
}

export type SpotSort = 'latest' | 'oldest' | 'popular';
