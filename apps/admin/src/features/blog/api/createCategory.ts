import { supabase } from '@/fsd/shared/api/supabase';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';
import type { Category } from '@jung/shared/types';

export const createCategory = async (
	category: Omit<Category, 'id'>,
): Promise<Category> => {
	const { data, error } = await supabase
		.from('categories')
		.insert([
			{
				name: category.name,
				description: category.description,
				color: category.color,
				parent_id: category.parent_id,
				type: 'blog',
			},
		])
		.select(`
			*,
			posts(count)
		`)
		.single();

	if (error) {
		throw ApiError.fromPostgrestError(error);
	}

	return {
		...data,
		description: data.description ?? '',
		color: data.color ?? '#0142C0',
	};
};
