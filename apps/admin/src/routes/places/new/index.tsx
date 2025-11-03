import { NewPlace } from '@/fsd/features/places/ui/NewPlace';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/places/new/')({
	component: NewPlace,
});
