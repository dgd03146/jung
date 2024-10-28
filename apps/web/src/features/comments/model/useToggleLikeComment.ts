import { trpc } from '@/fsd/shared';
import { COMMENTS_DEFAULT_ORDER, COMMENTS_LIMIT } from '@/fsd/shared';
import { useSupabaseAuth } from '@/fsd/shared/lib';
import { useToast } from '@jung/design-system/components';
import { toggleLikeCommentAction } from '../actions/toggleLikeCommentAction';
import { findCommentAndCheckLike, updateCommentLikesInData } from '../lib';

export const useToggleLikeComment = () => {
	const utils = trpc.useUtils();
	const { user } = useSupabaseAuth();
	const showToast = useToast();

	const handleError = (error: unknown) => {
		if (error instanceof Error) {
			showToast(`Failed to toggle like: ${error.message}`, 'error');
		} else {
			showToast('Failed to toggle like', 'error');
		}
		console.error('Error toggling comment like:', error);
	};

	const mutateToggleLikeComment = async (commentId: string, postId: string) => {
		if (!user) {
			showToast('Please log in to like comments', 'error');
			return;
		}

		const existingData = utils.comment.getCommentsByPostId.getInfiniteData({
			postId,
			order: COMMENTS_DEFAULT_ORDER,
			limit: COMMENTS_LIMIT,
		});

		if (!existingData) {
			showToast('Comment data not found', 'error');
			return;
		}

		const { comment, isLiked } = findCommentAndCheckLike(
			existingData,
			commentId,
			user.id,
		);
		if (!comment) {
			showToast('Comment not found', 'error');
			return;
		}

		const likeIncrement = isLiked ? -1 : 1;

		// Optimistic update
		utils.comment.getCommentsByPostId.setInfiniteData(
			{ postId, order: COMMENTS_DEFAULT_ORDER, limit: COMMENTS_LIMIT },
			(oldData) =>
				updateCommentLikesInData(oldData, commentId, likeIncrement, user.id),
		);

		try {
			await toggleLikeCommentAction(commentId, postId, user.id);
		} catch (error) {
			// Rollback on error
			utils.comment.getCommentsByPostId.setInfiniteData(
				{ postId, order: COMMENTS_DEFAULT_ORDER, limit: COMMENTS_LIMIT },
				(oldData) =>
					updateCommentLikesInData(oldData, commentId, -likeIncrement, user.id),
			);
			handleError(error);
		}
	};

	return mutateToggleLikeComment;
};
