import { useToast } from '@jung/design-system/components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/fsd/shared';
import { postQueryOptions } from './postQueryOptions';

const deletePostsByIds = async (ids: string[]) => {
	if (ids.length === 0) return [];
	const numericIds = ids.map(Number);
	if (numericIds.some((n) => !Number.isFinite(n))) {
		throw new Error('Invalid post ID: all IDs must be numeric');
	}
	const { error } = await supabase.from('posts').delete().in('id', numericIds);

	if (error) throw error;
	return ids;
};

export const useDeletePosts = () => {
	const queryClient = useQueryClient();
	const showToast = useToast();

	return useMutation({
		mutationFn: deletePostsByIds,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: postQueryOptions.lists(),
			});
			showToast('Posts deleted successfully!', 'success');
		},
		onError: () => {
			showToast('Failed to delete posts. Please try again.', 'error');
		},
	});
};
