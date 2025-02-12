import { supabase } from '@/fsd/shared';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';
import { ErrorCodes } from '@/fsd/shared/lib/errors/errorCodes';

export const deletePostById = async (postId: string): Promise<boolean> => {
	try {
		const { error } = await supabase.from('posts').delete().eq('id', postId);

		if (error) {
			throw ApiError.fromPostgrestError(error);
		}

		return true;
	} catch (error) {
		if (error instanceof ApiError) {
			throw new ApiError(
				'Failed delete the post',
				ErrorCodes.INTERNAL_SERVER_ERROR,
			);
		}

		throw new ApiError(
			'An unexpected error occurred while deleting the post.',
			'UNKNOWN_ERROR',
		);
	}
};
