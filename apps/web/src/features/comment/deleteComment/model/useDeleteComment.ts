'use client';

import { useTRPC } from '@/fsd/app';
import {
	COMMENTS_DEFAULT_ORDER,
	COMMENTS_LIMIT,
	type CommentData,
} from '@/fsd/shared';
import { useToast } from '@jung/design-system/components';
import { useQueryClient } from '@tanstack/react-query';
import { deleteCommentAction } from '../api/deleteCommentAction';
import { removeCommentAndReplies } from '../lib/removeCommentAndReplies';

export const useDeleteComment = () => {
	const trpc = useTRPC();
	const queryClient = useQueryClient();
	const showToast = useToast();

	const mutateDeleteComment = async (commentId: string, postId: string) => {
		const queryOptions = trpc.comment.getCommentsByPostId.infiniteQueryOptions({
			postId,
			order: COMMENTS_DEFAULT_ORDER,
			limit: COMMENTS_LIMIT,
		});

		// 삭제 전 데이터 저장
		let originalData: CommentData | undefined;

		try {
			const data = await queryClient.ensureInfiniteQueryData(queryOptions);

			originalData = structuredClone(data);

			// 낙관적 업데이트 적용
			queryClient.setQueryData(queryOptions.queryKey, (oldData) =>
				removeCommentAndReplies(oldData, commentId),
			);

			if (commentId.startsWith('temp-')) {
				showToast('Temporary comment has been deleted', 'success');
				return;
			}

			await deleteCommentAction(commentId);
			showToast('Comment has been deleted', 'success');
		} catch (error) {
			// 오류 발생 시 저장해둔 원본 데이터로 롤백
			if (originalData) {
				try {
					queryClient.setQueryData(queryOptions.queryKey, originalData);
				} catch (rollbackError) {
					console.error('Rollback failed:', rollbackError);
					queryClient.invalidateQueries(queryOptions);
				}
			} else {
				queryClient.invalidateQueries(queryOptions);
			}

			if (error instanceof Error) {
				showToast(`Failed to delete comment: ${error.message}`, 'error');
			} else {
				showToast('Failed to delete comment', 'error');
			}
		}
	};

	return mutateDeleteComment;
};
