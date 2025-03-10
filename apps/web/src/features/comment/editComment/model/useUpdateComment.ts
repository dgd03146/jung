'use client';

import { useTRPC } from '@/fsd/app';
import {
	COMMENTS_DEFAULT_ORDER,
	COMMENTS_LIMIT,
	useSupabaseAuth,
} from '@/fsd/shared';
import { useToast } from '@jung/design-system/components';
import { useQueryClient } from '@tanstack/react-query';
import { updateCommentAction } from '../api/updateCommentAction';
import { findCommentById, replaceUpdatedComment } from '../lib';

export const useUpdateComment = () => {
	const trpc = useTRPC();
	const queryClient = useQueryClient();
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

		const queryOptions = trpc.comment.getCommentsByPostId.infiniteQueryOptions({
			postId,
			order: COMMENTS_DEFAULT_ORDER,
			limit: COMMENTS_LIMIT,
		});

		try {
			const data = await queryClient.ensureInfiniteQueryData(queryOptions);

			const previousComment = findCommentById(data, commentId);

			if (!previousComment) {
				showToast('Comment to update not found', 'error');
				return;
			}

			queryClient.setQueryData(queryOptions.queryKey, (oldData) =>
				replaceUpdatedComment(oldData, commentId, {
					...previousComment,
					content,
				}),
			);

			const updatedComment = await updateCommentAction(commentId, content);

			queryClient.setQueryData(queryOptions.queryKey, (oldData) =>
				replaceUpdatedComment(oldData, commentId, updatedComment),
			);

			showToast('Comment has been updated', 'success');

			return updatedComment;
		} catch (error) {
			// 에러 발생 시 롤백 시도
			try {
				const data = queryClient.getQueryData(queryOptions.queryKey);
				if (data) {
					const previousComment = findCommentById(data, commentId);
					if (previousComment) {
						queryClient.setQueryData(queryOptions.queryKey, (oldData) =>
							replaceUpdatedComment(oldData, commentId, previousComment),
						);
					} else {
						// 롤백할 댓글을 찾지 못하면 무효화
						throw new Error('Cannot find comment to rollback');
					}
				} else {
					throw new Error('No data available for rollback');
				}
			} catch (rollbackError) {
				// 롤백 실패 시 무효화로 폴백
				queryClient.invalidateQueries(queryOptions);
			}

			handleError(error);
		}
	};

	return mutateUpdateComment;
};
