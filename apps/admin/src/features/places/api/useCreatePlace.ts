import { useToast } from '@jung/design-system/components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useTRPC } from '@/fsd/app';
import { placeKeys } from '@/fsd/shared';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';
import { type CreatePlaceInput, createPlace } from '../services/createPlace';

export function useCreatePlace() {
	const queryClient = useQueryClient();
	const showToast = useToast();
	const navigate = useNavigate();
	const trpc = useTRPC();

	const translatePlace = useMutation(trpc.translate.place.mutationOptions({}));

	return useMutation({
		mutationFn: async (data: CreatePlaceInput) => {
			const translations = await translatePlace.mutateAsync({
				title: data.title,
				description: data.description,
				address: data.address,
				tags: data.tags,
				tips: data.tips,
			});
			return createPlace({ ...data, translations });
		},

		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: placeKeys.lists(),
			});
			showToast(`Place "${variables.title}" created successfully!`, 'success');
			navigate({ to: '/places' });
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
