import { useToast } from '@jung/design-system/components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ApiError } from '@/fsd/shared/lib/errors/apiError';
import { deletePhotosFromCollection } from '../services/deletePhotosFromCollection';
import { photoQueryOptions } from './photoQueryOptions';

interface UseDeletePhotosFromCollectionParams {
	collectionId: string;
	onSuccess?: () => void;
}

export const useDeletePhotosFromCollection = ({
	collectionId,
}: UseDeletePhotosFromCollectionParams) => {
	const queryClient = useQueryClient();
	const showToast = useToast();

	return useMutation({
		mutationFn: ({
			photoIds,
			photoUrls,
		}: {
			photoIds: string[];
			photoUrls: string[];
		}) => deletePhotosFromCollection({ photoIds, photoUrls, collectionId }),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: photoQueryOptions.byCollection(collectionId, 1, 50).queryKey,
			});
			showToast('Selected photos deleted successfully', 'success');
		},
		onError: (error: ApiError) => {
			showToast(error.message, 'error');
		},
	});
};
