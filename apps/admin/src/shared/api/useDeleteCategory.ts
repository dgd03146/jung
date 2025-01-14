import { categoryKeys } from '@/fsd/shared';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';
import { useToast } from '@jung/design-system/components';
import type { CategoriesResponse, CategoryType } from '@jung/shared/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCategory } from '../services/deleteCategory';

export const useDeleteCategory = (type: CategoryType) => {
	const queryClient = useQueryClient();
	const showToast = useToast();

	return useMutation({
		mutationFn: (categoryId: string) => deleteCategory(categoryId, type),

		onMutate: async (categoryId) => {
			await queryClient.cancelQueries({
				queryKey: categoryKeys.all(type),
			});

			const previousCategories = queryClient.getQueryData<CategoriesResponse>(
				categoryKeys.all(type),
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
				categoryKeys.all(type),
				updatedCategories,
			);

			return { previousCategories };
		},

		onError: (error, _, context) => {
			if (context?.previousCategories) {
				queryClient.setQueryData(
					categoryKeys.all(type),
					context.previousCategories,
				);
			}

			if (error instanceof ApiError) {
				switch (error.code) {
					case 'NOT_FOUND':
						showToast(
							`${type === 'blog' ? 'Blog' : 'Spot'} category not found`,
							'error',
						);
						break;
					default:
						showToast(
							`Failed to delete ${type} category: ${error.message}`,
							'error',
						);
				}
			} else {
				showToast(
					`An error occurred while deleting the ${type} category`,
					'error',
				);
			}
		},

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: categoryKeys.all(type),
			});

			showToast(
				`${type === 'blog' ? 'Blog' : 'Spot'} category deleted successfully`,
				'success',
			);
		},
	});
};
