import { NewSpot } from '@/fsd/features/spots/ui/NewSpot';
import { createFileRoute } from '@tanstack/react-router';

interface SearchParams {
	mode?: 'edit';
	spotId?: string;
}

export const Route = createFileRoute('/spots/$spotId/edit')({
	component: NewSpot,
	validateSearch: (search: Record<string, unknown>): SearchParams => {
		return {
			mode: search.mode === 'edit' ? 'edit' : undefined,
			spotId: typeof search.spotId === 'string' ? search.spotId : undefined,
		};
	},
});
