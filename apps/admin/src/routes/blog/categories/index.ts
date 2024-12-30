import { CategoryManager } from '@/fsd/features/blog/ui/CategoryManager/CategoryManager';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/blog/categories/')({
	component: CategoryManager,
});
