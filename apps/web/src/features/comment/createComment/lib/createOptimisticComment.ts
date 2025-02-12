import type { Comment } from '@jung/shared/types';
import type { User } from '@supabase/supabase-js';
/**
 * Creates an optimistic comment for immediate UI updates
 * @param content - The comment content
 * @param user - The user creating the comment
 * @param postId - The ID of the post being commented on
 * @param parentId - Optional parent comment ID for replies
 */
export const createOptimisticComment = (
	content: string,
	user: User,
	postId: string,
	parentId?: string,
): Comment => ({
	id: `temp-${postId}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
	content,
	created_at: new Date().toISOString(),
	updated_at: new Date().toISOString(),
	user: {
		id: user.id,
		full_name: user.user_metadata.full_name,
		avatar_url: user.user_metadata.avatar_url,
		email: user.email || '',
	},
	likes: 0,
	liked_by: [],
	replies: [],
	post_id: postId,
	user_id: user.id,
	parent_id: parentId || null,
});
