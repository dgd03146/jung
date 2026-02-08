import { useToast } from '@jung/design-system/components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { articleKeys } from '@/fsd/shared';
import type { ApiError } from '@/fsd/shared/lib/errors/apiError';
import { deleteArticleById } from './deleteArticle';

export const useDeleteArticle = () => {
	const queryClient = useQueryClient();
	const showToast = useToast();

	return useMutation({
		mutationFn: (id: string) => deleteArticleById(id),
		onSuccess: async (_, deletedId) => {
			await queryClient.invalidateQueries({ queryKey: articleKeys.lists() });
			queryClient.removeQueries({ queryKey: articleKeys.detail(deletedId) });

			showToast('Article deleted successfully!', 'success');
		},
		onError: (error: ApiError) => {
			switch (error.code) {
				case 'NOT_FOUND':
					showToast('Failed to delete article: Article not found', 'error');
					break;
				case 'UNKNOWN_ERROR':
					showToast(
						'An unexpected error occurred. Please try again later.',
						'error',
					);
					break;
				default:
					showToast(`Failed to delete article: ${error.message}`, 'error');
			}
			console.error('Article deletion error:', error);
		},
	});
};
