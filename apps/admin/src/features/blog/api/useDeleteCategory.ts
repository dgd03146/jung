import { categoryKeys } from '@/fsd/shared';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';
import { useToast } from '@jung/design-system/components';
import type { CategoriesResponse } from '@jung/shared/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCategory } from './deleteCategory';

export const useDeleteCategory = () => {
	const queryClient = useQueryClient();
	const showToast = useToast();

	return useMutation({
		mutationFn: (categoryId: string) => deleteCategory(categoryId),

		onMutate: async (categoryId) => {
			await queryClient.cancelQueries({
				queryKey: categoryKeys.all('blog'),
			});

			const previousCategories = queryClient.getQueryData<CategoriesResponse>(
				categoryKeys.all('blog'),
			);

			if (!previousCategories) return { previousCategories };

			const updatedCategories = {
				allCategories: previousCategories.allCategories.filter(
					(category) => category.id !== categoryId,
				),
				mainCategories: previousCategories.mainCategories.filter(
					(category) => category.id !== categoryId,
				),
				subCategories: previousCategories.subCategories.filter(
					(category) => category.id !== categoryId,
				),
			};

			queryClient.setQueryData<CategoriesResponse>(
				categoryKeys.all('blog'),
				updatedCategories,
			);

			return { previousCategories };
		},

		onError: (error, _, context) => {
			if (context?.previousCategories) {
				queryClient.setQueryData(
					categoryKeys.all('blog'),
					context.previousCategories,
				);
			}

			if (error instanceof ApiError) {
				switch (error.code) {
					case 'NOT_FOUND':
						showToast('Category not found', 'error');
						break;
					default:
						showToast(`Failed to delete category: ${error.message}`, 'error');
				}
			} else {
				showToast('An error occurred while deleting the category', 'error');
			}
		},

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: categoryKeys.all('blog'),
			});

			showToast('Category deleted successfully', 'success');
		},
	});
};
