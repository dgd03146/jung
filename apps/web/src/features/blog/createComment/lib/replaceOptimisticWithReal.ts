import type { Comment } from '@jung/shared/types';
import type { CommentData } from '@/fsd/shared';

const OPTIMISTIC_ID_PREFIX = 'temp-';

const isOptimisticComment = (commentId: string): boolean =>
	commentId.startsWith(OPTIMISTIC_ID_PREFIX);

export const replaceOptimisticWithReal = (
	oldData: CommentData | undefined,
	tempId: string,
	realData: Comment,
): CommentData => {
	if (!oldData) return { pages: [], pageParams: [] };

	return {
		...oldData,
		pages: oldData.pages.map((page) => ({
			...page,
			items: page.items
				.map((item) => ({
					...item,
					replies: item.replies?.map((reply) =>
						reply.id === tempId ? realData : reply,
					),
					...(item.id === tempId ? realData : {}),
				}))
				.filter((item) => !isOptimisticComment(item.id)),
		})),
	};
};
