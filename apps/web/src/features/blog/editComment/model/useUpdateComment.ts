'use client';

import { useToast } from '@jung/design-system/components';
import type { Comment } from '@jung/shared/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
	COMMENTS_DEFAULT_ORDER,
	COMMENTS_LIMIT,
	type CommentData,
	useTRPC,
} from '@/fsd/shared';
import { updateCommentAction } from '../api/updateCommentAction';
import { findCommentById, replaceUpdatedComment } from '../lib';

interface UpdateCommentContext {
	previousData?: CommentData;
	originalComment?: Comment | null;
}

export const useUpdateCommentMutation = () => {
	const trpc = useTRPC();
	const queryClient = useQueryClient();
	const showToast = useToast();

	const getQueryOptions = (postId: string) =>
		trpc.postComment.getCommentsByPostId.infiniteQueryOptions({
			postId,
			order: COMMENTS_DEFAULT_ORDER,
			limit: COMMENTS_LIMIT,
		});

	const mutation = useMutation<
		Comment,
		Error,
		{ commentId: string; content: string; postId: string },
		UpdateCommentContext
	>({
		mutationFn: updateCommentAction,

		onMutate: async (variables) => {
			const { postId, commentId, content } = variables;
			const queryOptions = getQueryOptions(postId);

			await queryClient.cancelQueries({ queryKey: queryOptions.queryKey });

			const previousData = queryClient.getQueryData<CommentData>(
				queryOptions.queryKey,
			);

			let originalComment: Comment | null = null;
			if (previousData) {
				originalComment = findCommentById(previousData, commentId) ?? null;
			}

			if (previousData && originalComment) {
				const optimisticComment = { ...originalComment, content };
				queryClient.setQueryData(queryOptions.queryKey, (oldData) =>
					replaceUpdatedComment(oldData, commentId, optimisticComment),
				);
			}

			return { previousData, originalComment };
		},

		onError: (error, variables, context) => {
			if (context?.previousData) {
				queryClient.setQueryData(
					getQueryOptions(variables.postId).queryKey,
					context.previousData,
				);
			} else {
				queryClient.invalidateQueries({
					queryKey: getQueryOptions(variables.postId).queryKey,
				});
			}

			showToast(`Failed to update comment: ${error.message}`, 'error');
			console.error('Error editing comment:', error);
		},

		onSuccess: (_data, _variables, _context) => {},

		onSettled: async (_data, _error, variables, _context) => {
			if (variables?.postId) {
				if (
					queryClient.isMutating({
						mutationKey:
							trpc.postComment.updateComment.mutationOptions().mutationKey,
					}) === 1
				) {
					await queryClient.invalidateQueries({
						queryKey: getQueryOptions(variables.postId).queryKey,
					});
				}
			}
		},
	});

	return {
		mutate: mutation.mutate,
		isPending: mutation.isPending,
	};
};
