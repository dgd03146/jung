import { useToast } from '@jung/design-system/components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { collectionKeys } from '@/fsd/shared';
import type { ApiError } from '@/fsd/shared/lib/errors/apiError';
import { deleteCollection } from '../services/deleteCollection';

export const useDeleteCollection = () => {
	const queryClient = useQueryClient();
	const showToast = useToast();

	return useMutation({
		mutationFn: (id: string) => deleteCollection(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: collectionKeys.all });
			showToast('Collection deleted successfully', 'success');
		},
		onError: (error: ApiError) => {
			showToast(error.message, 'error');
		},
	});
};
