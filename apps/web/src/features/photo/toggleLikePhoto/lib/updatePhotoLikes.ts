import type { Photo } from '@jung/shared/types';

export const updatePhotoLikes = (
	photo: Photo | undefined,
	likeDelta: number,
	userId: string,
) => {
	if (!photo) return photo;

	return {
		...photo,
		likes: photo.likes + likeDelta,
		liked_by:
			likeDelta > 0
				? [...(photo.liked_by || []), userId]
				: photo.liked_by?.filter((id: string) => id !== userId),
	};
};
