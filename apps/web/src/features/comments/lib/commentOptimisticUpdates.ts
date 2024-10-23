import type { User } from '@supabase/supabase-js';

import type { Comment, CommentQueryResult } from '@jung/shared/types';
import type { InfiniteData } from '@tanstack/react-query';

type CommentData = InfiniteData<CommentQueryResult, string | null>;

export const createOptimisticComment = (
	content: string,
	user: User,
	postId: string,
): Comment => ({
	id: 'temp-id',
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
	parent_id: null,
});

export const updateDataWithOptimisticComment = (
	oldData: CommentData | undefined,
	optimisticComment: Comment,
): CommentData => {
	if (!oldData) return { pages: [], pageParams: [] };
	return {
		...oldData,
		pages: oldData.pages.map((page, index) =>
			index === 0
				? {
						...page,
						items: [optimisticComment, ...page.items],
				  }
				: page,
		),
	};
};

export const rollbackOptimisticUpdate = (
	oldData: CommentData | undefined,
): CommentData => {
	if (!oldData) return { pages: [], pageParams: [] };
	return {
		...oldData,
		pages: oldData.pages.map((page, index) =>
			index === 0
				? {
						...page,
						items: page.items.filter((item) => item.id !== 'temp-id'),
				  }
				: page,
		),
	};
};
