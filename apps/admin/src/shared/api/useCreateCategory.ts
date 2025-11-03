import { categoryKeys } from '@/fsd/shared';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';
import { useToast } from '@jung/design-system/components';
import type {
	CategoriesResponse,
	CategoryCount,
	CategoryType,
} from '@jung/shared/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCategory } from '../services/createCategory';

export const useCreateCategory = (type: CategoryType) => {
	const queryClient = useQueryClient();
	const showToast = useToast();

	return useMutation({
		mutationFn: (category: Omit<CategoryCount, 'id'>) =>
			createCategory(category, type),

		onMutate: async (newCategory) => {
			await queryClient.cancelQueries({
				queryKey: categoryKeys.all(type),
			});

			const previousCategories = queryClient.getQueryData<CategoriesResponse>(
				categoryKeys.all(type),
			);

			if (previousCategories) {
				const newTempCategory: CategoryCount = {
					...newCategory,
					id: `temp-${Date.now()}`,
					count: 0,
					directCount: 0,
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
					categoryKeys.all(type),
					updatedCategories,
				);
			}

			return { previousCategories };
		},

		onError: (error: unknown, _, context) => {
			if (context?.previousCategories) {
				queryClient.setQueryData(
					categoryKeys.all(type),
					context.previousCategories,
				);
			}

			if (error instanceof ApiError) {
				switch (error.code) {
					case 'NO_DATA':
						showToast(
							`Failed to create ${type} category: No data returned`,
							'error',
						);
						break;
					case 'UNKNOWN_ERROR':
						showToast('An unexpected error occurred', 'error');
						break;
					default:
						showToast(
							`Failed to create ${type} category: ${error.message}`,
							'error',
						);
				}
			} else {
				showToast('An unknown error occurred', 'error');
			}
		},

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: categoryKeys.all(type),
			});

			showToast(
				`${type === 'blog' ? 'Blog' : 'Place'} category created successfully!`,
				'success',
			);
		},
	});
};
