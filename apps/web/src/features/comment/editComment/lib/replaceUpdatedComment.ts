import type { CommentData } from '@/fsd/shared';
import type { Comment } from '@jung/shared/types';

export const replaceUpdatedComment = (
	oldData: CommentData | undefined,
	commentId: string,
	updatedComment: Comment,
) => {
	if (!oldData) return { pages: [], pageParams: [] };

	return {
		...oldData,
		pages: oldData.pages.map((page) => ({
			...page,
			items: page.items.map((item) => {
				if (item.id === commentId) return updatedComment;

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
		})),
	};
};
