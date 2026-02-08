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

	// 임베딩 생성 mutation
	const generateEmbedding = useMutation(
		trpc.photos.generateEmbedding.mutationOptions({
			onError: (error) => {
				console.error('Photo embedding generation failed:', error);
				showToast('검색용 임베딩 생성에 실패했습니다.', 'warning');
			},
		}),
	);

	return useMutation({
		mutationFn: (input: CreatePhotoInput) => createPhoto(input),

		// FIXME: Image flickering issue
		// Current behavior: Old image briefly shows before being replaced by the new one
		// Potential fix: Implement optimistic updates or move invalidation after

		onSuccess: (newPhoto) => {
			queryClient.invalidateQueries({
				queryKey: photoKeys.lists(),
			});
			showToast('Photo uploaded successfully!', 'success');

			// 임베딩 생성 시작 후 네비게이션 (fire-and-forget)
			generateEmbedding
				.mutateAsync({ photoId: String(newPhoto.id) })
				.catch(() => {
					// 에러는 mutationOptions의 onError에서 처리됨
				});
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
