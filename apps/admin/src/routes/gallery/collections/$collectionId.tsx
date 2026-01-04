import { createFileRoute } from '@tanstack/react-router';
import { PhotoCollectionDetail } from '@/fsd/features/gallery/ui/PhotoCollectionDetail';

export const Route = createFileRoute('/gallery/collections/$collectionId')({
	component: PhotoCollectionDetail,
});
