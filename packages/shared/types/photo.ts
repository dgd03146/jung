import { z } from 'zod';

export const PhotoSchema = z.object({
	id: z.string(),
	title: z.string(),
	image_url: z.string().url(),
	width: z.number().positive(),
	height: z.number().positive(),
	alt: z.string(),
	description: z.string().optional(),
	tags: z.array(z.string()).optional(),
	created_at: z.string(),
	updated_at: z.string().optional(),
	likes: z.number().default(0),
	views: z.number().default(0),
	liked_by: z.array(z.string()).optional(),
});

export type Photo = z.infer<typeof PhotoSchema>;

export interface AlbumPhoto {
	key: string;
	src: string;
	width: number;
	height: number;
	alt: string;
	data: {
		id?: string;
		title?: string;
		description?: string;
		tags?: string[];
		createdAt?: string;
		likes?: number;
		views?: number;
		author?: {
			name: string;
		};
	};
}

export interface PhotoQueryResult {
	items: Photo[];
	nextCursor: number | null;
}

export interface PhotoQueryParams {
	sort?: 'latest' | 'popular';
	q?: string;
}
