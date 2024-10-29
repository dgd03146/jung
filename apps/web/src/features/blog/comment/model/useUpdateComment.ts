import { trpc } from '@/fsd/shared';
import {
	COMMENTS_DEFAULT_ORDER,
	COMMENTS_LIMIT,
	useSupabaseAuth,
} from '@/fsd/shared';

import { useToast } from '@jung/design-system';
import type { CommentQueryResult } from '@jung/shared/types';
import type { InfiniteData } from '@tanstack/react-query';
import { updateCommentAction } from '../api';
import { findCommentById, updateCommentInData } from '../lib';

type CommentData = InfiniteData<CommentQueryResult, string | null>;

export const useUpdateComment = () => {
	const utils = trpc.useUtils();
	const { user } = useSupabaseAuth();
	const showToast = useToast();

	const handleError = (error: unknown) => {
		if (error instanceof Error) {
			showToast(`Failed to update comment: ${error.message}`, 'error');
		} else {
			showToast('Failed to update comment', 'error');
		}
		console.error('Error editing comment:', error);
	};

	const mutateUpdateComment = async (
		commentId: string,
		content: string,
		postId: string,
	) => {
		if (!user) {
			showToast('Please log in to update comments', 'error');
			return;
		}

		const existingData = utils.comment.getCommentsByPostId.getInfiniteData({
			postId,
			order: COMMENTS_DEFAULT_ORDER,
			limit: COMMENTS_LIMIT,
		});

		if (!existingData) {
			showToast('Comment data not found', 'error');
			return;
		}

		const previousComment = findCommentById(existingData, commentId);

		if (!previousComment) {
			showToast('Comment to update not found', 'error');
			return;
		}

		// Optimistic update
		utils.comment.getCommentsByPostId.setInfiniteData(
			{ postId, order: COMMENTS_DEFAULT_ORDER, limit: COMMENTS_LIMIT },
			(oldData) => updateCommentInData(oldData, commentId, content),
		);

		try {
			const updatedComment = await updateCommentAction(
				commentId,
				content,
				postId,
			);
			showToast('Comment updated successfully', 'success');
			return updatedComment;
		} catch (error) {
			// Rollback on error
			utils.comment.getCommentsByPostId.setInfiniteData(
				{ postId, order: COMMENTS_DEFAULT_ORDER, limit: COMMENTS_LIMIT },
				(oldData) =>
					updateCommentInData(oldData, commentId, previousComment.content),
			);
			handleError(error);
		}
	};

	return mutateUpdateComment;
};
