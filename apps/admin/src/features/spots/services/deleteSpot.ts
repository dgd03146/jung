import { supabase } from '@/fsd/shared';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';

export const deleteSpot = async (id: string): Promise<void> => {
	try {
		const { data: spot, error: getError } = await supabase
			.from('spots')
			.select('photos')
			.eq('id', id)
			.single();

		if (getError) {
			throw ApiError.fromPostgrestError(getError);
		}

		if (!spot) {
			throw new ApiError('Spot not found', 'NOT_FOUND');
		}

		const { error: deleteError } = await supabase
			.from('spots')
			.delete()
			.eq('id', id);

		if (deleteError) {
			throw ApiError.fromPostgrestError(deleteError);
		}

		await Promise.all(
			spot.photos.map(async (photo: { url: string }) => {
				const filePath = new URL(photo.url).pathname.split('/').pop();
				if (filePath) {
					await supabase.storage
						.from('spots_images')
						.remove([`uploads/${filePath}`]);
				}
			}),
		);
	} catch (error) {
		if (error instanceof ApiError) {
			throw error;
		}
		throw new ApiError(
			'An unexpected error occurred while deleting the spot',
			'UNKNOWN_ERROR',
		);
	}
};
