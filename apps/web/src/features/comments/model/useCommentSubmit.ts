import { trpc } from '@/fsd/shared';
import { useSupabaseAuth } from '@/fsd/shared/lib';
import { useState } from 'react';

import { useToast } from '@jung/design-system/components';
import { ToastType } from '@jung/shared/types';
import { createComment } from '../actions/createComment';
import {
	createOptimisticComment,
	rollbackOptimisticUpdate,
	updateDataWithOptimisticComment,
} from '../lib';

export const useCommentSubmit = (postId: string) => {
	const [newComment, setNewComment] = useState('');
	const utils = trpc.useUtils();
	const { user } = useSupabaseAuth();
	const showToast = useToast();

	const submitComment = async () => {
		if (!user || !newComment.trim()) return;

		const optimisticComment = createOptimisticComment(newComment, user, postId);

		utils.comment.getCommentsByPostId.setInfiniteData({ postId }, (oldData) =>
			updateDataWithOptimisticComment(oldData, optimisticComment),
		);

		setNewComment('');

		try {
			await createComment(postId, newComment, user.id);
			utils.comment.getCommentsByPostId.invalidate({ postId });
			showToast('Comment successfully posted.', ToastType.SUCCESS);
		} catch (error) {
			utils.comment.getCommentsByPostId.setInfiniteData({ postId }, (oldData) =>
				rollbackOptimisticUpdate(oldData),
			);
			showToast('Failed to post comment.', ToastType.ERROR);
		}
	};

	return { newComment, setNewComment, submitComment };
};
