import type { Post } from '@/fsd/entities';
import { supabase } from '@/fsd/shared';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';

export const updatePost = async (
	postId: string,
	post: Partial<Post>,
): Promise<Post> => {
	try {
		const { data, error } = await supabase
			.from('posts')
			.update(post)
			.eq('id', postId)
			.select()
			.single();

		if (error) {
			throw ApiError.fromPostgrestError(error);
		}
		if (!data) {
			throw new ApiError(
				'An error occurred while updating the post.',
				'NO_DATA',
			);
		}

		return data;
	} catch (error) {
		if (error instanceof ApiError) {
			throw error;
		}
		throw new ApiError(
			'An unexpected error occurred while updating the post.',
			'UNKNOWN_ERROR',
		);
	}
};
