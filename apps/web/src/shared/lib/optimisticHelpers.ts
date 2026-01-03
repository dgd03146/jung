type LikeInfo = {
	likes: number;
	liked_by: string[];
};

export const toggleLikeOptimistic = (
	old: LikeInfo | undefined,
	userId: string,
): LikeInfo | undefined => {
	if (!old) return old;

	const likedBySet = new Set(old.liked_by);
	const isLiked = likedBySet.has(userId);

	if (isLiked) {
		likedBySet.delete(userId);
	} else {
		likedBySet.add(userId);
	}

	return {
		likes: old.likes + (isLiked ? -1 : 1),
		liked_by: Array.from(likedBySet),
	};
};

export const createTempId = (prefix: string): string =>
	`temp-${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
