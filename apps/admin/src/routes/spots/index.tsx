import { SpotPage } from '@/fsd/views/spots/ui/SpotPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/spots/')({
	component: SpotPage,
});
