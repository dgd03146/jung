export interface Category {
	id: string;
	name: string;
	type: string;
	description: string;
	parent_id: string | null;
	created_at: string;
	color: string;
}

export interface CategoryWithCount extends Category {
	postCount: number;
	directPostCount: number;
	subCategoriesCount: number;
}

export interface CategoriesResponse {
	mainCategories: CategoryWithCount[];
	allCategories: CategoryWithCount[];
	subCategories: CategoryWithCount[];
}
