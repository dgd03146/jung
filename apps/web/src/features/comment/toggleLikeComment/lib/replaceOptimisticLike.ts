import type { CommentData } from '@/fsd/shared';
import type { Comment } from '@jung/shared/types';

export const replaceOptimisticLike = (
	oldData: CommentData | undefined,
	commentId: string,
	serverComment: Comment,
): CommentData => {
	if (!oldData) return { pages: [], pageParams: [] };

	return {
		...oldData,
		pages: oldData.pages.map((page) => ({
			...page,
			items: page.items.map((item) =>
				item.id === commentId
					? serverComment
					: {
							...item,
							replies: item.replies?.map((reply) =>
								reply.id === commentId ? serverComment : reply,
							),
					  },
			),
		})),
	};
};
