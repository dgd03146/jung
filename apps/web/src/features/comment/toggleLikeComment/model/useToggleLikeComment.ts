import {
	COMMENTS_DEFAULT_ORDER,
	COMMENTS_LIMIT,
	trpc,
	useSupabaseAuth,
} from '@/fsd/shared';
import { useToast } from '@jung/design-system';
import { toggleLikeCommentAction } from '../api/toggleLikeCommentAction';
import { findCommentAndCheckLike, replaceOptimisticLike } from '../lib';

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

		const originalData = structuredClone(existingData);

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

		const tempComment = {
			...comment,
			likes: comment.likes + likeIncrement,
			liked_by: isLiked
				? comment.liked_by.filter((id) => id !== user.id)
				: [...comment.liked_by, user.id],
			$optimistic: true,
		};

		utils.comment.getCommentsByPostId.setInfiniteData(
			{ postId, order: COMMENTS_DEFAULT_ORDER, limit: COMMENTS_LIMIT },
			(oldData) => replaceOptimisticLike(oldData, commentId, tempComment),
		);

		try {
			const serverComment = await toggleLikeCommentAction(
				commentId,
				postId,
				user.id,
			);

			utils.comment.getCommentsByPostId.setInfiniteData(
				{ postId, order: COMMENTS_DEFAULT_ORDER, limit: COMMENTS_LIMIT },
				(oldData) => replaceOptimisticLike(oldData, commentId, serverComment),
			);
		} catch (error) {
			utils.comment.getCommentsByPostId.setInfiniteData(
				{ postId, order: COMMENTS_DEFAULT_ORDER, limit: COMMENTS_LIMIT },
				() => originalData,
			);

			handleError(error);
		}
	};

	return mutateToggleLikeComment;
};
