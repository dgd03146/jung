import { createFileRoute } from '@tanstack/react-router';
import ArticlesPage from '@/fsd/views/articles/ui/ArticlesPage';

export const Route = createFileRoute('/articles/')({
	component: ArticlesPage,
});
