import { supabase } from '@/fsd/shared/api/supabase';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';
import type { Category } from '@jung/shared/types';

export const createCategory = async (
	category: Omit<Category, 'id'>,
): Promise<Category> => {
	if (!category.name?.trim()) {
		throw new ApiError('VALIDATION_ERROR', 'Category name is required');
	}

	if (!category.description?.trim()) {
		throw new ApiError('VALIDATION_ERROR', 'Description is required');
	}

	if (category.description.length > 100) {
		throw new ApiError(
			'VALIDATION_ERROR',
			'Description must be less than 100 characters',
		);
	}

	if (category.description.length < 10) {
		throw new ApiError(
			'VALIDATION_ERROR',
			'Description must be at least 10 characters',
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
				type: 'blog',
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
		throw new ApiError('NO_DATA', 'Failed to create category');
	}

	return data;
};
