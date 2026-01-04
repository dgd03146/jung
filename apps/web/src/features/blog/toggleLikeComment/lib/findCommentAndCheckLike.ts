import type { Comment } from '@jung/shared/types';
import type { CommentData } from '@/fsd/shared';

interface CommentSearchResult {
	comment: Comment | undefined;
	isLiked: boolean;
}

/**
 * Finds a comment and checks if it's liked by the user
 * @param data - Comment data to search through
 * @param commentId - ID of the comment to find
 * @param userId - ID of the user to check like status
 */
export const findCommentAndCheckLike = (
	data: CommentData,
	commentId: string,
	userId: string,
): CommentSearchResult => {
	for (const page of data.pages) {
		for (const item of page.items) {
			if (item.id === commentId) {
				return {
					comment: item,
					isLiked: item.liked_by.includes(userId),
				};
			}

			if (item.replies) {
				for (const reply of item.replies) {
					if (reply.id === commentId) {
						return {
							comment: reply,
							isLiked: reply.liked_by.includes(userId),
						};
					}
				}
			}
		}
	}

	return { comment: undefined, isLiked: false };
};
