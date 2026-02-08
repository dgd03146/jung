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

	// 임베딩 재생성 mutation
	const generateEmbedding = useMutation(
		trpc.place.generateEmbedding.mutationOptions({
			onError: (error) => {
				console.error('Place embedding generation failed:', error);
			},
		}),
	);

	return useMutation({
		mutationFn: (input: UpdatePlaceInput) => updatePlace(input),

		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: placeKeys.detail(variables.id),
			});
			queryClient.invalidateQueries({
				queryKey: placeKeys.lists(),
			});
			showToast(`Place "${variables.title}" has been updated.`, 'success');

			// 임베딩 재생성 시작 후 네비게이션 (fire-and-forget)
			// mutateAsync를 await 없이 호출하여 mutation이 활성 observer에 연결된 상태 유지
			generateEmbedding.mutateAsync({ placeId: variables.id }).catch(() => {
				// 에러는 mutationOptions의 onError에서 처리됨
			});
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
