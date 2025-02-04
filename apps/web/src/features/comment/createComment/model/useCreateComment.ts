'use client';

import { trpc } from '@/fsd/shared';
import { COMMENTS_DEFAULT_ORDER, COMMENTS_LIMIT } from '@/fsd/shared';
import { useSupabaseAuth } from '@/fsd/shared';
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

		console.log('parentId', parentId);

		const isParentTemporary = parentId?.startsWith('temp-');
		if (isParentTemporary) {
			showToast('이전 댓글이 처리되는 동안 기다려주세요.', 'warning');
			return false;
		}

		const optimisticComment = createOptimisticComment(
			newComment,
			user,
			postId,
			parentId,
		);

		// Optimistic update
		utils.comment.getCommentsByPostId.setInfiniteData(
			{ postId, order: COMMENTS_DEFAULT_ORDER, limit: COMMENTS_LIMIT },
			(oldData) =>
				updateOptimisticComment(oldData, optimisticComment, parentId),
		);

		setNewComment('');

		// Server action
		try {
			const serverComment = await createCommentAction(
				postId,
				newComment,
				user.id,
				parentId,
			);

			// Replace optimistic with real data
			utils.comment.getCommentsByPostId.setInfiniteData(
				{ postId, order: COMMENTS_DEFAULT_ORDER, limit: COMMENTS_LIMIT },
				(oldData) =>
					replaceOptimisticWithReal(
						oldData,
						optimisticComment.id,
						serverComment,
					),
			);

			// Invalidate the query to reflect the new comment
			await utils.comment.getCommentsByPostId.invalidate({
				postId,
				order: COMMENTS_DEFAULT_ORDER,
				limit: COMMENTS_LIMIT,
			});

			showToast('댓글이 작성되었습니다.', 'success');
			return serverComment;
		} catch (error) {
			// Rollback logic
			utils.comment.getCommentsByPostId.setInfiniteData(
				{ postId, order: COMMENTS_DEFAULT_ORDER, limit: COMMENTS_LIMIT },
				(oldData) => rollbackOptimisticUpdate(oldData, optimisticComment.id),
			);
			showToast('댓글 작성에 실패했습니다.', 'error');
			return false;
		}
	};

	return { newComment, setNewComment, submitComment };
};
