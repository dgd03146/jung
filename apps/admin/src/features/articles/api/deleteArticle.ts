import { supabase } from '@/fsd/shared';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';

export const deleteArticleById = async (
	articleId: string,
): Promise<boolean> => {
	try {
		const { error } = await supabase
			.from('articles')
			.delete()
			.eq('id', articleId);

		if (error) {
			throw ApiError.fromPostgrestError(error);
		}

		return true;
	} catch (error) {
		if (error instanceof ApiError) {
			throw error;
		}

		throw new ApiError(
			'An unexpected error occurred while deleting the article.',
			'UNKNOWN_ERROR',
		);
	}
};
