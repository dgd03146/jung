import { supabase } from '@/fsd/shared/api/supabase';

import { ApiError } from '@/fsd/shared/lib/errors/apiError';
import type { Category } from '@jung/shared/types';

export const createCategory = async (
	category: Omit<Category, 'id' | 'postCount'>,
): Promise<Category> => {
	try {
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
			.select()
			.single();

		if (error) {
			throw ApiError.fromPostgrestError(error);
		}

		return {
			id: data.id,
			name: data.name,
			description: data.description || '',
			color: data.color || '#000000',
			parent_id: data.parent_id,
			type: data.type,
			created_at: data.created_at,
		};
	} catch (error) {
		if (error instanceof ApiError) {
			throw error;
		}
		throw new ApiError(
			'An unexpected error occurred while creating the category.',
			'UNKNOWN_ERROR',
		);
	}
};
