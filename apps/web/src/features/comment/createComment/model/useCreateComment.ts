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
import { useState } from 'react';
import { createCommentAction } from '../api/createCommentAction';
import { createOptimisticComment, updateOptimisticComment } from '../lib';

export const useCreateComment = () => {
	const [newComment, setNewComment] = useState('');
	const trpc = useTRPC();
	const queryClient = useQueryClient();
	const { user } = useSupabaseAuth();
	const showToast = useToast();

	const getQueryOptions = (postId: string) =>
		trpc.comment.getCommentsByPostId.infiniteQueryOptions({
			postId,
			order: COMMENTS_DEFAULT_ORDER,
			limit: COMMENTS_LIMIT,
		});

	const mutation = useMutation({
		mutationFn: async ({
			postId,
			parentId,
		}: { postId: string; parentId?: string }) => {
			if (!user || !newComment.trim()) {
				throw new Error('User not logged in or comment empty');
			}
			const isParentTemporary = parentId?.startsWith('temp-');
			if (isParentTemporary) {
				throw new Error(
					'Please wait while the previous comment is being processed',
				);
			}
			return createCommentAction(postId, newComment, user.id, parentId);
		},
		onMutate: async (variables) => {
			const { postId, parentId } = variables;
			const queryOptions = getQueryOptions(postId);

			await queryClient.cancelQueries({ queryKey: queryOptions.queryKey });

			const previousData = queryClient.getQueryData<CommentData>(
				queryOptions.queryKey,
			);

			const optimisticComment = createOptimisticComment(
				newComment,
				user!,
				postId,
				parentId,
			);

			queryClient.setQueryData(queryOptions.queryKey, (oldData) =>
				updateOptimisticComment(oldData, optimisticComment, parentId),
			);

			setNewComment('');

			return { previousData, optimisticCommentId: optimisticComment.id };
		},
		onError: (error, variables, context) => {
			if (context?.previousData) {
				queryClient.setQueryData(
					getQueryOptions(variables.postId).queryKey,
					context.previousData,
				);
			}

			const message =
				error instanceof Error ? error.message : 'Failed to create comment';
			if (
				message !== 'User not logged in or comment empty' &&
				message !== 'Please wait while the previous comment is being processed'
			) {
				showToast(message, 'error');
			}
		},
		onSuccess: (data, variables, context) => {
			showToast('Comment has been created', 'success');
		},
		onSettled: async (data, error, variables, context) => {
			await queryClient.invalidateQueries({
				queryKey: getQueryOptions(variables.postId).queryKey,
			});
		},
	});

	const submitComment = (postId: string, parentId?: string) => {
		if (!user || !newComment.trim()) {
			showToast('Please enter a comment and log in.', 'warning');
			return;
		}
		const isParentTemporary = parentId?.startsWith('temp-');
		if (isParentTemporary) {
			showToast(
				'Please wait while the previous comment is being processed',
				'warning',
			);
			return;
		}
		mutation.mutate({ postId, parentId });
	};

	return {
		newComment,
		setNewComment,
		submitComment,
		isPending: mutation.isPending,
	};
};
