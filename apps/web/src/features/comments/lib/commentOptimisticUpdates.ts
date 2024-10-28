import type { User } from '@supabase/supabase-js';

import type { Comment, CommentQueryResult } from '@jung/shared/types';
import type { InfiniteData } from '@tanstack/react-query';

/** Type representing infinite scroll comment data */
type CommentData = InfiniteData<CommentQueryResult, string | null>;

/** Interface for comment search results including like status */
interface CommentSearchResult {
	comment: Comment | undefined;
	isLiked: boolean;
}

/** Checks if a given ID is a temporary ID */
const isTempId = (id: string) => /^temp-\d+-[a-z0-9]+$/.test(id);

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
	liked_by: [],
	replies: [],
	post_id: postId,
	user_id: user.id,
	parent_id: parentId || null,
});

/**
 * Updates data with an optimistic comment
 * @param oldData - Existing comment data
 * @param optimisticComment - The optimistic comment to add
 * @param parentId - Optional parent comment ID
 */
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

/**
 * Finds a comment and checks if it's liked by the user
 * @param data - Comment data to search through
 * @param commentId - ID of the comment to find
 * @param userId - ID of the user to check like status
 */
export const findCommentAndCheckLike = (
	data: CommentData,
	commentId: string,
	userId: string,
): CommentSearchResult => {
	for (const page of data.pages) {
		for (const item of page.items) {
			const result = findCommentAndCheckLikeRecursive(item, commentId, userId);
			if (result.comment) return result;
		}
	}
	return { comment: undefined, isLiked: false };
};

/**
 * Recursively searches for a comment and checks like status
 * @private
 */
const findCommentAndCheckLikeRecursive = (
	item: Comment,
	commentId: string,
	userId: string,
): CommentSearchResult => {
	if (item.id === commentId) {
		return { comment: item, isLiked: item.liked_by.includes(userId) };
	}
	if (item.replies) {
		for (const reply of item.replies) {
			const result = findCommentAndCheckLikeRecursive(reply, commentId, userId);
			if (result.comment) return result;
		}
	}
	return { comment: undefined, isLiked: false };
};

/**
 * Updates like status in comment data
 * @param oldData - Existing comment data
 * @param commentId - ID of the comment to update
 * @param increment - Like count change (1 or -1)
 * @param userId - ID of the user toggling the like
 */
export const updateCommentLikesInData = (
	oldData: CommentData | undefined,
	commentId: string,
	increment: number,
	userId: string,
): CommentData => {
	if (!oldData) return { pages: [], pageParams: [] };
	return {
		...oldData,
		pages: oldData.pages.map((page) => ({
			...page,
			items: page.items.map((item) =>
				updateCommentLikesRecursively(item, commentId, increment, userId),
			),
		})),
	};
};

/**
 * Removes a comment and its replies from the data
 * @param oldData - Existing comment data
 * @param commentId - ID of the comment to remove
 */
export const removeCommentAndRepliesFromData = (
	oldData: CommentData | undefined,
	commentId: string,
): CommentData => {
	if (!oldData) return { pages: [], pageParams: [] };
	return {
		...oldData,
		pages: oldData.pages.map((page) => ({
			...page,
			items: page.items.filter((item) => {
				if (item.id === commentId) {
					return false;
				}
				if (item.replies) {
					item.replies = item.replies.filter((reply) => reply.id !== commentId);
				}
				return true;
			}),
		})),
	};
};

/**
 * Rolls back optimistic updates
 * @param oldData - Existing comment data
 * @param parentId - Optional parent comment ID
 */
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

/**
 * Recursively updates like status for a comment
 * @private
 */
export const updateCommentLikesRecursively = (
	item: Comment,
	commentId: string,
	increment: number,
	userId: string,
): Comment => {
	if (item.id === commentId) {
		const newLikedBy =
			increment > 0
				? [...item.liked_by, userId]
				: item.liked_by.filter((id) => id !== userId);
		return { ...item, likes: item.likes + increment, liked_by: newLikedBy };
	}
	if (item.replies) {
		return {
			...item,
			replies: item.replies.map((reply) =>
				updateCommentLikesRecursively(reply, commentId, increment, userId),
			),
		};
	}
	return item;
};

/**
 * Finds a comment by its ID
 * @param data - Comment data to search through
 * @param commentId - ID of the comment to find
 */
export const findCommentById = (
	data: CommentData,
	commentId: string,
): Comment | undefined => {
	for (const page of data.pages) {
		for (const item of page.items) {
			const comment = findCommentRecursively(item, commentId);
			if (comment) return comment;
		}
	}
	return undefined;
};

/**
 * Recursively searches for a comment
 * @private
 */
export const findCommentRecursively = (
	item: Comment,
	commentId: string,
): Comment | undefined => {
	if (item.id === commentId) return item;
	if (item.replies) {
		for (const reply of item.replies) {
			const found = findCommentRecursively(reply, commentId);
			if (found) return found;
		}
	}
	return undefined;
};

/**
 * Updates comment content in data
 * @param oldData - Existing comment data
 * @param commentId - ID of the comment to update
 * @param newContent - New content for the comment
 * @throws {Error} When comment data is not found
 */
export const updateCommentInData = (
	oldData: CommentData | undefined,
	commentId: string,
	newContent: string,
): CommentData => {
	if (!oldData) throw new Error('There is no comment data.');

	return {
		...oldData,
		pages: oldData.pages.map((page) => ({
			...page,
			items: page.items.map((item) =>
				updateCommentRecursively(item, commentId, newContent),
			),
		})),
	};
};

/**
 * Recursively updates comment content
 * @private
 */
export const updateCommentRecursively = (
	item: Comment,
	commentId: string,
	newContent: string,
): Comment => {
	if (item.id === commentId) {
		return { ...item, content: newContent };
	}
	if (item.replies) {
		return {
			...item,
			replies: item.replies.map((reply) =>
				updateCommentRecursively(reply, commentId, newContent),
			),
		};
	}
	return item;
};
