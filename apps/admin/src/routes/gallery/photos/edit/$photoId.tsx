import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/gallery/photos/edit/$photoId')({
	component: () => <div>Hello /gallery/photos/edit/$photoId!</div>,
});
