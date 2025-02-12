import { NewPhoto } from '@/fsd/features/gallery/ui/NewPhoto';
import { createFileRoute } from '@tanstack/react-router';

interface SearchParams {
	mode?: 'edit';
	photoId?: string;
}

export const Route = createFileRoute('/gallery/photos/$photoId/edit')({
	component: NewPhoto,
	validateSearch: (search: Record<string, unknown>): SearchParams => {
		return {
			mode: search.mode === 'edit' ? 'edit' : undefined,
			photoId: typeof search.photoId === 'string' ? search.photoId : undefined,
		};
	},
});
