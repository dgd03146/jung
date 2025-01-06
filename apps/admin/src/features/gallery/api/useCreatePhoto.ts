import { photoKeys } from '@/fsd/shared';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';
import { useToast } from '@jung/design-system/components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPhoto } from '../services/createPhoto';
import type { CreatePhotoInput } from '../services/createPhoto';

export const useCreatePhoto = () => {
	const queryClient = useQueryClient();
	const showToast = useToast();

	return useMutation({
		mutationFn: (input: CreatePhotoInput) => createPhoto(input),

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: photoKeys.lists() });
			showToast('Photo uploaded successfully!', 'success');
		},

		onError: (error: unknown) => {
			console.error('Failed to create photo:', error);

			if (error instanceof ApiError) {
				switch (error.code) {
					case 'UPLOAD_ERROR':
						showToast('Failed to upload image', 'error');
						break;
					case 'NO_DATA':
						showToast('Failed to save photo information', 'error');
						break;
					case 'VALIDATION_ERROR':
						showToast('Invalid image format', 'error');
						break;
					default:
						showToast(`Upload failed: ${error.message}`, 'error');
				}
			} else {
				showToast('An unknown error occurred', 'error');
			}
		},
	});
};
