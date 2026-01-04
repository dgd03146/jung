import { createFileRoute } from '@tanstack/react-router';
import { PhotoCollection } from '@/fsd/features/gallery/ui/PhotoCollection';

export const Route = createFileRoute('/gallery/collections/')({
	component: PhotoCollection,
});
