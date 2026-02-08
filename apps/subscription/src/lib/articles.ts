import type { Database } from '@jung/shared/types';
import { supabase } from './supabase';

export type Article = Database['public']['Tables']['articles']['Row'];

export const getArticles = async (category?: string): Promise<Article[]> => {
	let query = supabase
		.from('articles')
		.select('*')
		.order('published_at', { ascending: false, nullsFirst: false });

	if (category && category !== 'all') {
		query = query.eq('category', category);
	}

	const { data, error } = await query;

	if (error) {
		console.error('Error fetching articles:', error);
		return [];
	}

	return data ?? [];
};

export const getArticleById = async (id: string): Promise<Article | null> => {
	const { data, error } = await supabase
		.from('articles')
		.select('*')
		.eq('id', id)
		.single();

	if (error) {
		console.error('Error fetching article:', error);
		return null;
	}

	return data;
};
