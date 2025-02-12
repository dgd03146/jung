import { GalleryPage } from '@/fsd/views/gallery';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/gallery/photos/')({
	component: () => <GalleryPage />,
});
