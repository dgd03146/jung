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
		pages: oldData.pages.map((page) => {
			const hasTargetComment = page.items.some(
				(item) =>
					item.id === commentId ||
					item.replies?.some((reply) => reply.id === commentId),
			);

			if (!hasTargetComment) return page;

			return {
				...page,
				items: page.items

					.filter((item) => item.id !== commentId)
					.map((item) => {
						if (item.replies?.some((reply) => reply.id === commentId)) {
							return {
								...item,
								replies: item.replies.filter((reply) => reply.id !== commentId),
							};
						}
						return item;
					}),
			};
		}),
	};
};
