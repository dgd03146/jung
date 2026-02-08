import { useToast } from '@jung/design-system/components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { articleKeys } from '@/fsd/shared';
import type { ApiError } from '@/fsd/shared/lib/errors/apiError';
import type { Article } from '../types';
import { updateArticle } from './updateArticle';

export const useUpdateArticle = () => {
	const queryClient = useQueryClient();
	const showToast = useToast();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: ({ id, article }: { id: string; article: Partial<Article> }) =>
			updateArticle(id, article),
		onSuccess: async (updatedArticle) => {
			await queryClient.invalidateQueries({ queryKey: articleKeys.lists() });
			await queryClient.invalidateQueries({
				queryKey: articleKeys.detail(updatedArticle.id),
			});

			showToast('Article updated successfully!', 'success');

			navigate({ to: '/articles' });
		},
		onError: (error: ApiError) => {
			switch (error.code) {
				case 'NO_DATA':
					showToast(
						'Failed to update article: No data returned from server',
						'error',
					);
					break;
				case 'UNKNOWN_ERROR':
					showToast(
						'An unexpected error occurred. Please try again later.',
						'error',
					);
					break;
				default:
					showToast(`Failed to update article: ${error.message}`, 'error');
			}
			console.error('Article update error:', error);
		},
	});
};
