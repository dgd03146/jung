export type ArticleCategory = 'frontend' | 'ai';

export interface Article {
	id: string;
	title: string;
	original_url: string;
	summary: string;
	my_thoughts: string | null;
	category: ArticleCategory;
	published_at: string | null;
	created_at: string;
	updated_at: string;
}

export type ArticleInput = Omit<Article, 'id' | 'created_at' | 'updated_at'>;

export interface ArticleFilters {
	page: number;
	pageSize: number;
	sortField?: string;
	sortOrder?: 'asc' | 'desc';
	filter?: string;
}
