import { useToast } from '@jung/design-system/components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { articleKeys, supabase } from '@/fsd/shared';

const deleteArticlesByIds = async (ids: string[]) => {
	const { error } = await supabase.from('articles').delete().in('id', ids);

	if (error) throw error;
	return ids;
};

export const useDeleteArticles = () => {
	const queryClient = useQueryClient();
	const showToast = useToast();

	return useMutation({
		mutationFn: deleteArticlesByIds,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: articleKeys.lists() });
			showToast('Articles deleted successfully!', 'success');
		},
		onError: () => {
			showToast('Failed to delete articles. Please try again.', 'error');
		},
	});
};
