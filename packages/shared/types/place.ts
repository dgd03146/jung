import { z } from 'zod';

export const PlacePhotoSchema = z.object({
	id: z.string().uuid().optional(),
	url: z.string().url(),
	status: z.enum(['existing', 'new', 'deleted']),
});

export const PlaceSchema = z.object({
	id: z.string().uuid(),
	title: z.string(),
	description: z.string(),
	address: z.string(),
	photos: z.array(PlacePhotoSchema),

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

export const PlaceQueryParamsSchema = z.object({
	limit: z.number().min(1).max(100).default(10),
	cursor: z.string().optional(),
	cat: z.string().optional(),
	q: z.string().optional(),
	sort: z.enum(['latest', 'popular', 'oldest']).optional(),
});

export const PlaceQueryResultSchema = z.object({
	items: z.array(PlaceSchema),
	nextCursor: z.string().nullable().optional(),
});

export type PlacePhoto = z.infer<typeof PlacePhotoSchema>;
export type Place = z.infer<typeof PlaceSchema>;
export type PlaceQueryParams = z.infer<typeof PlaceQueryParamsSchema>;
export type PlaceQueryResult = z.infer<typeof PlaceQueryResultSchema>;

export type { Category } from './category';

export interface PlaceImageUpload extends PlacePhoto {
	file?: File;
	preview?: string;
}

export type PlaceSort = 'latest' | 'oldest' | 'popular';

export type PlaceWithCategory = Place & {
	categories: {
		name: string;
	};
	category_id: string;
};
