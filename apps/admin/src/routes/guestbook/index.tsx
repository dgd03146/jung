import { GuestbookMessages } from '@/fsd/features/guestbook/ui';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/guestbook/')({
	component: GuestbookMessages,
});
