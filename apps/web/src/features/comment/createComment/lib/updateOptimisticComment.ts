import type { CommentData } from '@/fsd/shared';
import type { Comment } from '@jung/shared/types';

/**
 * Updates data with an optimistic comment
 * @param oldData - Existing comment data
 * @param optimisticComment - The optimistic comment to add
 * @param parentId - Optional parent comment ID
 */
export const updateOptimisticComment = (
	oldData: CommentData | undefined,
	optimisticComment: Comment,
	parentId?: string,
): CommentData => {
	if (!oldData) return { pages: [], pageParams: [] };

	return {
		...oldData,
		pages: oldData.pages.map((page, pageIndex) => {
			const updatedItems = page.items.map((item) => {
				if (item.id === parentId) {
					return {
						...item,
						replies: [...(item.replies || []), optimisticComment],
					};
				}
				return item;
			});

			if (!parentId && pageIndex === 0) {
				return {
					...page,
					items: [optimisticComment, ...updatedItems],
				};
			}

			return { ...page, items: updatedItems };
		}),
	};
};
