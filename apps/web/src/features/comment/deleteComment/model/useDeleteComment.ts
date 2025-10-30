'use client';

import { useTRPC } from '@/fsd/app';
import {
	COMMENTS_DEFAULT_ORDER,
	COMMENTS_LIMIT,
	type CommentData,
} from '@/fsd/shared';
import { useToast } from '@jung/design-system/components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCommentAction } from '../api/deleteCommentAction';
import { removeCommentAndReplies } from '../lib/removeCommentAndReplies';

export const useDeleteComment = () => {
	const trpc = useTRPC();
	const queryClient = useQueryClient();
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
			// Temporary comments only exist client-side
			if (!commentId.startsWith('temp-')) {
				await deleteCommentAction({ commentId, postId });
			}
		},
		onMutate: async ({ commentId, postId }) => {
			const currentQueryOptions = queryOptions(postId);
			await queryClient.cancelQueries({
				queryKey: currentQueryOptions.queryKey,
			});

			const previousData = queryClient.getQueryData<CommentData>(
				currentQueryOptions.queryKey,
			);

			queryClient.setQueryData(currentQueryOptions.queryKey, (oldData) =>
				removeCommentAndReplies(oldData, commentId),
			);

			return { previousData, queryKey: currentQueryOptions.queryKey }; // Return context for rollback
		},
		onError: (err, _variables, context) => {
			// Rollback on error
			if (context?.previousData) {
				queryClient.setQueryData(context.queryKey, context.previousData);
			}
			const message =
				err instanceof Error ? err.message : 'Failed to delete comment';
			showToast(message, 'error');
			console.error('Error deleting comment:', err);
		},
		onSettled: (_data, _error, variables, context) => {
			if (variables?.postId && context?.queryKey) {
				if (
					queryClient.isMutating({
						mutationKey:
							trpc.comment.deleteComment.mutationOptions().mutationKey,
					}) === 1
				) {
					queryClient.invalidateQueries({ queryKey: context.queryKey });
				}
			}
		},
		onSuccess: (_data, _variables) => {
			showToast('Comment has been deleted', 'success');
		},
	});

	return { mutate: mutation.mutate, isPending: mutation.isPending }; // Return mutate function and pending state
};
