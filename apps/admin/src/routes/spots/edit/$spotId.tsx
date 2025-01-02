import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/spots/edit/$spotId')({
	component: () => <div>Hello /spots/edit/$spotId!</div>,
});
