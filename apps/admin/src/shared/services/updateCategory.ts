import { supabase } from '@/fsd/shared/api/supabase';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';
import type { Category, CategoryType } from '@jung/shared/types';

export const updateCategory = async (
	categoryId: string,
	updates: Partial<Category>,
	type: CategoryType,
): Promise<Category> => {
	try {
		const { data: category, error } = await supabase
			.from('categories')
			.update({ ...updates, type })
			.eq('id', categoryId)
			.eq('type', type)
			.select()
			.single();

		if (error) {
			throw ApiError.fromPostgrestError(error);
		}

		if (!category) {
			throw new ApiError(
				`${type === 'blog' ? 'Blog' : 'Spot'} category not found`,
				'NOT_FOUND',
			);
		}

		return category;
	} catch (error) {
		if (error instanceof ApiError) {
			throw error;
		}
		throw new ApiError(
			`An unexpected error occurred while updating the ${type} category.`,
			'UNKNOWN_ERROR',
		);
	}
};
