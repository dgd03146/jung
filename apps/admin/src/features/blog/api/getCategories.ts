import { supabase } from '@/fsd/shared';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';
import type { CategoriesResponse, CategoryWithCount } from '@jung/shared/types';

export const fetchBlogCategories = async (): Promise<CategoriesResponse> => {
	const { data: categories, error: categoriesError } = await supabase
		.from('categories')
		.select(`
			*,
			posts(count)
		`)
		.eq('type', 'blog')
		.order('created_at');

	if (categoriesError) {
		throw ApiError.fromPostgrestError(categoriesError);
	}

	if (!categories) {
		throw new ApiError('No categories found', 'NOT_FOUND');
	}

	const subCategoryMap = categories.reduce(
		(acc, category) => {
			if (category.parent_id) {
				if (!acc[category.parent_id]) {
					acc[category.parent_id] = {
						count: 0,
						totalPosts: 0,
					};
				}
				acc[category.parent_id].count += 1;
				acc[category.parent_id].totalPosts += (category.posts ?? []).length;
			}
			return acc;
		},
		{} as Record<string, { count: number; totalPosts: number }>,
	);

	const processedCategories: CategoryWithCount[] = categories.map(
		(category) => {
			const directPostCount = (category.posts ?? []).length;

			if (!category.parent_id) {
				const subCategoryInfo = subCategoryMap[category.id] || {
					count: 0,
					totalPosts: 0,
				};

				return {
					...category,
					description: category.description ?? '',
					color: category.color ?? '#0142C0',
					directPostCount,
					postCount: directPostCount + subCategoryInfo.totalPosts,
					subCategoriesCount: subCategoryInfo.count,
				};
			}

			return {
				...category,
				description: category.description ?? '',
				color: category.color ?? '#0142C0',
				directPostCount,
				postCount: directPostCount,
				subCategoriesCount: 0,
			};
		},
	);

	return {
		mainCategories: processedCategories.filter((cat) => !cat.parent_id),
		subCategories: processedCategories.filter((cat) => cat.parent_id),
		allCategories: processedCategories,
	};
};
