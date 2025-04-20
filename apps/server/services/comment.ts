import type {
	Comment,
	CommentQueryParams,
	CommentQueryResult,
	CommentUser,
} from '@jung/shared/types';
import { TRPCError } from '@trpc/server';
import { getUserDisplayName } from '../lib/getUserDisplayName';
import { supabase } from '../lib/supabase';

import type { PageParams, User } from '@supabase/supabase-js';
interface ExtendedPageParams extends PageParams {
	filter?: string;
}

export const CommentService = {
	async findManyByPostId({
		postId,
		limit,
		cursor,
		order = 'desc',
	}: CommentQueryParams): Promise<CommentQueryResult> {
		const { count: totalCount, error: countError } = await supabase
			.from('post_comments')
			.select('*', { count: 'exact', head: true })
			.eq('post_id', postId);

		if (countError) {
			console.error('Supabase count query error:', countError);
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: `Failed to count comments: ${countError.message}`,
				cause: countError,
			});
		}

		const comments = await this.fetchComments(postId, limit + 1, cursor, order);

		const userIds = this.extractUserIds(comments);

		const users = await this.fetchUserInfo(userIds);

		const userMap = this.createUserMap(users);

		const formattedComments = this.formatComments(comments, userMap);

		const hasNextPage = comments.length > limit;
		const itemsToReturn = hasNextPage
			? formattedComments.slice(0, limit)
			: formattedComments;

		return {
			items: itemsToReturn,
			nextCursor: hasNextPage
				? itemsToReturn[itemsToReturn.length - 1]?.created_at ?? null
				: null,
			hasNextPage,
			totalCount: totalCount ?? 0,
		};
	},

	async fetchComments(
		postId: string,
		limit: number,
		cursor?: string,
		order: 'asc' | 'desc' = 'desc',
	) {
		let query = supabase
			.from('post_comments')
			.select(`
      *,
      replies:post_comments!parent_id(*)
    `)
			.eq('post_id', postId)
			.is('parent_id', null)
			.order('created_at', { ascending: order === 'asc' });

		if (cursor) {
			query = query.lt('created_at', cursor);
		}

		query = query.limit(limit + 1);

		const { data: comments, error } = await query;

		if (error) {
			console.error('Supabase query error:', error);
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: `Failed to fetch comments: ${error.message}`,
				cause: error,
			});
		}

		const sortedComments = comments?.map((comment) => ({
			...comment,
			replies: comment.replies?.sort((a: Comment, b: Comment) =>
				order === 'asc'
					? new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
					: new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
			),
		}));

		return sortedComments;
	},

	extractUserIds(comments: Comment[]) {
		return [
			...new Set([
				...comments.map((comment) => comment.user_id),
				...comments.flatMap((comment) =>
					comment.replies.map((reply: Comment) => reply.user_id),
				),
			]),
		];
	},

	async fetchUserInfo(userIds: string[]) {
		const {
			data: { users },
			error: userError,
		} = await supabase.auth.admin.listUsers({
			filter: `id.in.(${userIds.join(',')})`,
		} as ExtendedPageParams);

		if (userError) {
			console.error('Supabase user query error:', userError);
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: `Failed to fetch user data: ${userError.message}`,
				cause: userError,
			});
		}

		return users;
	},

	createUserMap(users: User[]): Record<string, CommentUser> {
		return users.reduce(
			(acc, user) => {
				acc[user.id] = {
					id: user.id,
					email: user.email || '',
					full_name: getUserDisplayName(user) || 'Anonymous',
					avatar_url: user.user_metadata?.avatar_url || null,
				};
				return acc;
			},
			{} as Record<string, CommentUser>,
		);
	},

	formatComments(
		comments: Comment[],
		userMap: Record<string, CommentUser>,
	): Comment[] {
		return comments.map((comment) => ({
			...comment,
			user: userMap[comment.user_id] || this.getDefaultUser(comment.user_id),
			replies: comment.replies.map((reply: Comment) => ({
				...reply,
				user: userMap[reply.user_id] || this.getDefaultUser(reply.user_id),
			})),
		}));
	},

	getDefaultUser(userId: string): CommentUser {
		return {
			id: userId,
			email: '',
			full_name: 'Anonymous',
			avatar_url: null,
		};
	},
};

export const commentService = {
	...CommentService,

	async create({
		postId,
		content,
		userId,
		parentId,
	}: {
		postId: string;
		content: string;
		userId: string;
		parentId?: string;
	}): Promise<Comment> {
		// 댓글 생성
		const { data: commentData, error: commentError } = await supabase
			.from('post_comments')
			.insert({
				post_id: postId,
				content,
				user_id: userId,
				parent_id: parentId,
			})
			.select()
			.single<Comment>();

		if (commentError) {
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: 'Failed to create comment.',
				cause: commentError,
			});
		}

		// 사용자 정보 가져오기
		const { data: userData, error: userError } =
			await supabase.auth.admin.getUserById(userId);

		if (userError) {
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: 'Failed to fetch user data. Please try again later.',
				cause: userError,
			});
		}

		const userName = getUserDisplayName(userData.user);

		// 댓글과 사용자 정보 결합
		const commentWithUser: Comment = {
			...commentData,
			user: {
				id: userData.user.id,
				email: userData.user.email || '',
				full_name: userName || 'Anonymous',
				avatar_url: userData.user.user_metadata?.avatar_url || null,
			},
		};

		return commentWithUser;
	},

	async update(id: string, { content }: { content: string }): Promise<Comment> {
		const { data: commentData, error } = await supabase
			.from('post_comments')
			.update({ content })
			.eq('id', id)
			.select()
			.single<Comment>();

		if (error) {
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: `Failed to update comment: ${error.message}`,
				cause: error,
			});
		}

		const { data: userData, error: userError } =
			await supabase.auth.admin.getUserById(commentData.user_id);

		if (userError) {
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: 'Failed to fetch user data. Please try again later.',
				cause: userError,
			});
		}

		const userName = getUserDisplayName(userData.user);

		const commentWithUser: Comment = {
			...commentData,
			user: {
				id: userData.user.id,
				email: userData.user.email || '',
				full_name: userName || 'Anonymous',
				avatar_url: userData.user.user_metadata?.avatar_url || null,
			},
		};

		return commentWithUser;
	},

	async delete({ commentId }: { commentId: string }): Promise<void> {
		const { error } = await supabase
			.from('post_comments')
			.delete()
			.or(`id.eq.${commentId},parent_id.eq.${commentId}`);

		if (error) {
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: `Failed to delete comment: ${error.message}`,
				cause: error,
			});
		}
	},

	async toggleLike({
		commentId,
		userId,
	}: { commentId: string; userId: string }): Promise<Comment> {
		// 댓글 가져오기
		const { data: comment, error: selectError } = await supabase
			.from('post_comments')
			.select('*')
			.eq('id', commentId)
			.single<Comment>();

		if (selectError) {
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: `Failed to fetch comment: ${selectError.message}`,
				cause: selectError,
			});
		}

		if (!comment) {
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Comment not found',
			});
		}

		const hasLiked = comment.liked_by.includes(userId);

		// 좋아요 토글 업데이트
		const { data: commentData, error } = await supabase
			.from('post_comments')
			.update({
				likes: hasLiked ? comment.likes - 1 : comment.likes + 1,
				liked_by: hasLiked
					? comment.liked_by.filter((id) => id !== userId) // 좋아요 제거
					: [...comment.liked_by, userId], // 좋아요 추가
			})
			.eq('id', commentId)
			.select('*')
			.single<Comment>();

		if (error) {
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: `Failed to toggle like: ${error.message}`,
				cause: error,
			});
		}

		if (!commentData) {
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Comment not found or like could not be toggled',
			});
		}

		const { data: userData, error: userError } =
			await supabase.auth.admin.getUserById(commentData.user_id);

		if (userError) {
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: 'Failed to fetch user data. Please try again later.',
				cause: userError,
			});
		}

		const userName = getUserDisplayName(userData.user);

		const commentWithUser: Comment = {
			...commentData,
			user: {
				id: userData.user.id,
				email: userData.user.email || '',
				full_name: userName || 'Anonymous',
				avatar_url: userData.user.user_metadata?.avatar_url || null,
			},
		};

		return commentWithUser;
	},
};
