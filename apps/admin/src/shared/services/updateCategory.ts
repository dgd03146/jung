import type { Category, CategoryType } from '@jung/shared/types';
import { supabase } from '@/fsd/shared/api/supabase';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';

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

		return {
			...category,
			color: category.color ?? '#0142C0',
			description: category.description ?? '',
			created_at: category.created_at ?? new Date().toISOString(),
		};
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
