import type { AdminPost } from '@/fsd/entities/post/model/post';
import { supabase } from '@/fsd/shared';
import type { PostFilters } from '../types/postFilters';

export const fetchPosts = async ({
	page,
	pageSize,
	sortField,
	sortOrder,
	filter,
	category,
}: PostFilters): Promise<{
	posts: AdminPost[];
	totalCount: number;
	totalPages: number;
	hasMore: boolean;
}> => {
	const from = page * pageSize;
	const to = from + pageSize - 1;

	let query = supabase.from('posts').select('*', { count: 'exact' });

	if (sortField) {
		query = query.order(sortField, { ascending: sortOrder === 'asc' });
	}

	if (category) {
		query = query.eq('category_id', category);
	}

	if (filter) {
		query = query.or(`title.ilike.%${filter}%,description.ilike.%${filter}%`);
	}

	query = query.range(from, to);

	const { data, error, count } = await query;

	const totalCount = count ?? 0;
	const totalPages = Math.ceil(totalCount / pageSize);
	const hasMore = page < totalPages - 1;

	if (error) {
		throw new Error(`Failed to fetch posts: ${error.message}`);
	}
	if (!data || data.length === 0) {
		return { posts: [], totalCount, totalPages, hasMore };
	}

	const posts: AdminPost[] = data.map((post) => ({
		id: String(post.id),
		title: post.title ?? '',
		date: post.date ?? '',
		tags: post.tags ?? [],
		category_id: post.category_id ?? '',
		description: post.description ?? '',
		content:
			typeof post.content === 'string'
				? post.content
				: JSON.stringify(post.content),
	}));

	return {
		posts,
		totalCount,
		totalPages,
		hasMore,
	};
};
