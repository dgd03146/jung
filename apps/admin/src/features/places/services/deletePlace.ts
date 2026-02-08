import { supabase } from '@/fsd/shared';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';

export const deletePlace = async (id: string): Promise<void> => {
	try {
		const { data: place, error: getError } = await supabase
			.from('places')
			.select('photos')
			.eq('id', id)
			.single();

		if (getError) {
			throw ApiError.fromPostgrestError(getError);
		}

		if (!place) {
			throw new ApiError('Place not found', 'NOT_FOUND');
		}

		const { error: deleteError } = await supabase
			.from('places')
			.delete()
			.eq('id', id);

		if (deleteError) {
			throw ApiError.fromPostgrestError(deleteError);
		}

		const photos = place.photos as Array<{ url: string }> | null;
		if (photos) {
			await Promise.all(
				photos.map(async (photo) => {
					const filePath = new URL(photo.url).pathname.split('/').pop();
					if (filePath) {
						await supabase.storage
							.from('places_images')
							.remove([`uploads/${filePath}`]);
					}
				}),
			);
		}
	} catch (error) {
		if (error instanceof ApiError) {
			throw error;
		}
		throw new ApiError(
			'An unexpected error occurred while deleting the place',
			'UNKNOWN_ERROR',
		);
	}
};
