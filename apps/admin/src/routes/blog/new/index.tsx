import PostFormPage from '@/fsd/views/blog/ui/PostFormPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/blog/new/')({
	component: PostFormPage,
});
