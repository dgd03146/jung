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

export const useCreateCommentMutation = (onSuccessCallback?: () => void) => {
	const [newComment, setNewComment] = useState('');
	const trpc = useTRPC();
	const queryClient = useQueryClient();
	const { user } = useSupabaseAuth();
	const showToast = useToast();

	const getQueryOptions = (postId: string) =>
		trpc.postComment.getCommentsByPostId.infiniteQueryOptions({
			postId,
			order: COMMENTS_DEFAULT_ORDER,
			limit: COMMENTS_LIMIT,
		});

	const mutation = useMutation({
		mutationFn: async ({
			postId,
			parentId,
			content,
			postTitle,
		}: {
			postId: string;
			parentId?: string;
			content: string;
			postTitle: string;
		}) => {
			if (!user || !content.trim()) {
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

			setNewComment('');
			return createCommentAction({
				postId,
				postTitle,
				content,
				userId: user.id,
				parentId,
			});
		},
		onMutate: async (variables) => {
			const { postId, parentId, content } = variables;
			const queryOptions = getQueryOptions(postId);

			await queryClient.cancelQueries({ queryKey: queryOptions.queryKey });

			const previousData = queryClient.getQueryData<CommentData>(
				queryOptions.queryKey,
			);

			const optimisticComment = createOptimisticComment(
				content,
				user!,
				postId,
				parentId,
			);

			queryClient.setQueryData(queryOptions.queryKey, (oldData) =>
				updateOptimisticComment(oldData, optimisticComment, parentId),
			);

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
		onSuccess: () => {
			setNewComment('');
			onSuccessCallback?.();
		},
		onSettled: async (data, error, variables, context) => {
			if (variables?.postId) {
				if (
					queryClient.isMutating({
						mutationKey:
							trpc.postComment.createComment.mutationOptions().mutationKey,
					}) === 1
				) {
					await queryClient.invalidateQueries({
						queryKey: getQueryOptions(variables.postId).queryKey,
					});
				}
			}
		},
	});

	const submitComment = ({
		postId,
		parentId,
		newComment,
		postTitle,
	}: {
		postId: string;
		parentId?: string;
		newComment: string;
		postTitle: string;
	}) => {
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
		mutation.mutate({ postId, parentId, content: newComment, postTitle });
	};

	return {
		newComment,
		setNewComment,
		submitComment,
		isPending: mutation.isPending,
	};
};
