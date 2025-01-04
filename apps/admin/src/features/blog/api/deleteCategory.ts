import { supabase } from '@/fsd/shared/api/supabase';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';

export const deleteCategory = async (categoryId: string): Promise<void> => {
	try {
		const { error } = await supabase
			.from('categories')
			.delete()
			.eq('id', categoryId);

		if (error) {
			throw ApiError.fromPostgrestError(error);
		}
	} catch (error) {
		if (error instanceof ApiError) {
			throw error;
		}
		throw new ApiError(
			'An unexpected error occurred while deleting the category.',
			'UNKNOWN_ERROR',
		);
	}
};
