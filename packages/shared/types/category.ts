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

export interface CategoryCount extends Category {
	count: number;
	directCount: number;
	subCategoriesCount: number;
}

export interface CategoriesResponse {
	mainCategories: CategoryCount[];
	allCategories: CategoryCount[];
	subCategories: CategoryCount[];
}

export type CategoryType = 'blog' | 'spots';

export type CategoryPreview = {
	id: string;
	name: string;
	postCount: number;
};

export type CategoryTree = {
	id: string;
	name: string;
	subCategories: CategoryPreview[];
};

export type CategoryTreeList = CategoryTree[];

export type SpotCategory =
	| 'nature'
	| 'landmark'
	| 'historic'
	| 'culture'
	| 'night'
	| 'street'
	| 'park'
	| 'local'
	| 'restaurant'
	| 'museum'
	| 'shopping'
	| 'beach'
	| 'sports'
	| 'entertainment'
	| 'religious'
	| 'viewpoint'
	| 'hotel'
	| 'transport';
