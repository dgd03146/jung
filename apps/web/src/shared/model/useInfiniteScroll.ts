'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

interface UseInfiniteScrollProps {
	hasNextPage?: boolean;
	fetchNextPage: () => void;
}
// TODO: Add isFetchingNextPage for checking if the next page is fetching

export const useInfiniteScroll = ({
	hasNextPage,
	fetchNextPage,
}: UseInfiniteScrollProps) => {
	const { ref, inView } = useInView();

	useEffect(() => {
		if (inView && hasNextPage) {
			fetchNextPage();
		}
	}, [inView, fetchNextPage, hasNextPage]);

	return { ref };
};
