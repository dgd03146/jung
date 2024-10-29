import type { Post } from '@jung/shared/types';

export const updatePostLikesInData = (
	oldData: Post | undefined | null,
	postId: string,
	increment: number,
	userId: string,
): Post | undefined => {
	if (!oldData) return undefined;

	const newLikedBy =
		increment > 0
			? [...oldData.liked_by, userId]
			: oldData.liked_by.filter((id) => id !== userId);

	return {
		...oldData,
		likes: oldData.likes + increment,
		liked_by: newLikedBy,
	};
};

export const checkIsLiked = (
	post: Post | undefined,
	userId: string | undefined,
): boolean => {
	if (!post || !userId) return false;
	return post.liked_by.includes(userId);
};
