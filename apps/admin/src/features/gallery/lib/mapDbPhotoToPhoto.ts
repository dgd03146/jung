import type { Photo } from '@jung/shared/types';

interface DbPhoto {
	id: number;
	title: string;
	image_url: string;
	width: number;
	height: number;
	alt: string;
	description: string | null;
	tags: string[] | null;
	created_at: string | null;
	updated_at: string | null;
	likes: number | null;
	views: number | null;
	liked_by: string[] | null;
}

export const mapDbPhotoToPhoto = (dbPhoto: DbPhoto): Photo => ({
	id: String(dbPhoto.id),
	title: dbPhoto.title,
	image_url: dbPhoto.image_url,
	width: dbPhoto.width,
	height: dbPhoto.height,
	alt: dbPhoto.alt,
	created_at: dbPhoto.created_at ?? new Date().toISOString(),
	likes: dbPhoto.likes ?? 0,
	views: dbPhoto.views ?? 0,
	description: dbPhoto.description ?? undefined,
	tags: dbPhoto.tags ?? undefined,
	updated_at: dbPhoto.updated_at ?? undefined,
	liked_by: dbPhoto.liked_by ?? undefined,
});
