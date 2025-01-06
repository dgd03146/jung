import { supabase } from '@/fsd/shared/api/supabase';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';

export const deleteCategory = async (category_id: string): Promise<void> => {
	const { error } = await supabase
		.from('categories')
		.delete()
		.eq('id', category_id);

	if (error) {
		throw ApiError.fromPostgrestError(error);
	}
};
