'use client';

import { SPOT_DEFAULTS, SpotList, useSpotsQuery } from '@/fsd/entities/spot';
import {
	SpotListWithLikes,
	ToggleSpotListButton,
	ViewMap,
	useSpotStore,
} from '@/fsd/features/spot';
import {
	LoadingSpinner,
	useInfiniteScroll,
	useSearchParamsState,
} from '@/fsd/shared';
import { Box, Flex, Stack } from '@jung/design-system/components';
import { useParams } from 'next/navigation';

export const SpotsContent = () => {
	const { isListView, isSlidListVisible } = useSpotStore();
	const params = useParams();
	const categoryName =
		typeof params.categoryName === 'string'
			? params.categoryName
			: SPOT_DEFAULTS.CAT;

	const { sort, q } = useSearchParamsState({
		defaults: {
			sort: SPOT_DEFAULTS.SORT,
			q: SPOT_DEFAULTS.QUERY,
		} as const,
	});

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useSpotsQuery({ cat: categoryName, sort, q });
	const spots = data.pages.flatMap((page) => page.items) ?? [];

	const { ref } = useInfiniteScroll({
		fetchNextPage,
		hasNextPage,
	});

	return (
		<Stack flex={1} marginY='4' width='full'>
			{isListView ? (
				<Box>
					<SpotListWithLikes spots={spots} />
					<Flex justify='center' align='center' minHeight='10' ref={ref}>
						{isFetchingNextPage && hasNextPage && (
							<LoadingSpinner size='small' />
						)}
					</Flex>
				</Box>
			) : (
				<Box width='full' height='full' position='relative' overflow='hidden'>
					<ViewMap spots={spots} />
					{spots.length > 0 && <ToggleSpotListButton />}
					{isSlidListVisible && <SpotList spots={spots} variant='slideUp' />}
				</Box>
			)}
		</Stack>
	);
};
