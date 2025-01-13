import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/spots/$spotId/edit')({
	component: () => <div>Hello /spots/$spotId/edit!</div>,
});
