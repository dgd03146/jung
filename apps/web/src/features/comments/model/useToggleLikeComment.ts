import { trpc } from '@/fsd/shared';
import { COMMENTS_DEFAULT_ORDER, COMMENTS_LIMIT } from '@/fsd/shared';
import { useSupabaseAuth } from '@/fsd/shared/lib';
import { useToast } from '@jung/design-system/components';
import type { Comment, CommentQueryResult } from '@jung/shared/types';
import type { InfiniteData } from '@tanstack/react-query';
import { toggleLikeComment } from '../actions/toggleLikeComment';

type CommentData = InfiniteData<CommentQueryResult, string | null>;

export const useToggleLikeComment = () => {
	const utils = trpc.useUtils();
	const { user } = useSupabaseAuth();
	const showToast = useToast();

	const handleError = (error: unknown) => {
		if (error instanceof Error) {
			showToast(`좋아요 토글 실패: ${error.message}`, 'error');
		} else {
			showToast('좋아요 토글에 실패했습니다.', 'error');
		}
		console.error('Error toggling comment like:', error);
	};

	const mutateToggleLikeComment = async (commentId: string, postId: string) => {
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

		const { comment, isLiked } = findCommentAndCheckLike(
			existingData,
			commentId,
			user.id,
		);
		if (!comment) {
			showToast('댓글을 찾을 수 없습니다.', 'error');
			return;
		}

		const likeIncrement = isLiked ? -1 : 1;

		// Optimistic update
		utils.comment.getCommentsByPostId.setInfiniteData(
			{ postId, order: COMMENTS_DEFAULT_ORDER, limit: COMMENTS_LIMIT },
			(oldData) =>
				updateCommentLikesInData(oldData, commentId, likeIncrement, user.id),
		);

		try {
			await toggleLikeComment(commentId, postId, user.id);
		} catch (error) {
			// Rollback on error
			utils.comment.getCommentsByPostId.setInfiniteData(
				{ postId, order: COMMENTS_DEFAULT_ORDER, limit: COMMENTS_LIMIT },
				(oldData) =>
					updateCommentLikesInData(oldData, commentId, -likeIncrement, user.id),
			);
			handleError(error);
		}
	};

	return mutateToggleLikeComment;
};

const findCommentAndCheckLike = (
	data: CommentData,
	commentId: string,
	userId: string,
): { comment: Comment | undefined; isLiked: boolean } => {
	for (const page of data.pages) {
		for (const item of page.items) {
			const result = findCommentAndCheckLikeRecursive(item, commentId, userId);
			if (result.comment) return result;
		}
	}
	return { comment: undefined, isLiked: false };
};

const findCommentAndCheckLikeRecursive = (
	item: Comment,
	commentId: string,
	userId: string,
): { comment: Comment | undefined; isLiked: boolean } => {
	if (item.id === commentId) {
		return { comment: item, isLiked: item.liked_by.includes(userId) };
	}
	if (item.replies) {
		for (const reply of item.replies) {
			const result = findCommentAndCheckLikeRecursive(reply, commentId, userId);
			if (result.comment) return result;
		}
	}
	return { comment: undefined, isLiked: false };
};

const updateCommentLikesInData = (
	oldData: CommentData | undefined,
	commentId: string,
	increment: number,
	userId: string,
): CommentData => {
	if (!oldData) return { pages: [], pageParams: [] };

	return {
		...oldData,
		pages: oldData.pages.map((page) => ({
			...page,
			items: page.items.map((item) =>
				updateCommentLikesRecursively(item, commentId, increment, userId),
			),
		})),
	};
};

const updateCommentLikesRecursively = (
	item: Comment,
	commentId: string,
	increment: number,
	userId: string,
): Comment => {
	if (item.id === commentId) {
		const newLikedBy =
			increment > 0
				? [...item.liked_by, userId]
				: item.liked_by.filter((id) => id !== userId);
		return { ...item, likes: item.likes + increment, liked_by: newLikedBy };
	}
	if (item.replies) {
		return {
			...item,
			replies: item.replies.map((reply) =>
				updateCommentLikesRecursively(reply, commentId, increment, userId),
			),
		};
	}
	return item;
};
