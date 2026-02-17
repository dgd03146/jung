import { useToast } from '@jung/design-system/components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/fsd/shared';
import { placeQueryOptions } from './placeQueryOptions';

const deletePlacesByIds = async (ids: string[]) => {
	const { error } = await supabase.from('places').delete().in('id', ids);

	if (error) throw error;
	return ids;
};

export const useDeletePlaces = () => {
	const queryClient = useQueryClient();
	const showToast = useToast();

	return useMutation({
		mutationFn: deletePlacesByIds,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: placeQueryOptions.lists(),
			});
			showToast('Places deleted successfully!', 'success');
		},
		onError: () => {
			showToast('Failed to delete places. Please try again.', 'error');
		},
	});
};
