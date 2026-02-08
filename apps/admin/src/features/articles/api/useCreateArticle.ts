import { useToast } from '@jung/design-system/components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { articleKeys } from '@/fsd/shared';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';
import type { ArticleInput } from '../types';
import { createArticle } from './createArticle';

export const useCreateArticle = () => {
	const queryClient = useQueryClient();
	const showToast = useToast();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: (article: ArticleInput) => createArticle(article),
		onSuccess: (newArticle) => {
			queryClient.invalidateQueries({ queryKey: articleKeys.lists() });
			queryClient.setQueryData(articleKeys.detail(newArticle.id), newArticle);
			showToast('Article created successfully!', 'success');
			navigate({ to: '/articles' });
		},
		onError: (error: unknown) => {
			if (error instanceof ApiError) {
				switch (error.code) {
					case 'NO_DATA':
						showToast(
							'Failed to create article: No data returned from server',
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
						showToast(`Failed to create article: ${error.message}`, 'error');
				}
			} else {
				showToast('An unknown error occurred. Please try again.', 'error');
			}
		},
	});
};
