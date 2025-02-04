'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

interface UseInfiniteScrollProps {
	hasNextPage?: boolean;
	fetchNextPage: () => void;
}

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
