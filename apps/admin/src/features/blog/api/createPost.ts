import type { Post } from '@/fsd/entities';
import { supabase } from '@/fsd/shared';

import { ApiError } from '@/fsd/shared/lib/errors/apiError';
import type { PostData } from '../types/postData';

export const createPost = async (postData: PostData): Promise<Post> => {
	const { content, ...restPostData } = postData;
	try {
		const { data, error } = await supabase
			.from('posts')
			.insert([
				{
					...restPostData,
					date: new Date().toISOString(),
					content: JSON.stringify(content),
				},
			])
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
			...data,
			content: JSON.parse(data.content),
		};
	} catch (error) {
		if (error instanceof ApiError) {
			throw error;
		}
		throw new ApiError('An unexpected error occurred.', 'UNKNOWN_ERROR');
	}
};
