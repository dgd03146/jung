import type { AlbumPhoto, Photo } from '@jung/shared/types';

export const transformPhoto = (photo: Photo, prefix = 'list'): AlbumPhoto => {
	return {
		key: `${prefix}-${photo.id}`,
		src: photo.image_url,
		width: photo.width,
		height: photo.height,
		alt: photo.alt ?? '',
		data: {
			id: photo.id,
			title: photo.title,
			description: photo.description,
			createdAt: photo.created_at,
			likes: photo.likes,
			views: photo.views,
			tags: photo.tags,
		},
	};
};
