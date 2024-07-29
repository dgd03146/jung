import { supabase } from '../lib/supabse';
import type { Post } from '../schemas/post';

export const postService = {
	async findMany(): Promise<Post[]> {
		const { data, error } = await supabase
			.from('posts')
			.select('*')
			.order('date', { ascending: false });

		if (error) throw error;
		return data as Post[];
	},

	async findById(id: string): Promise<Post | null> {
		const { data, error } = await supabase
			.from('posts')
			.select('*')
			.eq('id', id)
			.single();

		if (error) throw error;
		return data as Post | null;
	},

	async create(post: Omit<Post, 'id'>): Promise<Post> {
		const { data, error } = await supabase
			.from('posts')
			.insert(post)
			.select()
			.single();

		if (error) throw error;
		return data as Post;
	},
};
