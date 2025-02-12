import { PhotoCollection } from '@/fsd/features/gallery/ui/PhotoCollection';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/gallery/collections/')({
	component: PhotoCollection,
});
