import { createFileRoute } from '@tanstack/react-router';
import { GalleryPage } from '@/fsd/views/gallery';

export const Route = createFileRoute('/gallery/photos/')({
	component: () => <GalleryPage />,
});
