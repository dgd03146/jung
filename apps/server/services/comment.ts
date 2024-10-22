import type { Comment, CommentUser } from '@jung/shared/types';
import { TRPCError } from '@trpc/server';
import { supabase } from '../lib/supabse';

import type { PageParams, User } from '@supabase/supabase-js';

interface ExtendedPageParams extends PageParams {
	filter?: string;
}

type QueryParams = {
	postId: string;
	parentId?: string;
	limit: number;
	cursor?: string;
};

type QueryResult = {
	items: Comment[];
	nextCursor: string | null;
};

export const CommentService = {
	async findManyByPostId({
		postId,
		limit,
		cursor,
	}: QueryParams): Promise<QueryResult> {
		// 1. 댓글 정보 가져오기
		const comments = await this.fetchComments(postId, limit, cursor);

		// 2. 사용자 ID 목록 추출 (댓글 작성자 + 답글 작성자)
		const userIds = this.extractUserIds(comments);

		// 3. Auth API를 사용하여 사용자 정보 가져오기
		const users = await this.fetchUserInfo(userIds);

		// 4. 사용자 정보를 객체로 변환
		const userMap = this.createUserMap(users);

		// 5. 댓글과 사용자 정보 결합
		const formattedComments = this.formatComments(comments, userMap);

		return {
			items: formattedComments,
			nextCursor: comments[comments.length - 1]?.created_at ?? null,
		};
	},

	async fetchComments(postId: string, limit: number, cursor?: string) {
		let query = supabase
			.from('post_comments')
			.select(`
        *,
        replies:post_comments!parent_id(*)
      `)
			.eq('post_id', postId)
			.is('parent_id', null)
			.order('created_at', { ascending: false })
			.limit(limit);

		if (cursor) {
			query = query.lt('created_at', cursor);
		}

		const { data: comments, error } = await query;

		if (error) {
			console.error('Supabase query error:', error);
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: `Failed to fetch comments: ${error.message}`,
				cause: error,
			});
		}

		return comments;
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
