import { PhotoCollectionDetail } from '@/fsd/features/gallery/ui/PhotoCollectionDetail';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/gallery/collections/$collectionId')({
	component: PhotoCollectionDetail,
});
