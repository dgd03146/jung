import { createFileRoute } from '@tanstack/react-router';
import { NewPlace } from '@/fsd/features/places/ui/NewPlace';

export const Route = createFileRoute('/places/new/')({
	component: NewPlace,
});
