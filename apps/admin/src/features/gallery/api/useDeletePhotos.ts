import { useToast } from '@jung/design-system/components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { photoKeys, supabase } from '@/fsd/shared';

const deletePhotosByIds = async (ids: string[]) => {
	const { error } = await supabase
		.from('photos')
		.delete()
		.in('id', ids.map(Number));

	if (error) throw error;
	return ids;
};

export const useDeletePhotos = () => {
	const queryClient = useQueryClient();
	const showToast = useToast();

	return useMutation({
		mutationFn: deletePhotosByIds,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: photoKeys.lists() });
			showToast('Photos deleted successfully!', 'success');
		},
		onError: () => {
			showToast('Failed to delete photos. Please try again.', 'error');
		},
	});
};
