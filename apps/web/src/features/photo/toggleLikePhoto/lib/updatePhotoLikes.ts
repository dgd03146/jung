import type { Photo } from '@jung/shared/types';

export const updatePhotoLikes = (
	photo: Photo | undefined,
	likeDelta: number,
	userId: string,
) => {
	if (!photo) return photo;

	const newLikes = Math.max(0, photo.likes + likeDelta);

	const likedBy = photo.liked_by || [];

	let newLikedBy: string[];
	if (likeDelta > 0) {
		newLikedBy = likedBy.includes(userId) ? likedBy : [...likedBy, userId];
	} else {
		newLikedBy = likedBy.filter((id: string) => id !== userId);
	}

	const updated = {
		...photo,
		likes: newLikes,
		liked_by: newLikedBy,
	};

	return updated;
};
