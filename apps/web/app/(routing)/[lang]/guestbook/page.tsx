import { HydrateClient, trpc } from '@/fsd/shared/index.server';
import { GuestbookPage } from '@/fsd/views/guestbook/ui';

export default async function Page() {
	void trpc.guestbook.getAllMessages.prefetchInfinite({
		limit: 9,
	});

	return (
		<HydrateClient>
			<GuestbookPage />
		</HydrateClient>
	);
}
