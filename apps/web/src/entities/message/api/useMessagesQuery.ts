import { useTRPC } from '@/fsd/app';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { MESSAGE_LIMIT } from '../config/guestbook';

export function useMessagesQuery() {
	const trpc = useTRPC();

	const infiniteOptions = trpc.guestbook.getAllMessages.infiniteQueryOptions(
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

	return useSuspenseInfiniteQuery(infiniteOptions);
}
