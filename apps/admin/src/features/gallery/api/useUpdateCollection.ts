import { collectionKeys } from '@/fsd/shared';
import type { ApiError } from '@/fsd/shared/lib/errors/apiError';
import { useToast } from '@jung/design-system/components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCollection } from '../services/updateCollection';

interface UpdateCollectionData {
	id: string;
	title: string;
	description: string;
	coverImageFile?: File;
}

export const useUpdateCollection = () => {
	const queryClient = useQueryClient();
	const showToast = useToast();

	return useMutation({
		mutationFn: (data: UpdateCollectionData) => updateCollection(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: collectionKeys.all });
			showToast('Collection updated successfully', 'success');
		},
		onError: (error: ApiError) => {
			showToast(error.message, 'error');
		},
	});
};
