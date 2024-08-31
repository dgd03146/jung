import { supabase } from '@/fsd/shared';

// FIXME: Shared workspace로 공용 타입
type Post = {
	id: string;
	imagesrc: string;
	date: string;
	tags: string[];
	title: string;
	description: string;
	link: string;
};

type AdminPost = Omit<Post, 'imagesrc'>;

export const fetchPosts = async (page: number, pageSize: number) => {
	const from = page * pageSize;
	const to = from + pageSize - 1;

	const { data, error, count } = await supabase
		.from('posts')
		.select('*', { count: 'exact' })
		.order('date', { ascending: false })
		.range(from, to)
		.returns<AdminPost[]>();

	if (error) {
		throw new Error('Failed to fetch posts. Please try again later.');
	}
	if (!data || data.length === 0) {
		throw new Error('No posts found. Please try searching again.');
	}

	const totalCount = count ?? 0;
	const totalPages = Math.ceil(totalCount / pageSize);
	const hasMore = page < totalPages - 1;

	return {
		posts: data,
		totalCount: count ?? 0,
		currentPage: page,
		pageSize,
		totalPages,
		hasMore,
	};
};
