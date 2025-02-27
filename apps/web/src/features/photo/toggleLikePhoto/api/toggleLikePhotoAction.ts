'use server';

import { trpc } from '@/fsd/shared/api/trpc/server';

export async function toggleLikePhotoAction(photoId: string, userId: string) {
	const updatedPhoto = await trpc.photos.toggleLike({
		photoId,
		userId,
	});

	return updatedPhoto;
}
