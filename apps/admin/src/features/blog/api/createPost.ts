import type { Post } from '@/fsd/entities';
import { supabase } from '@/fsd/shared';

import { ApiError } from '@/fsd/shared/lib/errors/apiError';

export const createPost = async (post: Omit<Post, 'id'>): Promise<Post> => {
	try {
		const { data, error } = await supabase
			.from('posts')
			.insert([post])
			.select()
			.single();

		if (error) {
			throw ApiError.fromPostgrestError(error);
		}
		if (!data) {
			throw new ApiError(
				'An error occurred while creating the post.',
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
