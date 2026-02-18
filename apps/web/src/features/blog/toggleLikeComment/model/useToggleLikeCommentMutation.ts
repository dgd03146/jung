'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getCommentsQueryInput } from '@/fsd/entities/blog';
import { type CommentData, useTRPC } from '@/fsd/shared';
import { toggleLikeCommentAction } from '../api/toggleLikeCommentAction';
import { findCommentAndCheckLike, replaceOptimisticLike } from '../lib';

type ToggleLikeVariables = {
	commentId: string;
	postId: string;
	userId?: string;
	anonymousId?: string;
};

export const useToggleLikeCommentMutation = () => {
	const trpc = useTRPC();
	const queryClient = useQueryClient();

	const queryOptions = (postId: string) =>
		trpc.postComment.getCommentsByPostId.infiniteQueryOptions(
			getCommentsQueryInput(postId),
		);

	const mutation = useMutation({
		mutationFn: async ({
			commentId,
			postId,
			userId,
			anonymousId,
		}: ToggleLikeVariables) => {
			const identifier = userId || anonymousId;
			if (!identifier) {
				throw new Error('userId 또는 anonymousId가 필요합니다');
			}

			const currentQueryOptions = queryOptions(postId);
			let existingData: CommentData | undefined;
			try {
				existingData =
					await queryClient.ensureInfiniteQueryData(currentQueryOptions);
			} catch (_fetchError) {
				throw new Error('Unable to fetch comments');
			}

			const { comment, isLiked } = findCommentAndCheckLike(
				existingData,
				commentId,
				identifier,
			);

			if (!comment) {
				throw new Error('Comment not found');
			}

			const originalComment = structuredClone(comment);
			const likeIncrement = isLiked ? -1 : 1;

			const likedBySet = new Set(comment.liked_by);
			if (isLiked) {
				likedBySet.delete(identifier);
			} else {
				likedBySet.add(identifier);
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
					anonymousId,
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
						mutationKey:
							trpc.postComment.toggleLike.mutationOptions().mutationKey,
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
