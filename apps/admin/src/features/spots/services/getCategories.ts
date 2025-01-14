import { supabase } from '@/fsd/shared';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';
import type { CategoriesResponse, CategoryWithCount } from '@jung/shared/types';

export const fetchSpotCategories = async (): Promise<CategoriesResponse> => {
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
		.eq('type', 'spots')
		.order('created_at');

	if (categoriesError) {
		throw ApiError.fromPostgrestError(categoriesError);
	}

	if (!categories) {
		throw new ApiError('No categories found', 'NOT_FOUND');
	}

	const { data: spotCounts, error: spotCountsError } = await supabase
		.from('spots')
		.select('category_id')
		.in(
			'category_id',
			categories.map((cat) => cat.id),
		);

	if (spotCountsError) {
		throw ApiError.fromPostgrestError(spotCountsError);
	}

	const spotCountMap = (spotCounts || []).reduce(
		(acc, spot) => {
			acc[spot.category_id] = (acc[spot.category_id] || 0) + 1;
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
			const directSpotCount = spotCountMap[category.id] || 0;
			const subCount = subCategoryMap[category.id] || 0;

			return {
				...category,
				description: category.description ?? '',
				color: category.color ?? '#0142C0',
				directPostCount: directSpotCount,
				postCount: directSpotCount,
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
