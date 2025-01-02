import { photoKeys } from '@/fsd/shared';
import type { ApiError } from '@/fsd/shared/lib/errors/apiError';
import { useToast } from '@jung/design-system/components';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// Mock delete function
const mockDeletePhotoById = async (id: string): Promise<void> => {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 500));

	// Simulate random error (10% chance)
	if (Math.random() < 0.1) {
		throw {
			code: 'NOT_FOUND',
			message: 'Photo not found',
		} as ApiError;
	}

	console.log('Mock: Photo deleted', id);
	return;
};

export const useDeletePhoto = () => {
	const queryClient = useQueryClient();
	const showToast = useToast();

	return useMutation({
		mutationFn: (id: string) => mockDeletePhotoById(id),
		onSuccess: async (_, deletedId) => {
			await queryClient.invalidateQueries({ queryKey: photoKeys.lists() });
			queryClient.removeQueries({ queryKey: photoKeys.detail(deletedId) });

			showToast('Photo deleted successfully!');
		},
		onError: (error: ApiError) => {
			switch (error.code) {
				case 'NOT_FOUND':
					showToast('Failed to delete photo: Photo not found');
					break;
				case 'UNKNOWN_ERROR':
					showToast('An unexpected error occurred. Please try again later.');
					break;
				default:
					showToast(`Failed to delete photo: ${error.message}`);
			}
			console.error('Photo deletion error:', error);
		},
	});
};
