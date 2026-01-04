import type { CommentData } from '@/fsd/shared';

/**
 * Rolls back optimistic updates
 * @param oldData - Existing comment data
 * @param parentId - Optional parent comment ID
 */

/** Checks if a given ID is a temporary ID */
const isTempId = (id: string) => /^temp-\d+-[a-z0-9]+$/.test(id);

export const rollbackOptimisticUpdate = (
	oldData: CommentData | undefined,
	parentId?: string,
): CommentData => {
	if (!oldData) return { pages: [], pageParams: [] };
	return {
		...oldData,
		pages: oldData.pages.map((page) => ({
			...page,
			items: page.items
				.map((item) => {
					if (item.id === parentId) {
						return {
							...item,
							replies: (item.replies || []).filter(
								(reply) => !isTempId(reply.id),
							),
						};
					}
					return item;
				})
				.filter((item) => !isTempId(item.id)),
		})),
	};
};
