import { trpc } from '@/fsd/shared';
import { COMMENTS_DEFAULT_ORDER, COMMENTS_LIMIT } from '@/fsd/shared';
import { useToast } from '@jung/design-system/components';
import type { CommentQueryResult } from '@jung/shared/types';
import type { InfiniteData } from '@tanstack/react-query';
import { deleteCommentAction } from '../actions/deleteCommentAction';
import { removeCommentAndRepliesFromData } from '../lib';

type CommentData = InfiniteData<CommentQueryResult, string | null>;

export const useDeleteComment = () => {
	const utils = trpc.useUtils();
	const showToast = useToast();

	const mutateDeleteComment = async (commentId: string, postId: string) => {
		try {
			await deleteCommentAction(commentId, postId);

			// Optimistic update
			utils.comment.getCommentsByPostId.setInfiniteData(
				{ postId, order: COMMENTS_DEFAULT_ORDER, limit: COMMENTS_LIMIT },
				(oldData) => removeCommentAndRepliesFromData(oldData, commentId),
			);

			showToast('Comment deleted successfully', 'success');
		} catch (error) {
			showToast('Failed to delete comment', 'error');
			console.error('Error deleting comment:', error);
		}
	};

	return mutateDeleteComment;
};
