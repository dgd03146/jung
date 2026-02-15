import { createFileRoute } from '@tanstack/react-router';
import ArticlesPage from '@/fsd/views/articles/ui/ArticlesPage';

interface ArticleSearchParams {
	page?: number;
	pageSize?: number;
	sortField?: string;
	sortOrder?: 'asc' | 'desc';
	filter?: string;
	category?: string;
	status?: string;
}

export const Route = createFileRoute('/articles/')({
	component: ArticlesPage,
	validateSearch: (search: Record<string, unknown>): ArticleSearchParams => {
		return {
			page: typeof search.page === 'number' ? search.page : undefined,
			pageSize:
				typeof search.pageSize === 'number' ? search.pageSize : undefined,
			sortField:
				typeof search.sortField === 'string' ? search.sortField : undefined,
			sortOrder:
				search.sortOrder === 'asc' || search.sortOrder === 'desc'
					? search.sortOrder
					: undefined,
			filter: typeof search.filter === 'string' ? search.filter : undefined,
			category:
				typeof search.category === 'string' ? search.category : undefined,
			status: typeof search.status === 'string' ? search.status : undefined,
		};
	},
});
