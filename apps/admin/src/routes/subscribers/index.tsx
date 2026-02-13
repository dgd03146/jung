import { createFileRoute } from '@tanstack/react-router';
import SubscribersPage from '@/fsd/views/subscribers/ui/SubscribersPage';

export const Route = createFileRoute('/subscribers/')({
	component: SubscribersPage,
});
