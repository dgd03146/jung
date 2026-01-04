import type { Category, CategoryType } from '@jung/shared/types';
import { supabase } from '@/fsd/shared/api/supabase';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';

export const createCategory = async (
	category: Omit<Category, 'id'>,
	type: CategoryType,
): Promise<Category> => {
	if (!category.name?.trim()) {
		throw new ApiError(
			'VALIDATION_ERROR',
			`${type === 'blog' ? 'Blog' : 'Spot'} category name is required`,
		);
	}

	if (!category.description?.trim()) {
		throw new ApiError('VALIDATION_ERROR', 'Description is required');
	}

	if (category.description.length > 50) {
		throw new ApiError(
			'VALIDATION_ERROR',
			'Description must be less than 50 characters',
		);
	}

	if (category.description.length < 5) {
		throw new ApiError(
			'VALIDATION_ERROR',
			'Description must be at least 5 characters',
		);
	}

	const { data, error } = await supabase
		.from('categories')
		.insert([
			{
				name: category.name.trim(),
				description: category.description.trim(),
				color: category.color || '#0142C0',
				parent_id: category.parent_id || null,
				type,
			},
		])
		.select(`
      id,
      name,
      description,
      color,
      parent_id,
      type,
      created_at
    `)
		.single();

	if (error) {
		throw ApiError.fromPostgrestError(error);
	}

	if (!data) {
		throw new ApiError('NO_DATA', `Failed to create ${type} category`);
	}

	return data;
};
