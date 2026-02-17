import { createFileRoute } from '@tanstack/react-router';

import PostFormPage from '@/fsd/views/blog/ui/PostFormPage';
export const Route = createFileRoute('/blog/edit/$postId')({
	component: PostFormPage,
});
