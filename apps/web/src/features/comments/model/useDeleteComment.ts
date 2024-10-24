import { trpc } from '@/fsd/shared';
import { COMMENTS_DEFAULT_ORDER, COMMENTS_LIMIT } from '@/fsd/shared';
import { useToast } from '@jung/design-system/components';
import type { CommentQueryResult } from '@jung/shared/types';
import type { InfiniteData } from '@tanstack/react-query';
import { deleteComment } from '../actions/deleteComment';

type CommentData = InfiniteData<CommentQueryResult, string | null>;

export const useDeleteComment = () => {
	const utils = trpc.useUtils();
	const showToast = useToast();

	const mutateDeleteComment = async (commentId: string, postId: string) => {
		try {
			await deleteComment(commentId, postId);

			// Optimistic update
			utils.comment.getCommentsByPostId.setInfiniteData(
				{ postId, order: COMMENTS_DEFAULT_ORDER, limit: COMMENTS_LIMIT },
				(oldData) => removeCommentAndRepliesFromData(oldData, commentId),
			);

			showToast('댓글이 삭제되었습니다.', 'success');
		} catch (error) {
			showToast('댓글 삭제에 실패했습니다.', 'error');
			console.error('Error deleting comment:', error);
		}
	};

	return mutateDeleteComment;
};

const removeCommentAndRepliesFromData = (
	oldData: CommentData | undefined,
	commentId: string,
): CommentData => {
	if (!oldData) return { pages: [], pageParams: [] };

	return {
		...oldData,
		pages: oldData.pages.map((page) => ({
			...page,
			items: page.items.filter((item) => {
				if (item.id === commentId) {
					return false; // 메인 댓글 제거
				}
				// 대댓글에서 삭제된 댓글의 대댓글 제거
				if (item.replies) {
					item.replies = item.replies.filter((reply) => reply.id !== commentId);
				}
				return true;
			}),
		})),
	};
};
