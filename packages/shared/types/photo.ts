import { z } from 'zod';

// Supabase 테이블 스키마
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
	likes: z.number().default(0),
	views: z.number().default(0),
	type: z.enum(['gallery', 'collection']).optional(),
	author_name: z.string().optional(),
});

// Supabase 테이블 타입
export type Photo = z.infer<typeof PhotoSchema>;

export interface CustomPhoto {
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
