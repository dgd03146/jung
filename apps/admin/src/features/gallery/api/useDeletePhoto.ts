import { photoKeys } from '@/fsd/shared';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';
import { useToast } from '@jung/design-system/components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePhoto } from '../services/deletePhoto';

export const useDeletePhoto = () => {
	const queryClient = useQueryClient();
	const showToast = useToast();

	return useMutation({
		mutationFn: deletePhoto,

		onSuccess: () => {
			// FIXME: Image flickering issue - Consider moving invalidation after UI update
			queryClient.invalidateQueries({
				queryKey: photoKeys.lists(),
			});
			showToast('Photo deleted successfully!', 'success');
		},

		onError: (error: unknown) => {
			if (error instanceof ApiError) {
				switch (error.code) {
					case 'NOT_FOUND':
						showToast('Photo not found', 'error');
						break;
					case 'STORAGE_ERROR':
						showToast('Failed to delete image file', 'error');
						break;
					case 'FOREIGN_KEY_VIOLATION':
						showToast('Cannot delete photo: it is being used', 'error');
						break;
					default:
						showToast(`Delete failed: ${error.message}`, 'error');
				}
			} else {
				showToast('An unknown error occurred', 'error');
			}
		},
	});
};
