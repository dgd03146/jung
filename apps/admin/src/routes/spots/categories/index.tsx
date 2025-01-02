import { SpotCategoryManager } from '@/fsd/features/spots/ui/SpotCategoryManager';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/spots/categories/')({
	component: SpotCategoryManager,
});
