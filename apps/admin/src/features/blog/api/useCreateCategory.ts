import { categoryKeys } from '@/fsd/shared';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';
import { useToast } from '@jung/design-system/components';
import type { CategoriesResponse, CategoryWithCount } from '@jung/shared/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCategory } from './createCategory';

export const useCreateCategory = () => {
	const queryClient = useQueryClient();
	const showToast = useToast();

	return useMutation({
		mutationFn: (category: Omit<CategoryWithCount, 'id'>) =>
			createCategory(category),

		onMutate: async (newCategory) => {
			await queryClient.cancelQueries({
				queryKey: categoryKeys.all('blog'),
			});

			const previousCategories = queryClient.getQueryData<CategoriesResponse>(
				categoryKeys.all('blog'),
			);

			if (previousCategories) {
				const newTempCategory: CategoryWithCount = {
					...newCategory,
					id: `temp-${Date.now()}`,
					postCount: 0,
					directPostCount: 0,
					subCategoriesCount: 0,
				};

				const updatedCategories = {
					allCategories: [...previousCategories.allCategories],
					mainCategories: [...previousCategories.mainCategories],
					subCategories: [...previousCategories.subCategories],
				};

				updatedCategories.allCategories.push(newTempCategory);

				if (newCategory.parent_id) {
					updatedCategories.subCategories.push(newTempCategory);
				} else {
					updatedCategories.mainCategories.push(newTempCategory);
				}

				queryClient.setQueryData<CategoriesResponse>(
					categoryKeys.all('blog'),
					updatedCategories,
				);
			}

			return { previousCategories };
		},

		onError: (error: unknown, _, context) => {
			if (context?.previousCategories) {
				queryClient.setQueryData(
					categoryKeys.all('blog'),
					context.previousCategories,
				);
			}

			if (error instanceof ApiError) {
				switch (error.code) {
					case 'NO_DATA':
						showToast('Failed to create category: No data returned', 'error');
						break;
					case 'UNKNOWN_ERROR':
						showToast('An unexpected error occurred', 'error');
						break;
					default:
						showToast(`Failed to create category: ${error.message}`, 'error');
				}
			} else {
				showToast('An unknown error occurred', 'error');
			}
		},

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: categoryKeys.all('blog'),
			});

			showToast('Category created successfully!', 'success');
		},
	});
};
