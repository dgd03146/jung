import type { Category, CategoryTree, CategoryType } from '@jung/shared/types';
import { supabase } from '../lib/supabase';

export const categoryService = {
	async getCategories(type: CategoryType): Promise<CategoryTree[]> {
		// 'places' 타입으로 요청이 오면 'spots'도 함께 조회 (DB 마이그레이션 전 호환성)
		const queryType = type === 'places' ? 'spots' : type;

		const { data: categories, error } = await supabase
			.from('categories')
			.select('id, name, parent_id')
			.eq('type', queryType)
			.order('created_at')
			.returns<Category[]>();

		if (error) throw new Error(error.message);

		if (!categories?.length) {
			// 빈 배열 반환 (에러 대신)
			return [];
		}

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
	},
};
