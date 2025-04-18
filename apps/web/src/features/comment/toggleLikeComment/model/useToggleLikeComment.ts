'use client';

import { useTRPC } from '@/fsd/app';
import {
	COMMENTS_DEFAULT_ORDER,
	COMMENTS_LIMIT,
	type CommentData,
	useSupabaseAuth,
} from '@/fsd/shared';
import { useToast } from '@jung/design-system/components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleLikeCommentAction } from '../api/toggleLikeCommentAction';
import { findCommentAndCheckLike, replaceOptimisticLike } from '../lib';

export const useToggleLikeComment = () => {
	const trpc = useTRPC();
	const queryClient = useQueryClient();
	const { user } = useSupabaseAuth();
	const showToast = useToast();

	const queryOptions = (postId: string) =>
		trpc.comment.getCommentsByPostId.infiniteQueryOptions({
			postId,
			order: COMMENTS_DEFAULT_ORDER,
			limit: COMMENTS_LIMIT,
		});

	const mutation = useMutation({
		mutationFn: async ({
			commentId,
			postId,
		}: { commentId: string; postId: string }) => {
			if (!user) {
				throw new Error('Please log in to like comments');
			}

			const currentQueryOptions = queryOptions(postId);
			let existingData: CommentData | undefined;
			try {
				existingData =
					await queryClient.ensureInfiniteQueryData(currentQueryOptions);
			} catch (fetchError) {
				throw new Error('Unable to fetch comments');
			}

			const { comment, isLiked } = findCommentAndCheckLike(
				existingData,
				commentId,
				user.id,
			);

			if (!comment) {
				throw new Error('Comment not found');
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

			queryClient.setQueryData(currentQueryOptions.queryKey, (oldData) =>
				replaceOptimisticLike(oldData, commentId, tempComment),
			);

			try {
				const serverComment = await toggleLikeCommentAction(
					commentId,
					postId,
					user.id,
				);
				return {
					serverComment,
					originalComment,
					queryKey: currentQueryOptions.queryKey,
				};
			} catch (error) {
				queryClient.setQueryData(currentQueryOptions.queryKey, (oldData) =>
					replaceOptimisticLike(oldData, commentId, originalComment),
				);
				throw error;
			}
		},
		onSuccess: (data) => {
			queryClient.setQueryData(data.queryKey, (oldData) =>
				replaceOptimisticLike(
					oldData,
					data.originalComment.id,
					data.serverComment,
				),
			);
		},
		onError: (error, variables) => {
			const message =
				error instanceof Error ? error.message : 'Failed to toggle like';
			if (message !== 'Please log in to like comments') {
				showToast(message, 'error');
			}
			console.error('Error toggling comment like:', error);
		},
	});

	return { mutate: mutation.mutate, isPending: mutation.isPending };
};
