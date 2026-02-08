import { useToast } from '@jung/design-system/components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useTRPC } from '@/fsd/app';
import { photoKeys } from '@/fsd/shared';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';
import type { CreatePhotoInput } from '../services/createPhoto';
import { createPhoto } from '../services/createPhoto';

export const useCreatePhoto = () => {
	const queryClient = useQueryClient();
	const showToast = useToast();
	const navigate = useNavigate();
	const trpc = useTRPC();

	const translatePhoto = useMutation(trpc.translate.photo.mutationOptions({}));

	return useMutation({
		mutationFn: async (input: CreatePhotoInput) => {
			const translations = await translatePhoto.mutateAsync({
				title: input.title,
				description: input.description,
				tags: input.tags,
			});
			return createPhoto({ ...input, translations });
		},

		// FIXME: Image flickering issue
		// Current behavior: Old image briefly shows before being replaced by the new one
		// Potential fix: Implement optimistic updates or move invalidation after

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: photoKeys.lists(),
			});
			showToast('Photo uploaded successfully!', 'success');
			navigate({ to: '/gallery/photos' });
		},

		onError: (error: unknown) => {
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
