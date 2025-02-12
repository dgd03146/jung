import { NewPhoto } from '@/fsd/features/gallery/ui/NewPhoto';
import { createFileRoute } from '@tanstack/react-router';

interface SearchParams {
	mode?: 'edit';
	id?: string;
}

export const Route = createFileRoute('/gallery/photos/new/')({
	component: NewPhoto,
	validateSearch: (search: Record<string, unknown>): SearchParams => {
		return {
			mode: search.mode === 'edit' ? 'edit' : undefined,
			id: typeof search.id === 'string' ? search.id : undefined,
		};
	},
});
