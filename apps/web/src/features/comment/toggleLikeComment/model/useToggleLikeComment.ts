'use client';

import { useTRPC } from '@/fsd/app';
import {
	COMMENTS_DEFAULT_ORDER,
	COMMENTS_LIMIT,
	type CommentData,
} from '@/fsd/shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleLikeCommentAction } from '../api/toggleLikeCommentAction';
import { findCommentAndCheckLike, replaceOptimisticLike } from '../lib';

type ToggleLikeVariables = {
	commentId: string;
	postId: string;
	userId: string;
};

export const useToggleLikeComment = () => {
	const trpc = useTRPC();
	const queryClient = useQueryClient();

	const queryOptions = (postId: string) =>
		trpc.comment.getCommentsByPostId.infiniteQueryOptions({
			postId,
			order: COMMENTS_DEFAULT_ORDER,
			limit: COMMENTS_LIMIT,
		});

	const mutation = useMutation({
		mutationFn: async ({ commentId, postId, userId }: ToggleLikeVariables) => {
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
				userId,
			);

			if (!comment) {
				throw new Error('Comment not found');
			}

			const originalComment = structuredClone(comment);
			const likeIncrement = isLiked ? -1 : 1;

			const likedBySet = new Set(comment.liked_by);
			if (isLiked) {
				likedBySet.delete(userId);
			} else {
				likedBySet.add(userId);
			}

			const tempComment = {
				...comment,
				likes: comment.likes + likeIncrement,
				liked_by: Array.from(likedBySet),
				$optimistic: true,
			};

			queryClient.setQueryData(currentQueryOptions.queryKey, (oldData) =>
				replaceOptimisticLike(oldData, commentId, tempComment),
			);

			try {
				const serverComment = await toggleLikeCommentAction({
					commentId,
					postId,
					userId,
				});
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
		onSettled: async (_data, _error, variables) => {
			if (variables?.commentId) {
				if (
					queryClient.isMutating({
						mutationKey: trpc.comment.toggleLike.mutationOptions().mutationKey,
					}) === 1
				) {
					await queryClient.invalidateQueries({
						queryKey: queryOptions(variables.postId).queryKey,
					});
				}
			}
		},
	});

	return { toggleLike: mutation.mutate, isPending: mutation.isPending };
};
