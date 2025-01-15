import { categoryKeys } from '@/fsd/shared';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';
import { useToast } from '@jung/design-system/components';
import type { Category, CategoryType } from '@jung/shared/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCategory } from '../services/updateCategory';

export const useUpdateCategory = (type: CategoryType) => {
	const queryClient = useQueryClient();
	const showToast = useToast();

	return useMutation({
		mutationFn: ({
			categoryId,
			updates,
		}: {
			categoryId: string;
			updates: Partial<Category>;
		}) => updateCategory(categoryId, updates, type),

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: categoryKeys.all(type),
			});
			showToast(
				`${type === 'blog' ? 'Blog' : 'Spot'} category updated successfully`,
				'success',
			);
		},

		onError: (error: unknown) => {
			if (error instanceof ApiError) {
				showToast(
					`Failed to update ${type} category: ${error.message}`,
					'error',
				);
			} else {
				showToast(
					`An unexpected error occurred while updating the ${type} category`,
					'error',
				);
			}
		},
	});
};
