import { z } from 'zod';
import type { Photo } from './photo';

export const CollectionSchema = z.object({
	id: z.string(),
	title: z.string(),
	description: z.string().nullable(),
	cover_image: z.string().url(),
	photo_count: z.number().default(0),
	created_at: z.string(),
});

export const CollectionPhotoSchema = z.object({
	collection_id: z.string(),
	photo_id: z.number(),
	created_at: z.string(),
});

export const CreateCollectionSchema = z.object({
	title: z.string(),
	description: z.string().optional(),
	cover_image: z.string().url(),
});

export type Collection = z.infer<typeof CollectionSchema>;
export type CollectionPhoto = z.infer<typeof CollectionPhotoSchema>;
export type CreateCollectionInput = z.infer<typeof CreateCollectionSchema>;

export interface CollectionQueryResult {
	items: Collection[];
	nextCursor: number | null;
}

export interface CollectionPhotoQueryResult {
	items: Photo[]; // Photo 타입은 photo.ts에서 import
	nextCursor: number | null;
}
