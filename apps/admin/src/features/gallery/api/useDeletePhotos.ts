import { useToast } from '@jung/design-system/components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/fsd/shared';
import { photoQueryOptions } from './photoQueryOptions';

const deletePhotosByIds = async (ids: string[]) => {
	if (ids.length === 0) return [];
	const numericIds = ids.map(Number);
	if (numericIds.some((n) => !Number.isFinite(n))) {
		throw new Error('Invalid photo ID: all IDs must be numeric');
	}
	const { error } = await supabase.from('photos').delete().in('id', numericIds);

	if (error) throw error;
	return ids;
};

export const useDeletePhotos = () => {
	const queryClient = useQueryClient();
	const showToast = useToast();

	return useMutation({
		mutationFn: deletePhotosByIds,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: photoQueryOptions.lists(),
			});
			showToast('Photos deleted successfully!', 'success');
		},
		onError: () => {
			showToast('Failed to delete photos. Please try again.', 'error');
		},
	});
};
