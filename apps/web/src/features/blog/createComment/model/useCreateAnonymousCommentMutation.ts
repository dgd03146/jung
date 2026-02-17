'use client';

import type { CreateAnonymousCommentInput } from '@jung/shared/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
	COMMENTS_DEFAULT_ORDER,
	COMMENTS_LIMIT,
	type CommentData,
	useTRPC,
} from '@/fsd/shared';
import {
	createOptimisticAnonymousComment,
	updateOptimisticComment,
} from '../lib';

type CreateAnonymousCommentVariables = CreateAnonymousCommentInput;

export const useCreateAnonymousCommentMutation = () => {
	const trpc = useTRPC();
	const queryClient = useQueryClient();

	const getQueryOptions = (postId: string) =>
		trpc.postComment.getCommentsByPostId.infiniteQueryOptions({
			postId,
			order: COMMENTS_DEFAULT_ORDER,
			limit: COMMENTS_LIMIT,
		});

	return useMutation(
		trpc.postComment.createAnonymousComment.mutationOptions({
			onMutate: async (variables: CreateAnonymousCommentVariables) => {
				const { postId, parentId, content, anonymousId, nickname } = variables;
				const queryOptions = getQueryOptions(postId);

				await queryClient.cancelQueries({ queryKey: queryOptions.queryKey });

				const previousData = queryClient.getQueryData<CommentData>(
					queryOptions.queryKey,
				);

				const optimisticComment = createOptimisticAnonymousComment(
					content,
					anonymousId,
					nickname,
					postId,
					parentId,
				);

				queryClient.setQueryData(queryOptions.queryKey, (oldData) =>
					updateOptimisticComment(oldData, optimisticComment, parentId),
				);

				return { previousData, optimisticCommentId: optimisticComment.id };
			},
			onError: (_error, variables, context) => {
				if (context?.previousData) {
					queryClient.setQueryData(
						getQueryOptions(variables.postId).queryKey,
						context.previousData,
					);
				}
			},
			onSettled: async (_data, _error, variables) => {
				if (variables?.postId) {
					await queryClient.invalidateQueries({
						queryKey: getQueryOptions(variables.postId).queryKey,
					});
				}
			},
		}),
	);
};
