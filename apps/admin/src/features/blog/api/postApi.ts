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

export const fetchPosts = async () => {
	const { data, error } = await supabase
		.from('posts')
		.select('*')
		.order('date', { ascending: false })

		.returns<AdminPost[]>();

	if (error) {
		throw new Error('Failed to fetch posts. Please try again later.');
	}
	if (!data || data.length === 0) {
		throw new Error('No posts found. Please try searching again.');
	}

	return data;
};
