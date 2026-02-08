import type { Post } from '@/fsd/entities';
import { supabase } from '@/fsd/shared';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';

export const updatePost = async (
	postId: string,
	post: Partial<Post>,
): Promise<Post> => {
	try {
		const { id: _id, ...updateData } = post;
		const numericId = Number(postId);

		const { data, error } = await supabase
			.from('posts')
			.update(updateData)
			.eq('id', numericId)
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
		throw new ApiError(
			'An unexpected error occurred while updating the post.',
			'UNKNOWN_ERROR',
		);
	}
};
