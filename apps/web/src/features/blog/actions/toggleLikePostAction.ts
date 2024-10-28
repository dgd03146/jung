'use server';

import { trpc } from '@/fsd/shared/trpc/lib/server';
import { revalidatePath } from 'next/cache';

export async function toggleLikePostAction(postId: string, userId: string) {
	const updatedPost = await trpc.post.toggleLike({
		postId,
		userId: userId,
	});

	revalidatePath(`/blog/${postId}`);
	return updatedPost;
}
