import { categoryKeys } from '@/fsd/shared';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';
import { useToast } from '@jung/design-system/components';
import type { Category } from '@jung/shared/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCategory } from './createCategory';

export const useCreateCategory = () => {
	const queryClient = useQueryClient();
	const showToast = useToast();

	return useMutation({
		mutationFn: (category: Omit<Category, 'id'>) => createCategory(category),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: categoryKeys.all('blog') });
			showToast('Category created successfully!', 'success');
		},
		onError: (error: unknown) => {
			if (error instanceof ApiError) {
				switch (error.code) {
					case 'NO_DATA':
						showToast(
							'Failed to create category: No data returned from server',
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
						showToast(`Failed to create category: ${error.message}`, 'error');
				}
			} else {
				showToast('An unknown error occurred. Please try again.', 'error');
			}
		},
	});
};
