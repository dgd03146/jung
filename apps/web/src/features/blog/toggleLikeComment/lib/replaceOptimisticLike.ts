import type { Comment } from '@jung/shared/types';
import type { CommentData } from '@/fsd/shared';

export const replaceOptimisticLike = (
	oldData: CommentData | undefined,
	commentId: string,
	serverComment: Comment,
): CommentData => {
	if (!oldData) return { pages: [], pageParams: [] };

	return {
		...oldData,
		pages: oldData.pages.map((page) => {
			const hasTargetComment = page.items.some(
				(item) =>
					item.id === commentId ||
					item.replies?.some((reply) => reply.id === commentId),
			);

			if (!hasTargetComment) return page;

			return {
				...page,
				items: page.items.map((item) => {
					if (item.id === commentId) {
						return {
							...serverComment,
							replies: serverComment.replies ?? item.replies,
						};
					}

					if (item.replies?.some((reply) => reply.id === commentId)) {
						return {
							...item,
							replies: item.replies.map((reply) =>
								reply.id === commentId ? serverComment : reply,
							),
						};
					}

					return item;
				}),
			};
		}),
	};
};
