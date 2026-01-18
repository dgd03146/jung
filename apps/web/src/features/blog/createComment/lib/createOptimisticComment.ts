import type { Comment } from '@jung/shared/types';
import type { User } from '@supabase/supabase-js';
import { getUserDisplayName } from '@/fsd/shared';
import { TEMP_COMMENT_PREFIX } from './constants';

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
): Comment => {
	const slightlyInPast = new Date(Date.now() - 1000);
	return {
		id: `${TEMP_COMMENT_PREFIX}${postId}-${Date.now()}-${Math.random()
			.toString(36)
			.slice(2, 7)}`,
		content,
		created_at: slightlyInPast.toISOString(),
		updated_at: slightlyInPast.toISOString(),
		user: {
			id: user.id,
			full_name: getUserDisplayName(user),
			avatar_url: user.user_metadata.avatar_url,
			email: user.email || '',
		},
		likes: 0,
		liked_by: [],
		replies: [],
		post_id: postId,
		user_id: user.id,
		parent_id: parentId || null,
	};
};
