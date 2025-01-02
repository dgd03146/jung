import { NewPhoto } from '@/fsd/features/gallery/ui/NewPhoto';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/gallery/photos/new/')({
	component: NewPhoto,
});
