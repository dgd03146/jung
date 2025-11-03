import { PlacePage } from '@/fsd/views/places/ui/PlacePage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/places/')({
	component: PlacePage,
});
