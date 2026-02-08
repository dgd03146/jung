import { useToast } from '@jung/design-system/components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTRPC } from '@/fsd/app';
import { photoKeys } from '@/fsd/shared';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';
import type { UpdatePhotoInput } from '../services/updatePhoto';
import { updatePhoto } from '../services/updatePhoto';

export const useUpdatePhoto = () => {
	const queryClient = useQueryClient();
	const showToast = useToast();
	const trpc = useTRPC();

	// 임베딩 재생성 mutation
	const generateEmbedding = useMutation(
		trpc.photos.generateEmbedding.mutationOptions({
			onError: (error) => {
				console.error('Photo embedding generation failed:', error);
			},
		}),
	);

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

			// 임베딩 재생성 (fire-and-forget)
			generateEmbedding
				.mutateAsync({ photoId: String(variables.id) })
				.catch(() => {
					// 에러는 mutationOptions의 onError에서 처리됨
				});
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
