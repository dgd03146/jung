import { getCommentsQueryKey, trpc, useSupabaseAuth } from '@/fsd/shared';

import { useToast } from '@jung/design-system';
import { updateCommentAction } from '../api/updateCommentAction';
import { findCommentById, replaceUpdatedComment } from '../lib';

export const useUpdateComment = () => {
	const utils = trpc.useUtils();
	const { user } = useSupabaseAuth();
	const showToast = useToast();

	const handleError = (error: unknown) => {
		if (error instanceof Error) {
			showToast(`Failed to update comment: ${error.message}`, 'error');
		} else {
			showToast('Failed to update comment', 'error');
		}
		console.error('Error editing comment:', error);
	};

	const mutateUpdateComment = async (
		commentId: string,
		content: string,
		postId: string,
	) => {
		if (!user) {
			showToast('Please log in to update comments', 'error');
			return;
		}

		const queryKey = getCommentsQueryKey(postId);

		const existingData =
			utils.comment.getCommentsByPostId.getInfiniteData(queryKey);

		if (!existingData) {
			showToast('Comment data not found', 'error');
			return;
		}

		const previousComment = findCommentById(existingData, commentId);

		if (!previousComment) {
			showToast('Comment to update not found', 'error');
			return;
		}

		utils.comment.getCommentsByPostId.setInfiniteData(queryKey, (oldData) =>
			replaceUpdatedComment(oldData, commentId, {
				...previousComment,
				content,
			}),
		);

		try {
			const updatedComment = await updateCommentAction(
				commentId,
				content,
				postId,
			);

			utils.comment.getCommentsByPostId.setInfiniteData(queryKey, (oldData) =>
				replaceUpdatedComment(oldData, commentId, updatedComment),
			);

			showToast('Comment has been updated', 'success');

			return updatedComment;
		} catch (error) {
			utils.comment.getCommentsByPostId.setInfiniteData(queryKey, (oldData) =>
				replaceUpdatedComment(oldData, commentId, previousComment),
			);
			handleError(error);
		}
	};

	return mutateUpdateComment;
};
