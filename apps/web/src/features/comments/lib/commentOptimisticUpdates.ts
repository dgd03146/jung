import type { User } from '@supabase/supabase-js';

import type { Comment, CommentQueryResult } from '@jung/shared/types';
import type { InfiniteData } from '@tanstack/react-query';

type CommentData = InfiniteData<CommentQueryResult, string | null>;

const isTempId = (id: string) => /^temp-\d+-[a-z0-9]+$/.test(id);

export const createOptimisticComment = (
	content: string,
	user: User,
	postId: string,
	parentId?: string,
): Comment => ({
	id: `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
	content,
	created_at: new Date().toISOString(),
	user: {
		id: user.id,
		full_name: user.user_metadata.full_name,
		avatar_url: user.user_metadata.avatar_url,
		email: user.email || '',
	},
	likes: 0,
	replies: [],
	post_id: postId,
	user_id: user.id,
	parent_id: parentId || null,
});

export const updateDataWithOptimisticComment = (
	oldData: CommentData | undefined,
	optimisticComment: Comment,
	parentId?: string,
): CommentData => {
	if (!oldData) return { pages: [], pageParams: [] };
	return {
		...oldData,
		pages: oldData.pages.map((page, pageIndex) => ({
			...page,
			items: page.items.map((item) => {
				if (item.id === parentId) {
					return {
						...item,
						replies: [...(item.replies || []), optimisticComment],
					};
				}
				return item;
			}),
			...(pageIndex === 0 && !parentId
				? { items: [optimisticComment, ...page.items] }
				: {}),
		})),
	};
};

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
