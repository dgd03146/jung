import { createFileRoute } from '@tanstack/react-router';
import { GuestbookMessages } from '@/fsd/features/guestbook/ui';

export const Route = createFileRoute('/guestbook/')({
	component: GuestbookMessages,
});
