import type { CategoryType } from '@jung/shared/types';
import { supabase } from '@/fsd/shared/api/supabase';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';

export const deleteCategory = async (
	categoryId: string,
	type: CategoryType,
): Promise<void> => {
	const { error } = await supabase
		.from('categories')
		.delete()
		.eq('id', categoryId)
		.eq('type', type);

	if (error) {
		throw ApiError.fromPostgrestError(error);
	}
};
