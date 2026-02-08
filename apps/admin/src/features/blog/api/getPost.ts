import type { Post } from '@/fsd/entities';
import { supabase } from '@/fsd/shared';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';

export const fetchPostById = async (postId?: string): Promise<Post> => {
	try {
		if (!postId) {
			throw new ApiError('Post ID is required', 'VALIDATION_ERROR');
		}

		const { data, error } = await supabase
			.from('posts')
			.select()
			.eq('id', Number(postId))
			.single();

		if (error) {
			throw ApiError.fromPostgrestError(error);
		}

		if (!data) {
			throw new ApiError('Post not found', 'NOT_FOUND');
		}

		return {
			id: String(data.id),
			title: data.title ?? '',
			imagesrc: data.imagesrc ?? '',
			date: data.date ?? '',
			tags: data.tags ?? [],
			category_id: data.category_id ?? '',
			description: data.description ?? '',
			content:
				typeof data.content === 'string'
					? data.content
					: JSON.stringify(data.content),
		};
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
