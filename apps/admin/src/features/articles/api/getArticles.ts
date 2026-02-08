import { supabase } from '@/fsd/shared';
import type { Article, ArticleFilters } from '../types';

export const fetchArticles = async ({
	page,
	pageSize,
	sortField,
	sortOrder,
	filter,
}: ArticleFilters): Promise<{
	articles: Article[];
	totalCount: number;
	totalPages: number;
	hasMore: boolean;
}> => {
	const from = page * pageSize;
	const to = from + pageSize - 1;

	let query = supabase.from('articles').select('*', { count: 'exact' });

	if (sortField) {
		query = query.order(sortField, { ascending: sortOrder === 'asc' });
	} else {
		query = query.order('created_at', { ascending: false });
	}

	if (filter) {
		query = query.or(`title.ilike.%${filter}%,summary.ilike.%${filter}%`);
	}

	query = query.range(from, to);

	const { data, error, count } = await query;

	const totalCount = count ?? 0;
	const totalPages = Math.ceil(totalCount / pageSize);
	const hasMore = page < totalPages - 1;

	if (error) {
		throw new Error(`Failed to fetch articles: ${error.message}`);
	}

	return {
		articles: data ?? [],
		totalCount,
		totalPages,
		hasMore,
	};
};
