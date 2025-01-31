import type { Post } from '@jung/shared/types';

export const updatePostLikes = (
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
