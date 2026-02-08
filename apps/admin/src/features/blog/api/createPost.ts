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
			throw error;
		}
		throw new ApiError('An unexpected error occurred.', 'UNKNOWN_ERROR');
	}
};
