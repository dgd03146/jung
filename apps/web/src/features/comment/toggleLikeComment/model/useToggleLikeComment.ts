'use client';

import { useTRPC } from '@/fsd/app';
import {
	COMMENTS_DEFAULT_ORDER,
	COMMENTS_LIMIT,
	type CommentData,
	useSupabaseAuth,
} from '@/fsd/shared';
import { useToast } from '@jung/design-system/components';
import { useQueryClient } from '@tanstack/react-query';
import { toggleLikeCommentAction } from '../api/toggleLikeCommentAction';
import { findCommentAndCheckLike, replaceOptimisticLike } from '../lib';

export const useToggleLikeComment = () => {
	const trpc = useTRPC();
	const queryClient = useQueryClient();
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

		const queryOptions = trpc.comment.getCommentsByPostId.infiniteQueryOptions({
			postId,
			order: COMMENTS_DEFAULT_ORDER,
			limit: COMMENTS_LIMIT,
		});

		let existingData: CommentData | undefined;
		try {
			existingData = await queryClient.ensureInfiniteQueryData(queryOptions);
		} catch (fetchError) {
			showToast('Unable to fetch comments', 'error');
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

		const originalComment = structuredClone(comment);

		const likeIncrement = isLiked ? -1 : 1;

		const tempComment = {
			...comment,
			likes: comment.likes + likeIncrement,
			liked_by: isLiked
				? comment.liked_by.filter((id) => id !== user.id)
				: [...comment.liked_by, user.id],
			$optimistic: true,
		};

		queryClient.setQueryData(queryOptions.queryKey, (oldData) =>
			replaceOptimisticLike(oldData, commentId, tempComment),
		);

		try {
			const serverComment = await toggleLikeCommentAction(
				commentId,
				postId,
				user.id,
			);

			queryClient.setQueryData(queryOptions.queryKey, (oldData) =>
				replaceOptimisticLike(oldData, commentId, serverComment),
			);
		} catch (error) {
			queryClient.setQueryData(queryOptions.queryKey, (oldData) =>
				replaceOptimisticLike(oldData, commentId, originalComment),
			);

			handleError(error);
		}
	};

	return mutateToggleLikeComment;
};
