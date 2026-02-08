import { createFileRoute } from '@tanstack/react-router';
import ArticleFormPage from '@/fsd/views/articles/ui/ArticleFormPage';

export const Route = createFileRoute('/articles/edit/$articleId')({
	component: ArticleFormPage,
});
