import { createClientForServer } from '@/fsd/shared/index.server';
import type { CategoryType, GetCategoryItem } from '@jung/shared/types';

export const getCategories = async (
	type: CategoryType,
): Promise<GetCategoryItem[]> => {
	const supabase = createClientForServer();

	const { data: categories, error } = await supabase
		.from('categories')
		.select('id, name, parent_id')
		.eq('type', type)
		.order('created_at');

	if (error) throw new Error(error.message);

	if (!categories?.length) throw new Error('No categories found');

	const tableName = type === 'blog' ? 'posts' : 'spots';
	const { data: postCounts, error: countError } = await supabase
		.from(tableName)
		.select('category_id, id')
		.in(
			'category_id',
			categories.map((cat) => cat.id),
		);

	if (countError) throw new Error(countError.message);

	const countMap: Record<string, number> = {};
	for (const post of postCounts || []) {
		countMap[post.category_id] = (countMap[post.category_id] || 0) + 1;
	}

	const mainCategories = categories.filter((cat) => cat.parent_id === null);
	const subCategories = categories.filter((cat) => cat.parent_id !== null);

	return mainCategories.map((mainCat) => ({
		id: mainCat.id,
		name: mainCat.name,
		subCategories: subCategories
			.filter((subCat) => subCat.parent_id === mainCat.id)
			.map((subCat) => ({
				id: subCat.id,
				name: subCat.name,
				postCount: countMap[subCat.id] || 0,
			})),
	}));
};
