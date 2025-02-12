import { photoKeys } from '@/fsd/shared';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';
import { useToast } from '@jung/design-system/components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePhoto } from '../services/updatePhoto';
import type { UpdatePhotoInput } from '../services/updatePhoto';

export const useUpdatePhoto = () => {
	const queryClient = useQueryClient();
	const showToast = useToast();

	return useMutation({
		mutationFn: (input: UpdatePhotoInput) => updatePhoto(input),

		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: photoKeys.detail(variables.id),
			});
			queryClient.invalidateQueries({
				queryKey: photoKeys.list({
					page: 0,
					pageSize: 10,
					sortField: 'created_at',
					sortOrder: 'desc',
				}),
			});
			showToast('Photo updated successfully!', 'success');
		},

		onError: (error: unknown) => {
			console.error('Failed to update photo:', error);

			if (error instanceof ApiError) {
				switch (error.code) {
					case 'UPLOAD_ERROR':
						showToast('Failed to upload new image', 'error');
						break;
					case 'NO_DATA':
						showToast('Failed to update photo information', 'error');
						break;
					case 'VALIDATION_ERROR':
						showToast('Invalid image format', 'error');
						break;
					case 'NOT_FOUND':
						showToast('Photo not found', 'error');
						break;
					default:
						showToast(`Update failed: ${error.message}`, 'error');
				}
			} else {
				showToast('An unknown error occurred', 'error');
			}
		},
	});
};
