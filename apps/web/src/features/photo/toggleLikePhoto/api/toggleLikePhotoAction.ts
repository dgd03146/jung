'use server';

import { caller } from '@/fsd/shared/api/trpc/server';

export async function toggleLikePhotoAction(photoId: string, userId: string) {
	const updatedPhoto = await caller.photos.toggleLike({
		photoId,
		userId,
	});

	return updatedPhoto;
}
