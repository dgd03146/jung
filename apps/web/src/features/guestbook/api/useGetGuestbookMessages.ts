import { trpc } from '@/fsd/shared';

export function useGetGuestbookMessages() {
	return trpc.guestbook.getAllMessages.useSuspenseInfiniteQuery(
		{
			limit: 9,
		},
		{
			getNextPageParam: (lastPage) => {
				if (lastPage.nextCursor === null) {
					return undefined;
				}

				return lastPage.nextCursor;
			},
			staleTime: 1000 * 60 * 60 * 5, // 5시간
			gcTime: 1000 * 60 * 60 * 24, // 24시간
		},
	);
}
