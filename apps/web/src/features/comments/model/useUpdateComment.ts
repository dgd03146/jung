import { trpc } from '@/fsd/shared';
import { COMMENTS_DEFAULT_ORDER, COMMENTS_LIMIT } from '@/fsd/shared';
import { useSupabaseAuth } from '@/fsd/shared/lib';
import { useToast } from '@jung/design-system/components';
import type { Comment, CommentQueryResult } from '@jung/shared/types';
import type { InfiniteData } from '@tanstack/react-query';
import { updateComment } from '../actions/updateComment';

type CommentData = InfiniteData<CommentQueryResult, string | null>;

export const useUpdateComment = () => {
	const utils = trpc.useUtils();
	const { user } = useSupabaseAuth();
	const showToast = useToast();

	const handleError = (error: unknown) => {
		if (error instanceof Error) {
			showToast(`댓글 수정 실패: ${error.message}`, 'error');
		} else {
			showToast('댓글 수정에 실패했습니다.', 'error');
		}
		console.error('Error editing comment:', error);
	};

	const mutateUpdateComment = async (
		commentId: string,
		content: string,
		postId: string,
	) => {
		if (!user) {
			showToast('로그인이 필요합니다.', 'error');
			return;
		}

		const existingData = utils.comment.getCommentsByPostId.getInfiniteData({
			postId,
			order: COMMENTS_DEFAULT_ORDER,
			limit: COMMENTS_LIMIT,
		});

		if (!existingData) {
			showToast('댓글 데이터를 찾을 수 없습니다.', 'error');
			return;
		}

		const previousComment = findCommentById(existingData, commentId);

		if (!previousComment) {
			showToast('수정할 댓글을 찾을 수 없습니다.', 'error');
			return;
		}

		// Optimistic update
		utils.comment.getCommentsByPostId.setInfiniteData(
			{ postId, order: COMMENTS_DEFAULT_ORDER, limit: COMMENTS_LIMIT },
			(oldData) => updateCommentInData(oldData, commentId, content),
		);

		try {
			const updatedComment = await updateComment(commentId, content, postId);
			showToast('댓글이 수정되었습니다.', 'success');
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
		// finally {
		// 	utils.comment.getCommentsByPostId.invalidate({ postId });
		// }
	};

	return mutateUpdateComment;
};

const findCommentById = (
	data: CommentData,
	commentId: string,
): Comment | undefined => {
	for (const page of data.pages) {
		for (const item of page.items) {
			const comment = findCommentRecursively(item, commentId);
			if (comment) return comment;
		}
	}
	return undefined;
};

const findCommentRecursively = (
	item: Comment,
	commentId: string,
): Comment | undefined => {
	if (item.id === commentId) return item;
	if (item.replies) {
		for (const reply of item.replies) {
			const found = findCommentRecursively(reply, commentId);
			if (found) return found;
		}
	}
	return undefined;
};

const updateCommentInData = (
	oldData: CommentData | undefined,
	commentId: string,
	newContent: string,
): CommentData => {
	if (!oldData) throw new Error('댓글 데이터가 없습니다.');

	return {
		...oldData,
		pages: oldData.pages.map((page) => ({
			...page,
			items: page.items.map((item) =>
				updateCommentRecursively(item, commentId, newContent),
			),
		})),
	};
};

const updateCommentRecursively = (
	item: Comment,
	commentId: string,
	newContent: string,
): Comment => {
	if (item.id === commentId) {
		return { ...item, content: newContent };
	}
	if (item.replies) {
		return {
			...item,
			replies: item.replies.map((reply) =>
				updateCommentRecursively(reply, commentId, newContent),
			),
		};
	}
	return item;
};
