import { createFileRoute } from '@tanstack/react-router';
import { PlacePage } from '@/fsd/views/places/ui/PlacePage';

interface PlaceSearchParams {
	page?: number;
	pageSize?: number;
	sortField?: string;
	sortOrder?: 'asc' | 'desc';
	filter?: string;
	category?: string;
}

export const Route = createFileRoute('/places/')({
	component: PlacePage,
	validateSearch: (search: Record<string, unknown>): PlaceSearchParams => {
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
