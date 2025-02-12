import { spotKeys } from '@/fsd/shared';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';
import { useToast } from '@jung/design-system/components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteSpot } from '../services/deleteSpot';

export const useDeleteSpot = () => {
	const queryClient = useQueryClient();
	const showToast = useToast();

	return useMutation({
		mutationFn: deleteSpot,

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: spotKeys.lists(),
			});
			showToast('스팟이 성공적으로 삭제되었습니다.', 'success');
		},

		onError: (error: unknown) => {
			console.error('Failed to delete spot:', error);

			if (error instanceof ApiError) {
				switch (error.code) {
					case 'NOT_FOUND':
						showToast('스팟을 찾을 수 없습니다.', 'error');
						break;
					case 'FOREIGN_KEY_VIOLATION':
						showToast(
							'이 스팟과 연관된 데이터가 있어 삭제할 수 없습니다.',
							'error',
						);
						break;
					default:
						showToast(`삭제 실패: ${error.message}`, 'error');
				}
			} else {
				showToast('알 수 없는 오류가 발생했습니다.', 'error');
			}
		},
	});
};
