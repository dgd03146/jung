import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/community/')({
	component: () => <div>Hello /community/!</div>,
});
