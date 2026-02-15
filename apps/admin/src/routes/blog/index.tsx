import { createFileRoute } from '@tanstack/react-router';
import BlogPage from '@/fsd/views/blog/ui/BlogPage';

interface BlogSearchParams {
	page?: number;
	pageSize?: number;
	sortField?: string;
	sortOrder?: 'asc' | 'desc';
	filter?: string;
	category?: string;
}

export const Route = createFileRoute('/blog/')({
	component: BlogPage,
	validateSearch: (search: Record<string, unknown>): BlogSearchParams => {
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
		};
	},
});
