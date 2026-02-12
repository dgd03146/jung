import { useToast } from '@jung/design-system/components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postKeys, supabase } from '@/fsd/shared';

const deletePostsByIds = async (ids: string[]) => {
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
			await queryClient.invalidateQueries({ queryKey: postKeys.lists() });
			showToast('Posts deleted successfully!', 'success');
		},
		onError: () => {
			showToast('Failed to delete posts. Please try again.', 'error');
		},
	});
};
