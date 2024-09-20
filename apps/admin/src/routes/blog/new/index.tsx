import PostCreatePage from '@/fsd/views/blog/ui/PostCreatePage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/blog/new/')({
	component: PostCreatePage,
});
