import type { CommentData } from '@/fsd/shared';
import type { Comment } from '@jung/shared/types';

/**
 * Recursively searches for a comment
 * @private
 */
export const findCommentRecursively = (
	item: Comment,
	commentId: string,
): Comment | undefined => {
	if (item.id === commentId) return item;
	if (item.replies) {
		for (const reply of item.replies) {
			const found = findCommentRecursively(reply, commentId);
			if (found) return found;
		}
	}
	return undefined;
};

/**
 * Finds a comment by its ID
 * @param data - Comment data to search through
 * @param commentId - ID of the comment to find
 */
export const findCommentById = (
	data: CommentData,
	commentId: string,
): Comment | undefined => {
	for (const page of data.pages) {
		for (const item of page.items) {
			const comment = findCommentRecursively(item, commentId);
			if (comment) return comment;
		}
	}
	return undefined;
};
