import { useToast } from '@jung/design-system/components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';
import { deletePhoto } from '../services/deletePhoto';
import { photoQueryOptions } from './photoQueryOptions';

export const useDeletePhoto = () => {
	const queryClient = useQueryClient();
	const showToast = useToast();

	return useMutation({
		mutationFn: deletePhoto,

		onMutate: async (photoId) => {
			await queryClient.cancelQueries({ queryKey: photoQueryOptions.lists() });
			return { photoId };
		},

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: photoQueryOptions.lists(),
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
