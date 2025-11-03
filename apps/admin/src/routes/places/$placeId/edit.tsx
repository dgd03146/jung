import { NewPlace } from '@/fsd/features/places/ui/NewPlace';
import { createFileRoute } from '@tanstack/react-router';

interface SearchParams {
	mode?: 'edit';
	placeId?: string;
}

export const Route = createFileRoute('/places/$placeId/edit')({
	component: NewPlace,
	validateSearch: (search: Record<string, unknown>): SearchParams => {
		return {
			mode: search.mode === 'edit' ? 'edit' : undefined,
			placeId: typeof search.placeId === 'string' ? search.placeId : undefined,
		};
	},
});
