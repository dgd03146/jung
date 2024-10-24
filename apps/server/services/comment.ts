import type {
	Comment,
	CommentQueryParams,
	CommentQueryResult,
	CommentUser,
} from '@jung/shared/types';
import { TRPCError } from '@trpc/server';
import { supabase } from '../lib/supabse';

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
		// 댓글 정보 가져오기
		const comments = await this.fetchComments(postId, limit, cursor, order);

		// 사용자 ID 목록 추출 (댓글 작성자 + 답글 작성자)
		const userIds = this.extractUserIds(comments);

		// Auth API를 사용하여 사용자 정보 가져오기
		const users = await this.fetchUserInfo(userIds);

		//사용자 정보를 객체로 변환
		const userMap = this.createUserMap(users);

		// 댓글과 사용자 정보 결합
		const formattedComments = this.formatComments(comments, userMap);

		const hasNextPage = comments.length > limit;
		const itemsToReturn = comments.slice(0, limit);

		return {
			items: formattedComments,
			nextCursor: itemsToReturn[itemsToReturn.length - 1]?.created_at ?? null,
			hasNextPage,
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

		query = query.limit(limit);

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
					full_name: user.user_metadata?.full_name || 'Anonymous',
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
				message: 'Failed to create comment. Please try again later.',
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

		// 댓글과 사용자 정보 결합
		const commentWithUser: Comment = {
			...commentData,
			user: {
				id: userData.user.id,
				email: userData.user.email || '',
				full_name: userData.user.user_metadata?.full_name || 'Anonymous',
				avatar_url: userData.user.user_metadata?.avatar_url || null,
			},
		};

		return commentWithUser;
	},

	async update(id: string, { content }: { content: string }): Promise<Comment> {
		const { data, error } = await supabase
			.from('post_comments')
			.update({ content })
			.eq('id', id)
			.select()
			.single<Comment>();

		if (error) {
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: 'Failed to update comment. Please try again later.',
				cause: error,
			});
		}

		return data;
	},

	async delete(id: string): Promise<void> {
		const { error } = await supabase
			.from('post_comments')
			.delete()
			.eq('id', id);

		if (error) {
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: 'Failed to delete comment. Please try again later.',
				cause: error,
			});
		}
	},

	async incrementLikes(id: string): Promise<Comment> {
		const { data, error } = await supabase
			.rpc('increment_comment_likes', { comment_id: id })
			.returns<Comment>();

		if (error) {
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: 'Failed to increment likes. Please try again later.',
				cause: error,
			});
		}

		return data;
	},
};
