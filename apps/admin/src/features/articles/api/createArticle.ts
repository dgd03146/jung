import { supabase } from '@/fsd/shared';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';
import type { Article, ArticleInput } from '../types';

export const createArticle = async (
	article: ArticleInput,
): Promise<Article> => {
	try {
		const { data, error } = await supabase
			.from('articles')
			.insert([article])
			.select()
			.single();

		if (error) {
			throw ApiError.fromPostgrestError(error);
		}
		if (!data) {
			throw new ApiError(
				'An error occurred while creating the article.',
				'NO_DATA',
			);
		}

		return data;
	} catch (error) {
		if (error instanceof ApiError) {
			throw error;
		}
		throw new ApiError('An unexpected error occurred.', 'UNKNOWN_ERROR');
	}
};
