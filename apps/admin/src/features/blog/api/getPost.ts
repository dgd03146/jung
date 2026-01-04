import type { Post } from '@/fsd/entities';
import { supabase } from '@/fsd/shared';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';

export const fetchPostById = async (postId?: string): Promise<Post> => {
	try {
		const { data, error } = await supabase
			.from('posts')
			.select()
			.eq('id', postId)
			.single<Post>();

		if (error) {
			throw ApiError.fromPostgrestError(error);
		}

		if (!data) {
			throw new ApiError('Post not found', 'NOT_FOUND');
		}

		return data;
	} catch (error) {
		if (error instanceof ApiError) {
			throw new ApiError(error.message, 'UNKNOWN_ERROR');
		}
		throw new ApiError(
			'An unexpected error occurred while fetching the post.',
			'UNKNOWN_ERROR',
		);
	}
};
