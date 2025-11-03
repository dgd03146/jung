import { supabase } from '@/fsd/shared';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';
import type {
	CategoriesResponse,
	CategoryCount,
	CategoryType,
} from '@jung/shared/types';

interface CountData {
	category_id: string;
}

const getItemCounts = async (type: CategoryType, categoryIds: string[]) => {
	const tableName = type === 'blog' ? 'posts' : 'places';

	const { data: counts, error: countsError } = await supabase
		.from(tableName)
		.select('category_id')
		.in('category_id', categoryIds);

	if (countsError) {
		throw ApiError.fromPostgrestError(countsError);
	}

	return counts as CountData[];
};

export const fetchCategories = async (
	type: CategoryType,
): Promise<CategoriesResponse> => {
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
		.eq('type', type)
		.order('created_at');

	if (categoriesError) {
		throw ApiError.fromPostgrestError(categoriesError);
	}

	if (!categories) {
		throw new ApiError('No categories found', 'NOT_FOUND');
	}

	const counts = await getItemCounts(
		type,
		categories.map((cat) => cat.id),
	);

	const countMap = counts.reduce(
		(acc, item) => {
			acc[item.category_id] = (acc[item.category_id] || 0) + 1;
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

	const processedCategories: CategoryCount[] = categories.map((category) => {
		const directCount = countMap[category.id] || 0;
		const subCount = subCategoryMap[category.id] || 0;

		return {
			...category,
			description: category.description ?? '',
			color: category.color ?? '#0142C0',
			count: directCount + subCount,
			directCount,
			subCategoriesCount: subCount,
		};
	});

	return {
		mainCategories: processedCategories.filter((cat) => !cat.parent_id),
		subCategories: processedCategories.filter((cat) => cat.parent_id),
		allCategories: processedCategories,
	};
};
