import { useToast } from '@jung/design-system/components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { placeKeys } from '@/fsd/shared';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';
import { deletePlace } from '../services/deletePlace';

export const useDeletePlace = () => {
	const queryClient = useQueryClient();
	const showToast = useToast();

	return useMutation({
		mutationFn: deletePlace,

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: placeKeys.lists(),
			});
			showToast('Place successfully deleted.', 'success');
		},

		onError: (error: unknown) => {
			console.error('Failed to delete place:', error);

			if (error instanceof ApiError) {
				switch (error.code) {
					case 'NOT_FOUND':
						showToast('Place not found.', 'error');
						break;
					case 'FOREIGN_KEY_VIOLATION':
						showToast(
							'Cannot delete this place due to associated data.',
							'error',
						);
						break;
					default:
						showToast(`Delete failed: ${error.message}`, 'error');
				}
			} else {
				showToast('An unknown error occurred.', 'error');
			}
		},
	});
};
