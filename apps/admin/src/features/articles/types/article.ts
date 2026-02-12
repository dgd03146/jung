import type { Database } from '@jung/shared/types';

export type ArticleCategory = 'frontend' | 'ai';

export type Article = Database['public']['Tables']['articles']['Row'];

export type ArticleInput = Database['public']['Tables']['articles']['Insert'];

export interface ArticleFilters {
	page: number;
	pageSize: number;
	sortField?: string;
	sortOrder?: 'asc' | 'desc';
	filter?: string;
	status?: 'draft' | 'published';
	category?: string;
}
