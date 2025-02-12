import { spotKeys } from '@/fsd/shared';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';
import { useToast } from '@jung/design-system/components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { updateSpot } from '../services/updateSpot';
import type { UpdateSpotInput } from '../services/updateSpot';

export const useUpdateSpot = () => {
	const queryClient = useQueryClient();
	const showToast = useToast();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: (input: UpdateSpotInput) => updateSpot(input),

		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: spotKeys.detail(variables.id),
			});
			queryClient.invalidateQueries({
				queryKey: spotKeys.lists(),
			});
			showToast(`스팟 "${variables.title}"이(가) 수정되었습니다.`, 'success');
			navigate({ to: '/spots' });
		},

		onError: (error: unknown) => {
			console.error('Failed to update spot:', error);

			if (error instanceof ApiError) {
				switch (error.code) {
					case 'FOREIGN_KEY_VIOLATION':
						showToast('유효하지 않은 카테고리입니다.', 'error');
						break;
					case 'NO_DATA':
						showToast('스팟 정보 수정에 실패했습니다.', 'error');
						break;
					case 'VALIDATION_ERROR':
						showToast('입력값이 유효하지 않습니다.', 'error');
						break;
					case 'NOT_FOUND':
						showToast('스팟을 찾을 수 없습니다.', 'error');
						break;
					default:
						showToast(`수정 실패: ${error.message}`, 'error');
				}
			} else {
				showToast('알 수 없는 오류가 발생했습니다.', 'error');
			}
		},
	});
};
