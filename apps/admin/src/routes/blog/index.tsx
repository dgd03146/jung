import BlogPage from '@/fsd/views/blog/ui/BlogPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/blog/')({
	component: BlogPage,
});
