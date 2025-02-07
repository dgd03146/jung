'use server';

import { trpc } from '@/fsd/shared/api/trpc/server';
import { revalidatePath } from 'next/cache';

export async function toggleLikePhotoAction(photoId: string, userId: string) {
	const updatedPhoto = await trpc.photos.toggleLike({
		photoId,
		userId,
	});

	revalidatePath(`/gallery/photo/${photoId}`);

	return updatedPhoto;
}
