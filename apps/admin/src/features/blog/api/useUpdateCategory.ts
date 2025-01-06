import { categoryKeys } from '@/fsd/shared';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';
import { useToast } from '@jung/design-system/components';
import type { CategoriesResponse, Category } from '@jung/shared/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCategory } from '../api/updateCategory';

const updateMainCategories = (
	previousCategories: CategoriesResponse,
	categoryId: string,
	updates: Partial<Category>,
) => {
	return updates.parent_id
		? previousCategories.mainCategories.filter((cat) => cat.id !== categoryId)
		: previousCategories.mainCategories.map((category) =>
				category.id === categoryId ? { ...category, ...updates } : category,
		  );
};

const updateSubCategories = (
	previousCategories: CategoriesResponse,
	categoryId: string,
	updates: Partial<Category>,
) => {
	return previousCategories.subCategories.map((category) =>
		category.id === categoryId ? { ...category, ...updates } : category,
	);
};

export const useUpdateCategory = () => {
	const queryClient = useQueryClient();
	const showToast = useToast();

	return useMutation({
		mutationFn: ({
			categoryId,
			updates,
		}: {
			categoryId: string;
			updates: Partial<Category>;
		}) => updateCategory(categoryId, updates),

		onMutate: async ({ categoryId, updates }) => {
			await queryClient.cancelQueries({
				queryKey: categoryKeys.all('blog'),
			});

			const previousCategories = queryClient.getQueryData<CategoriesResponse>(
				categoryKeys.all('blog'),
			);

			if (!previousCategories) return { previousCategories };

			const updatedCategories = {
				allCategories: previousCategories.allCategories.map((category) =>
					category.id === categoryId ? { ...category, ...updates } : category,
				),
				mainCategories: updateMainCategories(
					previousCategories,
					categoryId,
					updates,
				),
				subCategories: updateSubCategories(
					previousCategories,
					categoryId,
					updates,
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
					case 'VALIDATION_ERROR':
						showToast('Invalid input values', 'error');
						break;
					case 'UNKNOWN_ERROR':
						showToast('An unexpected error occurred', 'error');
						break;
					default:
						showToast(`Failed to update category: ${error.message}`, 'error');
				}
			} else {
				showToast('An error occurred while updating the category', 'error');
			}
		},

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: categoryKeys.all('blog'),
			});

			showToast('Category updated successfully', 'success');
		},
	});
};
