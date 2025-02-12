import { trpc } from '@/fsd/shared';
import { COMMENTS_DEFAULT_ORDER, COMMENTS_LIMIT } from '@/fsd/shared';
import { useToast } from '@jung/design-system/components';
import { deleteCommentAction } from '../api/deleteCommentAction';
import { removeCommentAndReplies } from '../lib/removeCommentAndReplies';

export const useDeleteComment = () => {
	const utils = trpc.useUtils();
	const showToast = useToast();

	const mutateDeleteComment = async (commentId: string, postId: string) => {
		const previous = utils.comment.getCommentsByPostId.getInfiniteData({
			postId,
		});

		try {
			utils.comment.getCommentsByPostId.setInfiniteData(
				{ postId, order: COMMENTS_DEFAULT_ORDER, limit: COMMENTS_LIMIT },
				(oldData) => removeCommentAndReplies(oldData, commentId),
			);

			if (commentId.startsWith('temp-')) {
				showToast('Temporary comment has been deleted', 'success');
				return;
			}

			await deleteCommentAction(commentId, postId);

			await utils.comment.getCommentsByPostId.invalidate({
				postId,
				order: COMMENTS_DEFAULT_ORDER,
				limit: COMMENTS_LIMIT,
			});

			showToast('Comment has been deleted', 'success');
		} catch (error) {
			utils.comment.getCommentsByPostId.setInfiniteData(
				{ postId, order: COMMENTS_DEFAULT_ORDER, limit: COMMENTS_LIMIT },
				previous,
			);
			showToast('Failed to delete comment', 'error');
		}
	};

	return mutateDeleteComment;
};
