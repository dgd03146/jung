import { z } from 'zod';

export const CategorySchema = z.object({
	id: z.string().uuid(),
	name: z.string(),
	type: z.string(),
	description: z.string(),
	parent_id: z.string().nullable(),
	created_at: z.string(),
	color: z.string(),
});

export type Category = z.infer<typeof CategorySchema>;

export interface CategoryWithCount extends Category {
	count: number;
	directCount: number;
	subCategoriesCount: number;
}

export interface CategoriesResponse {
	mainCategories: CategoryWithCount[];
	allCategories: CategoryWithCount[];
	subCategories: CategoryWithCount[];
}

export type CategoryType = 'blog' | 'spots';
