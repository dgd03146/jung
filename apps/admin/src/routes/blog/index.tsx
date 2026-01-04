import { createFileRoute } from '@tanstack/react-router';
import BlogPage from '@/fsd/views/blog/ui/BlogPage';

export const Route = createFileRoute('/blog/')({
	component: BlogPage,
});
