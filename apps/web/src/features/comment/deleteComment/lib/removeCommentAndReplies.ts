import type { CommentData } from '@/fsd/shared';

/**
 * Removes a comment and its replies from the data
 * @param oldData - Existing comment data
 * @param commentId - ID of the comment to remove
 */
export const removeCommentAndReplies = (
	oldData: CommentData | undefined,
	commentId: string,
): CommentData => {
	if (!oldData) return { pages: [], pageParams: [] };
	return {
		...oldData,
		pages: oldData.pages.map((page) => ({
			...page,
			items: page.items
				.filter((item) => item.id !== commentId)
				.map((item) => ({
					...item,
					replies: item.replies?.filter((reply) => reply.id !== commentId),
				})),
		})),
	};
};
