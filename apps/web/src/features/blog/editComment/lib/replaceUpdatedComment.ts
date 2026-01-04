import type { Comment } from '@jung/shared/types';
import type { CommentData } from '@/fsd/shared';

export const replaceUpdatedComment = (
	oldData: CommentData | undefined,
	commentId: string,
	updatedComment: Comment,
) => {
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
							...updatedComment,
							replies: updatedComment.replies ?? item.replies,
						};
					}

					if (item.replies?.some((reply) => reply.id === commentId)) {
						return {
							...item,
							replies: item.replies.map((reply) =>
								reply.id === commentId ? updatedComment : reply,
							),
						};
					}

					return item;
				}),
			};
		}),
	};
};
