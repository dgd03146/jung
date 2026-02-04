import type {
	Comment,
	CommentQueryParams,
	CommentQueryResult,
	CommentUser,
	CreateAnonymousCommentInput,
} from '@jung/shared/types';
import type { PageParams, User } from '@supabase/supabase-js';
import { TRPCError } from '@trpc/server';
import { getUserDisplayName } from '../lib/getUserDisplayName';
import { hashPassword, verifyPassword } from '../lib/password';
import { supabase } from '../lib/supabase';

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
				? (itemsToReturn[itemsToReturn.length - 1]?.created_at ?? null)
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
		// 익명 댓글(user_id가 null)은 제외
		return [
			...new Set([
				...comments
					.map((comment) => comment.user_id)
					.filter((id): id is string => id !== null),
				...comments.flatMap((comment) =>
					comment.replies
						.map((reply: Comment) => reply.user_id)
						.filter((id): id is string => id !== null),
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
					is_anonymous: false,
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
			user: this.getCommentUser(comment, userMap),
			replies: comment.replies.map((reply: Comment) => ({
				...reply,
				user: this.getCommentUser(reply, userMap),
			})),
		}));
	},

	getCommentUser(
		comment: Comment,
		userMap: Record<string, CommentUser>,
	): CommentUser {
		// 익명 댓글인 경우
		if (comment.anonymous_id && comment.anonymous_name) {
			return {
				id: comment.anonymous_id,
				full_name: comment.anonymous_name,
				avatar_url: null,
				is_anonymous: true,
			};
		}
		// 로그인 사용자 댓글인 경우
		if (comment.user_id) {
			return userMap[comment.user_id] || this.getDefaultUser(comment.user_id);
		}
		// 기본값
		return this.getDefaultUser(comment.anonymous_id || 'unknown');
	},

	getDefaultUser(userId: string): CommentUser {
		return {
			id: userId,
			full_name: 'Anonymous',
			avatar_url: null,
			is_anonymous: false,
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
				is_anonymous: false,
			},
		};

		return commentWithUser;
	},

	/**
	 * 익명 댓글 생성
	 */
	async createAnonymous({
		postId,
		content,
		anonymousId,
		nickname,
		password,
		parentId,
	}: CreateAnonymousCommentInput): Promise<Comment> {
		// 비밀번호 해시
		const passwordHash = await hashPassword(password);

		const { data: commentData, error: commentError } = await supabase
			.from('post_comments')
			.insert({
				post_id: postId,
				content,
				user_id: null,
				anonymous_id: anonymousId,
				anonymous_name: nickname,
				password_hash: passwordHash,
				parent_id: parentId,
			})
			.select()
			.single<Comment>();

		if (commentError) {
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: 'Failed to create anonymous comment.',
				cause: commentError,
			});
		}

		const commentWithUser: Comment = {
			...commentData,
			user: {
				id: anonymousId,
				full_name: nickname,
				avatar_url: null,
				is_anonymous: true,
			},
		};

		return commentWithUser;
	},

	/**
	 * 익명 댓글 수정 (비밀번호 검증)
	 */
	async updateAnonymous({
		commentId,
		content,
		password,
	}: {
		commentId: string;
		content: string;
		password: string;
	}): Promise<Comment> {
		// 댓글 조회
		const { data: comment, error: selectError } = await supabase
			.from('post_comments')
			.select('*')
			.eq('id', commentId)
			.single();

		if (selectError || !comment) {
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: '댓글을 찾을 수 없습니다.',
			});
		}

		// 익명 댓글인지 확인
		if (!comment.anonymous_id || !comment.password_hash) {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: '익명 댓글이 아닙니다.',
			});
		}

		// 비밀번호 검증
		const isValid = await verifyPassword(password, comment.password_hash);
		if (!isValid) {
			throw new TRPCError({
				code: 'UNAUTHORIZED',
				message: '비밀번호가 일치하지 않습니다.',
			});
		}

		// 수정
		const { data: updatedComment, error: updateError } = await supabase
			.from('post_comments')
			.update({ content })
			.eq('id', commentId)
			.select()
			.single<Comment>();

		if (updateError) {
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: '댓글 수정에 실패했습니다.',
				cause: updateError,
			});
		}

		return {
			...updatedComment,
			user: {
				id: comment.anonymous_id,
				full_name: comment.anonymous_name,
				avatar_url: null,
				is_anonymous: true,
			},
		};
	},

	/**
	 * 익명 댓글 삭제 (비밀번호 검증)
	 */
	async deleteAnonymous({
		commentId,
		password,
	}: {
		commentId: string;
		password: string;
	}): Promise<void> {
		// 댓글 조회
		const { data: comment, error: selectError } = await supabase
			.from('post_comments')
			.select('*')
			.eq('id', commentId)
			.single();

		if (selectError || !comment) {
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: '댓글을 찾을 수 없습니다.',
			});
		}

		// 익명 댓글인지 확인
		if (!comment.anonymous_id || !comment.password_hash) {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: '익명 댓글이 아닙니다.',
			});
		}

		// 비밀번호 검증
		const isValid = await verifyPassword(password, comment.password_hash);
		if (!isValid) {
			throw new TRPCError({
				code: 'UNAUTHORIZED',
				message: '비밀번호가 일치하지 않습니다.',
			});
		}

		// 삭제 (답글 포함)
		const { error: deleteError } = await supabase
			.from('post_comments')
			.delete()
			.or(`id.eq.${commentId},parent_id.eq.${commentId}`);

		if (deleteError) {
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: '댓글 삭제에 실패했습니다.',
				cause: deleteError,
			});
		}
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

		// 익명 댓글인 경우
		if (!commentData.user_id && commentData.anonymous_id) {
			return {
				...commentData,
				user: {
					id: commentData.anonymous_id,
					full_name: commentData.anonymous_name || 'Anonymous',
					avatar_url: null,
					is_anonymous: true,
				},
			};
		}

		// 로그인 사용자 댓글인 경우
		if (!commentData.user_id) {
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: 'Invalid comment data: no user_id or anonymous_id',
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
				is_anonymous: false,
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

	/**
	 * 댓글 좋아요 토글 (로그인 사용자 또는 익명 사용자)
	 * @param identifier - userId 또는 anonymousId (anon_xxx)
	 */
	async toggleLike({
		commentId,
		identifier,
	}: {
		commentId: string;
		identifier: string;
	}): Promise<Comment> {
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

		const hasLiked = comment.liked_by.includes(identifier);

		// 좋아요 토글 업데이트
		const { data: commentData, error } = await supabase
			.from('post_comments')
			.update({
				likes: hasLiked ? comment.likes - 1 : comment.likes + 1,
				liked_by: hasLiked
					? comment.liked_by.filter((id) => id !== identifier) // 좋아요 제거
					: [...comment.liked_by, identifier], // 좋아요 추가
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

		// 댓글 작성자 정보 가져오기
		let user: CommentUser;

		if (commentData.anonymous_id && commentData.anonymous_name) {
			// 익명 댓글인 경우
			user = {
				id: commentData.anonymous_id,
				full_name: commentData.anonymous_name,
				avatar_url: null,
				is_anonymous: true,
			};
		} else if (commentData.user_id) {
			// 로그인 사용자 댓글인 경우
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

			user = {
				id: userData.user.id,
				email: userData.user.email || '',
				full_name: userName || 'Anonymous',
				avatar_url: userData.user.user_metadata?.avatar_url || null,
				is_anonymous: false,
			};
		} else {
			user = {
				id: 'unknown',
				full_name: 'Anonymous',
				avatar_url: null,
				is_anonymous: false,
			};
		}

		const commentWithUser: Comment = {
			...commentData,
			user,
		};

		return commentWithUser;
	},
};
