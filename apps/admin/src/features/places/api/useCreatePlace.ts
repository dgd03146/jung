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

	// 임베딩 생성 mutation
	const generateEmbedding = useMutation(
		trpc.place.generateEmbedding.mutationOptions({
			onError: (error) => {
				console.error('Place embedding generation failed:', error);
				showToast('검색용 임베딩 생성에 실패했습니다.', 'warning');
			},
		}),
	);

	return useMutation({
		mutationFn: (data: CreatePlaceInput) => createPlace(data),

		onSuccess: (newPlace, variables) => {
			queryClient.invalidateQueries({
				queryKey: placeKeys.lists(),
			});
			showToast(`Place "${variables.title}" created successfully!`, 'success');
			navigate({ to: '/places' });

			// 비동기로 임베딩 생성 (UI 블로킹 없음)
			generateEmbedding.mutate({ placeId: newPlace.id });
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
