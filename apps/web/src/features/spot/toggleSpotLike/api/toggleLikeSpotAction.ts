'use server';

import { trpc } from '@/fsd/shared/api/trpc/server';
import { revalidatePath } from 'next/cache';

export async function toggleLikeSpotAction({
	spotId,
	userId,
}: { spotId: string; userId: string }) {
	const updatedSpot = await trpc.spot.toggleLike({
		spotId,
		userId,
	});

	revalidatePath(`/spots/${spotId}`);

	return updatedSpot;
}
