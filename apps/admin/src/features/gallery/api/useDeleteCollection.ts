import { useToast } from '@jung/design-system/components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ApiError } from '@/fsd/shared/lib/errors/apiError';
import { deleteCollection } from '../services/deleteCollection';
import { collectionQueryOptions } from './photoQueryOptions';

export const useDeleteCollection = () => {
	const queryClient = useQueryClient();
	const showToast = useToast();

	return useMutation({
		mutationFn: (id: string) => deleteCollection(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: collectionQueryOptions.all() });
			showToast('Collection deleted successfully', 'success');
		},
		onError: (error: ApiError) => {
			showToast(error.message, 'error');
		},
	});
};
