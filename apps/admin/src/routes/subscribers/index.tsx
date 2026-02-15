import { createFileRoute } from '@tanstack/react-router';
import SubscribersPage from '@/fsd/views/subscribers/ui/SubscribersPage';

interface SubscriberSearchParams {
	page?: number;
	filter?: string;
	category?: string;
	isActive?: boolean;
}

export const Route = createFileRoute('/subscribers/')({
	component: SubscribersPage,
	validateSearch: (search: Record<string, unknown>): SubscriberSearchParams => {
		return {
			page: typeof search.page === 'number' ? search.page : undefined,
			filter: typeof search.filter === 'string' ? search.filter : undefined,
			category:
				typeof search.category === 'string' ? search.category : undefined,
			isActive:
				typeof search.isActive === 'boolean' ? search.isActive : undefined,
		};
	},
});
