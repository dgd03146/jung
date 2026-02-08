import { useToast } from '@jung/design-system/components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useTRPC } from '@/fsd/app';
import { placeKeys } from '@/fsd/shared';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';
import type { UpdatePlaceInput } from '../services/updatePlace';
import { updatePlace } from '../services/updatePlace';

export const useUpdatePlace = () => {
	const queryClient = useQueryClient();
	const showToast = useToast();
	const navigate = useNavigate();
	const trpc = useTRPC();

	const translatePlace = useMutation(trpc.translate.place.mutationOptions({}));

	return useMutation({
		mutationFn: async (input: UpdatePlaceInput) => {
			const translations = await translatePlace.mutateAsync({
				title: input.title,
				description: input.description,
				address: input.address,
				tags: input.tags,
				tips: input.tips,
			});
			return updatePlace({ ...input, translations });
		},

		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: placeKeys.detail(variables.id),
			});
			queryClient.invalidateQueries({
				queryKey: placeKeys.lists(),
			});
			showToast(`Place "${variables.title}" has been updated.`, 'success');
			navigate({ to: '/places' });
		},

		onError: (error: unknown) => {
			console.error('Failed to update place:', error);

			if (error instanceof ApiError) {
				switch (error.code) {
					case 'FOREIGN_KEY_VIOLATION':
						showToast('Invalid category.', 'error');
						break;
					case 'NO_DATA':
						showToast('Failed to update place information.', 'error');
						break;
					case 'VALIDATION_ERROR':
						showToast('Invalid input.', 'error');
						break;
					case 'NOT_FOUND':
						showToast('Place not found.', 'error');
						break;
					default:
						showToast(`Update failed: ${error.message}`, 'error');
				}
			} else {
				showToast('An unknown error occurred.', 'error');
			}
		},
	});
};
