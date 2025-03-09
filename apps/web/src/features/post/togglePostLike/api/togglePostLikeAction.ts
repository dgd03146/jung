'use server';

import { caller } from '@/fsd/shared/api/trpc/server';
import { revalidatePath } from 'next/cache';

export async function togglePostLikeAction(postId: string, userId: string) {
	const updatedPost = await caller.post.toggleLike({
		postId,
		userId: userId,
	});

	revalidatePath(`/blog/${postId}`);
	return updatedPost;
}
