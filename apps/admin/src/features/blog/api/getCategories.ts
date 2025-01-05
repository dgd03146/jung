import { supabase } from '@/fsd/shared';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';
import type { CategoriesResponse, CategoryWithCount } from '@jung/shared/types';

export const fetchBlogCategories = async (): Promise<CategoriesResponse> => {
	const { data: categories, error: categoriesError } = await supabase
		.from('categories')
		.select(`
			id,
			name,
			description,
			color,
			parent_id,
			type,
			created_at
		`)
		.eq('type', 'blog')
		.order('created_at');

	if (categoriesError) {
		throw ApiError.fromPostgrestError(categoriesError);
	}

	if (!categories) {
		throw new ApiError('No categories found', 'NOT_FOUND');
	}

	console.log('Raw categories:', categories);

	const { data: postCounts, error: postCountsError } = await supabase
		.from('posts')
		.select('category_id')
		.in(
			'category_id',
			categories.map((cat) => cat.id),
		);

	if (postCountsError) {
		throw ApiError.fromPostgrestError(postCountsError);
	}

	const postCountMap = (postCounts || []).reduce(
		(acc, post) => {
			acc[post.category_id] = (acc[post.category_id] || 0) + 1;
			return acc;
		},
		{} as Record<string, number>,
	);

	const subCategoryMap = categories.reduce(
		(acc, category) => {
			if (category.parent_id) {
				acc[category.parent_id] = (acc[category.parent_id] || 0) + 1;
			}
			return acc;
		},
		{} as Record<string, number>,
	);

	const processedCategories: CategoryWithCount[] = categories.map(
		(category) => {
			const directPostCount = postCountMap[category.id] || 0;
			const subCount = subCategoryMap[category.id] || 0;

			return {
				...category,
				description: category.description ?? '',
				color: category.color ?? '#0142C0',
				directPostCount,
				postCount: directPostCount,
				subCategoriesCount: subCount,
			};
		},
	);

	const result = {
		mainCategories: processedCategories.filter((cat) => !cat.parent_id),
		subCategories: processedCategories.filter((cat) => cat.parent_id),
		allCategories: processedCategories,
	};

	return result;
};
