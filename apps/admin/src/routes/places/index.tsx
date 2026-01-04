import { createFileRoute } from '@tanstack/react-router';
import { PlacePage } from '@/fsd/views/places/ui/PlacePage';

export const Route = createFileRoute('/places/')({
	component: PlacePage,
});
