import { spotKeys } from '@/fsd/shared';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';
import { useToast } from '@jung/design-system/components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { type CreateSpotInput, createSpot } from '../services/createSpot';

export function useCreateSpot() {
	const queryClient = useQueryClient();
	const showToast = useToast();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: (data: CreateSpotInput) => createSpot(data),

		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: spotKeys.lists(),
			});
			showToast(`Spot "${variables.title}" created successfully!`, 'success');
			navigate({ to: '/spots' });
		},

		onError: (error: unknown) => {
			console.log(error, 'error');
			if (error instanceof ApiError) {
				switch (error.code) {
					case 'FOREIGN_KEY_VIOLATION':
						showToast('Invalid category', 'error');
						break;
					case 'VALIDATION_ERROR':
						showToast('Invalid input', 'error');
						break;
					case 'STORAGE_ERROR':
						showToast('Failed to upload image', 'error');
						break;
					default:
						showToast(`Create failed: ${error.message}`, 'error');
				}
			} else {
				showToast('An unknown error occurred', 'error');
			}
		},
	});
}
