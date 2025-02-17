import { trpc } from '@/fsd/shared';
import { MESSAGE_LIMIT } from '../config/guestbook';

export function useMessagesQuery() {
	return trpc.guestbook.getAllMessages.useSuspenseInfiniteQuery(
		{
			limit: MESSAGE_LIMIT,
		},
		{
			getNextPageParam: (lastPage) => {
				if (lastPage.nextCursor === null) {
					return undefined;
				}

				return lastPage.nextCursor;
			},
			staleTime: 1000 * 60 * 15, // 15분
			gcTime: 1000 * 60 * 60 * 24, // 24시간
		},
	);
}
