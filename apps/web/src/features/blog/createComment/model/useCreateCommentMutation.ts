'use client';

import { useToast } from '@jung/design-system/components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import {
	COMMENTS_DEFAULT_ORDER,
	COMMENTS_LIMIT,
	type CommentData,
	useSupabaseAuth,
	useTRPC,
} from '@/fsd/shared';
import { createCommentAction } from '../api/createCommentAction';
import {
	COMMENT_VALIDATION_MESSAGES,
	createOptimisticComment,
	TEMP_COMMENT_PREFIX,
	updateOptimisticComment,
} from '../lib';

type CommentValidation = { valid: true } | { valid: false; message: string };

export const useCreateCommentMutation = (onSuccessCallback?: () => void) => {
	const [newComment, setNewComment] = useState('');
	const trpc = useTRPC();
	const queryClient = useQueryClient();
	const { user } = useSupabaseAuth();
	const showToast = useToast();

	const validateComment = (
		content: string,
		parentId?: string,
	): CommentValidation => {
		if (!user || !content.trim()) {
			return {
				valid: false,
				message: COMMENT_VALIDATION_MESSAGES.EMPTY_OR_NOT_LOGGED_IN,
			};
		}
		if (parentId?.startsWith(TEMP_COMMENT_PREFIX)) {
			return {
				valid: false,
				message: COMMENT_VALIDATION_MESSAGES.PARENT_PROCESSING,
			};
		}
		return { valid: true };
	};

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
			setNewComment('');
			return createCommentAction({
				postId,
				postTitle,
				content,
				userId: user!.id,
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
		onSettled: async (_data, _error, variables, _context) => {
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
		const validation = validateComment(newComment, parentId);
		if (!validation.valid) {
			showToast(validation.message, 'warning');
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
