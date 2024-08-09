import { TRPCError } from '@trpc/server';
import { supabase } from '../lib/supabse';
import type { Post } from '../schemas/post';

export const postService = {
	async findMany(): Promise<Post[]> {
		const { data, error } = await supabase
			.from('posts')
			.select('*')
			.order('date', { ascending: false });

		if (error) {
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: 'Failed to fetch posts. Please try again later.',
				cause: error,
			});
		}
		if (!data || data.length === 0) {
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'No posts found. Please try searching again.',
			});
		}
		return data as Post[];
	},

	async findById(id: string): Promise<Post | null> {
		const { data, error } = await supabase
			.from('posts')
			.select('*')
			.eq('id', id)
			.single();

		if (error) {
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Post not found. Please try searching again.',
				cause: error,
			});
		}
		if (!data) {
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Post not found. Please try searching again.',
			});
		}
		return data as Post;
	},

	async create(post: Omit<Post, 'id'>): Promise<Post> {
		const { data, error } = await supabase
			.from('posts')
			.insert(post)
			.select()
			.single();

		if (error) {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: 'Failed to create post. Please try again later.',
				cause: error,
			});
		}
		if (!data) {
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: 'Failed to create post. Please try again later.',
			});
		}
		return data as Post;
	},
};
