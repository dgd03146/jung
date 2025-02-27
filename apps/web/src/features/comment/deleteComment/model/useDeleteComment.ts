import { getCommentsQueryKey, trpc } from '@/fsd/shared';
import { useToast } from '@jung/design-system/components';
import { deleteCommentAction } from '../api/deleteCommentAction';
import { removeCommentAndReplies } from '../lib/removeCommentAndReplies';

export const useDeleteComment = () => {
	const utils = trpc.useUtils();
	const showToast = useToast();

	const mutateDeleteComment = async (commentId: string, postId: string) => {
		const queryKey = getCommentsQueryKey(postId);

		const previous =
			utils.comment.getCommentsByPostId.getInfiniteData(queryKey);

		try {
			utils.comment.getCommentsByPostId.setInfiniteData(queryKey, (oldData) =>
				removeCommentAndReplies(oldData, commentId),
			);

			if (commentId.startsWith('temp-')) {
				showToast('Temporary comment has been deleted', 'success');
				return;
			}

			await deleteCommentAction(commentId, postId);

			showToast('Comment has been deleted', 'success');
		} catch (error) {
			if (previous) {
				utils.comment.getCommentsByPostId.setInfiniteData(queryKey, previous);
			}

			if (error instanceof Error) {
				showToast(`Failed to delete comment: ${error.message}`, 'error');
			} else {
				showToast('Failed to delete comment', 'error');
			}
		}
	};

	return mutateDeleteComment;
};
