import type { Database } from '@jung/shared/types';
import { createServerFn } from '@tanstack/react-start';
import { getServerSupabase } from './supabase';

export type Article = Database['public']['Tables']['articles']['Row'];

export const fetchArticles = createServerFn({ method: 'GET' })
	.validator((category?: string) => category)
	.handler(async ({ data: category }) => {
		const supabase = getServerSupabase();

		let query = supabase
			.from('articles')
			.select('*')
			.eq('status', 'published')
			.order('published_at', { ascending: false, nullsFirst: false });

		if (category && category !== 'all') {
			query = query.eq('category', category);
		}

		const { data, error } = await query;

		if (error) {
			throw new Error(`Failed to fetch articles: ${error.message}`);
		}

		return data ?? [];
	});

export const fetchArticleById = createServerFn({ method: 'GET' })
	.validator((id: string) => id)
	.handler(async ({ data: id }) => {
		const supabase = getServerSupabase();

		const { data, error } = await supabase
			.from('articles')
			.select('*')
			.eq('id', id)
			.eq('status', 'published')
			.single();

		if (error) {
			throw new Error(`Failed to fetch article: ${error.message}`);
		}

		return data;
	});
