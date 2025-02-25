'use client';

import { getCommentsQueryKey, trpc, useSupabaseAuth } from '@/fsd/shared';
import { useToast } from '@jung/design-system/components';
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
	const utils = trpc.useUtils();
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

		const queryKey = getCommentsQueryKey(postId);

		const optimisticComment = createOptimisticComment(
			newComment,
			user,
			postId,
			parentId,
		);

		utils.comment.getCommentsByPostId.setInfiniteData(queryKey, (oldData) =>
			updateOptimisticComment(oldData, optimisticComment, parentId),
		);

		setNewComment('');

		try {
			const serverComment = await createCommentAction(
				postId,
				newComment,
				user.id,
				parentId,
			);

			utils.comment.getCommentsByPostId.setInfiniteData(queryKey, (oldData) =>
				replaceOptimisticWithReal(oldData, optimisticComment.id, serverComment),
			);

			showToast('Comment has been created', 'success');
			return serverComment;
		} catch (error) {
			utils.comment.getCommentsByPostId.setInfiniteData(queryKey, (oldData) =>
				rollbackOptimisticUpdate(oldData, optimisticComment.id),
			);
			showToast('Failed to create comment', 'error');
			return false;
		}
	};

	return { newComment, setNewComment, submitComment };
};
