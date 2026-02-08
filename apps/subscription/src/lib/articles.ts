import { supabase } from './supabase';

export interface Article {
	id: string;
	title: string;
	original_url: string;
	summary: string;
	my_thoughts: string | null;
	category: 'frontend' | 'ai';
	published_at: string | null;
	created_at: string;
	updated_at: string;
}

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
