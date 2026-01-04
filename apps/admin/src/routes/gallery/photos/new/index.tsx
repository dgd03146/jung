import { createFileRoute } from '@tanstack/react-router';
import { NewPhoto } from '@/fsd/features/gallery/ui/NewPhoto';

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
