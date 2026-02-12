import { supabase } from '@/fsd/shared';
import type { Article, ArticleFilters } from '../types';

export const fetchArticles = async ({
	page,
	pageSize,
	sortField,
	sortOrder,
	filter,
	status,
	category,
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

	if (status) {
		query = query.eq('status', status);
	}

	if (category) {
		query = query.eq('category', category);
	}

	if (filter) {
		const escaped = filter
			.replace(/[%_]/g, (char) => `\\${char}`)
			.replace(/[(),.']/g, '');
		if (/^[\w\s\-가-힣]+$/.test(escaped)) {
			query = query.or(`title.ilike.%${escaped}%,summary.ilike.%${escaped}%`);
		}
	}

	query = query.range(from, to);

	const { data, error, count } = await query;

	if (error) {
		throw new Error(`Failed to fetch articles: ${error.message}`);
	}

	const totalCount = count ?? 0;
	const totalPages = Math.ceil(totalCount / pageSize);
	const hasMore = page < totalPages - 1;

	return {
		articles: data ?? [],
		totalCount,
		totalPages,
		hasMore,
	};
};
