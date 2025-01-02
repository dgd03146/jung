import { supabase } from '@/fsd/shared';

export const fetchCategories = async (): Promise<string[]> => {
	const { data, error } = await supabase
		.from('posts')
		.select('category')
		.not('category', 'is', null);

	if (error) {
		throw new Error(`Failed to fetch categories: ${error.message}`);
	}

	return Array.from(
		new Set(data.map((post) => post.category).filter(Boolean)),
	).sort();
};
