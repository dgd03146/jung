import { z } from 'zod';

export const SpotSchema = z.object({
	id: z.string().uuid(),
	title: z.string(),
	description: z.string(),
	address: z.string(),
	photos: z.array(
		z.object({
			id: z.string(),
			url: z.string().url(),
		}),
	),
	rating: z.number().min(0).max(5),
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
	category_id: z.string().uuid(),
});

export const SpotQueryParamsSchema = z.object({
	limit: z.number().min(1).max(100).default(10),
	cursor: z.string().optional(),
	category_id: z.string().uuid().optional(),
	q: z.string().optional(),
	sort: z.enum(['latest', 'rating', 'popular', 'oldest']).optional(),
});

export const SpotQueryResultSchema = z.object({
	items: z.array(SpotSchema),
	nextCursor: z.string().nullable(),
});

export type Spot = z.infer<typeof SpotSchema>;
export type SpotQueryParams = z.infer<typeof SpotQueryParamsSchema>;
export type SpotQueryResult = z.infer<typeof SpotQueryResultSchema>;

export type { Category } from './category';
