'use client';

import { useTRPC } from '@/fsd/app';
import {
	COMMENTS_DEFAULT_ORDER,
	COMMENTS_LIMIT,
	useSupabaseAuth,
} from '@/fsd/shared';
import { useToast } from '@jung/design-system/components';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { createCommentAction } from '../api/createCommentAction';
import {
	createOptimisticComment,
	replaceOptimisticWithReal,
	rollbackOptimisticUpdate,
	updateOptimisticComment,
} from '../lib';

export const useCreateComment = () => {
	const [newComment, setNewComment] = useState('');
	const trpc = useTRPC();
	const queryClient = useQueryClient();
	const { user } = useSupabaseAuth();
	const showToast = useToast();

	const submitComment = async (postId: string, parentId?: string) => {
		if (!user || !newComment.trim()) return false;

		const isParentTemporary = parentId?.startsWith('temp-');
		if (isParentTemporary) {
			showToast(
				'Please wait while the previous comment is being processed',
				'warning',
			);
			return false;
		}

		const queryOptions = trpc.comment.getCommentsByPostId.infiniteQueryOptions({
			postId,
			order: COMMENTS_DEFAULT_ORDER,
			limit: COMMENTS_LIMIT,
		});

		const optimisticComment = createOptimisticComment(
			newComment,
			user,
			postId,
			parentId,
		);

		try {
			await queryClient.ensureInfiniteQueryData(queryOptions);

			queryClient.setQueryData(queryOptions.queryKey, (oldData) =>
				updateOptimisticComment(oldData, optimisticComment, parentId),
			);

			setNewComment('');

			const serverComment = await createCommentAction(
				postId,
				newComment,
				user.id,
				parentId,
			);

			queryClient.setQueryData(queryOptions.queryKey, (oldData) =>
				replaceOptimisticWithReal(oldData, optimisticComment.id, serverComment),
			);

			showToast('Comment has been created', 'success');
			return serverComment;
		} catch (error) {
			try {
				queryClient.setQueryData(queryOptions.queryKey, (oldData) =>
					rollbackOptimisticUpdate(oldData, optimisticComment.id),
				);
			} catch (rollbackError) {
				queryClient.invalidateQueries(queryOptions);
			}

			showToast('Failed to create comment', 'error');
			return false;
		}
	};

	return { newComment, setNewComment, submitComment };
};
