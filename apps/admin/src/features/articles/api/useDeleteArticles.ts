import { useToast } from '@jung/design-system/components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/fsd/shared';
import { articleQueryOptions } from './articleQueryOptions';

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
			await queryClient.invalidateQueries({
				queryKey: articleQueryOptions.lists(),
			});
			showToast('Articles deleted successfully!', 'success');
		},
		onError: () => {
			showToast('Failed to delete articles. Please try again.', 'error');
		},
	});
};
