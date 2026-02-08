import { supabase } from '@/fsd/shared';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';
import type { Article } from '../types';

export const getArticleById = async (articleId: string): Promise<Article> => {
	const { data, error } = await supabase
		.from('articles')
		.select('*')
		.eq('id', articleId)
		.single();

	if (error) {
		throw ApiError.fromPostgrestError(error);
	}

	if (!data) {
		throw new ApiError('Article not found', 'NOT_FOUND');
	}

	return data;
};
