export const isPostLiked = (
	likedBy: string[],
	userId: string | undefined,
): boolean => {
	if (!userId) return false;
	return likedBy.includes(userId);
};
