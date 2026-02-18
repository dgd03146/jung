'use client';

import type { Comment } from '@jung/shared/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getCommentsQueryInput } from '@/fsd/entities/blog';
import { type CommentData, useTRPC } from '@/fsd/shared';
import { updateAnonymousCommentAction } from '../api/updateAnonymousCommentAction';

interface UpdateAnonymousCommentVariables {
	commentId: string;
	content: string;
	password: string;
	postId: string;
}

interface MutationContext {
	previousData: CommentData | undefined;
	postId: string;
}

export const useUpdateAnonymousCommentMutation = () => {
	const trpc = useTRPC();
	const queryClient = useQueryClient();

	const getQueryOptions = (postId: string) =>
		trpc.postComment.getCommentsByPostId.infiniteQueryOptions(
			getCommentsQueryInput(postId),
		);

	return useMutation<
		Comment,
		Error,
		UpdateAnonymousCommentVariables,
		MutationContext
	>({
		mutationFn: updateAnonymousCommentAction,
		onMutate: async (variables) => {
			const { postId, commentId, content } = variables;
			const queryOptions = getQueryOptions(postId);

			await queryClient.cancelQueries({ queryKey: queryOptions.queryKey });

			const previousData = queryClient.getQueryData<CommentData>(
				queryOptions.queryKey,
			);

			// Optimistic update
			queryClient.setQueryData<CommentData>(
				queryOptions.queryKey,
				(oldData) => {
					if (!oldData) return oldData;

					return {
						...oldData,
						pages: oldData.pages.map((page) => ({
							...page,
							items: page.items.map((comment) => {
								if (comment.id === commentId) {
									return { ...comment, content };
								}
								// 답글인 경우도 확인
								if (comment.replies) {
									return {
										...comment,
										replies: comment.replies.map((reply) =>
											reply.id === commentId ? { ...reply, content } : reply,
										),
									};
								}
								return comment;
							}),
						})),
					};
				},
			);

			return { previousData, postId };
		},
		onError: (_error, _variables, context) => {
			if (context?.previousData && context?.postId) {
				queryClient.setQueryData(
					getQueryOptions(context.postId).queryKey,
					context.previousData,
				);
			}
		},
		onSettled: async (_data, _error, _variables, context) => {
			if (context?.postId) {
				await queryClient.invalidateQueries({
					queryKey: getQueryOptions(context.postId).queryKey,
				});
			}
		},
	});
};
