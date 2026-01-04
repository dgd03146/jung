import { useToast } from '@jung/design-system/components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { collectionKeys } from '@/fsd/shared';
import type { ApiError } from '@/fsd/shared/lib/errors/apiError';
import { createCollection } from '../services/createCollection';

interface CreateCollectionData {
	title: string;
	description: string;
	coverImageFile: File;
}

export const useCreateCollection = () => {
	const queryClient = useQueryClient();
	const showToast = useToast();

	return useMutation({
		mutationFn: (data: CreateCollectionData) => createCollection(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: collectionKeys.all });
			showToast('Collection created successfully', 'success');
		},
		onError: (error: ApiError) => {
			showToast(error.message, 'error');
		},
	});
};
