import { supabase } from '@/fsd/shared';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';
import type { Article } from '../types';

export const updateArticle = async (
	articleId: string,
	article: Partial<Article>,
): Promise<Article> => {
	try {
		const { data, error } = await supabase
			.from('articles')
			.update({ ...article, updated_at: new Date().toISOString() })
			.eq('id', articleId)
			.select()
			.single();

		if (error) {
			throw ApiError.fromPostgrestError(error);
		}
		if (!data) {
			throw new ApiError(
				'An error occurred while updating the article.',
				'NO_DATA',
			);
		}

		return data;
	} catch (error) {
		if (error instanceof ApiError) {
			throw error;
		}
		throw new ApiError(
			'An unexpected error occurred while updating the article.',
			'UNKNOWN_ERROR',
		);
	}
};
