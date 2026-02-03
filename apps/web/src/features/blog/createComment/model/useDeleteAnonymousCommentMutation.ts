'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTRPC } from '@/fsd/app';
import {
	COMMENTS_DEFAULT_ORDER,
	COMMENTS_LIMIT,
	type CommentData,
} from '@/fsd/shared';
import { deleteAnonymousCommentAction } from '../api/deleteAnonymousCommentAction';

interface DeleteAnonymousCommentVariables {
	commentId: string;
	password: string;
	postId: string;
}

interface MutationContext {
	previousData: CommentData | undefined;
	postId: string;
}

export const useDeleteAnonymousCommentMutation = () => {
	const trpc = useTRPC();
	const queryClient = useQueryClient();

	const getQueryOptions = (postId: string) =>
		trpc.postComment.getCommentsByPostId.infiniteQueryOptions({
			postId,
			order: COMMENTS_DEFAULT_ORDER,
			limit: COMMENTS_LIMIT,
		});

	return useMutation<
		{ success: boolean },
		Error,
		DeleteAnonymousCommentVariables,
		MutationContext
	>({
		mutationFn: deleteAnonymousCommentAction,
		onMutate: async (variables) => {
			const { postId, commentId } = variables;
			const queryOptions = getQueryOptions(postId);

			await queryClient.cancelQueries({ queryKey: queryOptions.queryKey });

			const previousData = queryClient.getQueryData<CommentData>(
				queryOptions.queryKey,
			);

			// Optimistic update - 댓글 삭제
			queryClient.setQueryData<CommentData>(
				queryOptions.queryKey,
				(oldData) => {
					if (!oldData) return oldData;

					return {
						...oldData,
						pages: oldData.pages.map((page) => ({
							...page,
							items: page.items
								.filter((comment) => comment.id !== commentId)
								.map((comment) => ({
									...comment,
									// 답글도 필터링
									replies: comment.replies
										? comment.replies.filter((reply) => reply.id !== commentId)
										: [],
								})),
							totalCount: page.totalCount - 1,
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
