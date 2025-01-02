import { spotKeys } from '@/fsd/shared';
import type { ApiError } from '@/fsd/shared/lib/errors/apiError';
import { useToast } from '@jung/design-system/components';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// Mock delete function
const mockDeleteSpotById = async (id: string): Promise<void> => {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 500));

	// Simulate random error (10% chance)
	if (Math.random() < 0.1) {
		throw {
			code: 'NOT_FOUND',
			message: '해당 장소를 찾을 수 없습니다.',
		} as ApiError;
	}

	// Simulate permission error (5% chance)
	if (Math.random() < 0.05) {
		throw {
			code: 'PERMISSION_DENIED',
			message: '이 장소를 삭제할 권한이 없습니다.',
		} as ApiError;
	}

	console.log('Mock: Spot deleted', id);
	return;
};

export const useDeleteSpot = () => {
	const queryClient = useQueryClient();
	const showToast = useToast();

	return useMutation({
		mutationFn: (id: string) => mockDeleteSpotById(id),
		onSuccess: async (_, deletedId) => {
			await queryClient.invalidateQueries({ queryKey: spotKeys.lists() });
			queryClient.removeQueries({ queryKey: spotKeys.detail(deletedId) });

			showToast('장소가 성공적으로 삭제되었습니다.');
		},
		onError: (error: ApiError) => {
			switch (error.code) {
				case 'NOT_FOUND':
					showToast('장소 삭제 실패: 해당 장소를 찾을 수 없습니다.');
					break;
				case 'PERMISSION_DENIED':
					showToast('장소 삭제 실패: 권한이 없습니다.');
					break;
				case 'UNKNOWN_ERROR':
					showToast(
						'예기치 않은 오류가 발생했습니다. 나중에 다시 시도해주세요.',
					);
					break;
				default:
					showToast(`장소 삭제 실패: ${error.message}`);
			}
			console.error('Spot deletion error:', error);
		},
	});
};
