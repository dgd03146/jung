import { supabase } from '@/fsd/shared/api/supabase';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';
import type { Category } from '@jung/shared/types';

export const updateCategory = async (
	categoryId: string,
	updates: Partial<Category>,
): Promise<Category> => {
	try {
		const { data: category, error } = await supabase
			.from('categories')
			.update(updates)
			.eq('id', categoryId)
			.select()
			.single();

		if (error) {
			throw ApiError.fromPostgrestError(error);
		}

		return category;
	} catch (error) {
		if (error instanceof ApiError) {
			throw error;
		}
		throw new ApiError(
			'An unexpected error occurred while updating the category.',
			'UNKNOWN_ERROR',
		);
	}
};
