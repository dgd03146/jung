import { trpc } from '@/fsd/shared';
import { useSupabaseAuth } from '@/fsd/shared/lib';
import { useState } from 'react';

import { useToast } from '@jung/design-system/components';
import { createComment } from '../actions/createComment';
import {
	createOptimisticComment,
	rollbackOptimisticUpdate,
	updateDataWithOptimisticComment,
} from '../lib';

export const useCommentSubmit = (postId: string, parentId?: string) => {
	const [newComment, setNewComment] = useState('');
	const utils = trpc.useUtils();
	const { user } = useSupabaseAuth();
	const showToast = useToast();

	const submitComment = async () => {
		if (!user || !newComment.trim()) return false;

		const optimisticComment = createOptimisticComment(
			newComment,
			user,
			postId,
			parentId,
		);

		// Optimistic update
		utils.comment.getCommentsByPostId.setInfiniteData(
			{ postId, order: 'desc' },
			(oldData) =>
				updateDataWithOptimisticComment(oldData, optimisticComment, parentId),
		);

		setNewComment('');

		try {
			const createdComment = await createComment(
				postId,
				newComment,
				user.id,
				parentId,
			);

			return true;
		} catch (error) {
			// Rollback logic
			utils.comment.getCommentsByPostId.setInfiniteData(
				{ postId, order: 'desc' },
				(oldData) => rollbackOptimisticUpdate(oldData, parentId),
			);
			showToast('Failed to post comment.', 'error');
			return false;
		}
	};

	return { newComment, setNewComment, submitComment };
};
