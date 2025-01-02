import { NewSpot } from '@/fsd/features/spots/ui/NewSpot';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/spots/new/')({
	component: NewSpot,
});
