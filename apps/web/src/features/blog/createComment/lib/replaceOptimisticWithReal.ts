import type { Comment } from '@jung/shared/types';
import type { CommentData } from '@/fsd/shared';

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
				.filter((item) => !item.id.startsWith('temp-')), // 임시 ID 제거
		})),
	};
};
