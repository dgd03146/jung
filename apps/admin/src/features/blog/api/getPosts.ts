import type { Post } from '@/fsd/entities';
import type { PostFilters } from '@/fsd/features';
import { supabase } from '@/fsd/shared';

type AdminPost = Omit<Post, 'imagesrc'>;

export const fetchPosts = async ({
	page,
	pageSize,
	sortField,
	sortOrder,
	filter,
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
		throw new Error('No posts found. Please try searching again.');
	}

	return {
		posts: data,
		totalCount,

		totalPages,
		hasMore,
	};
};
