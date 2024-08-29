import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/spots/')({
	component: () => <div>Hello /spots/!</div>,
});
