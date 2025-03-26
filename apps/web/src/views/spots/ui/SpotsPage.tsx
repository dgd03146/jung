'use client';

import {
	SPOT_PARAMS,
	SpotList,
	SpotListSkeleton,
	useSpotsQuery,
} from '@/fsd/entities/spot';
import {
	FilterSpotCategory,
	FilterSpotCategorySkeleton,
	SpotListWithLikes,
	ToggleSpotListButton,
	ToggleSpotViewButton,
	ViewMap,
	useSpotStore,
} from '@/fsd/features/spot';
import {
	LoadingSpinner,
	SearchBar,
	SearchBarSkeleton,
	useInfiniteScroll,
	useSearchParamsState,
} from '@/fsd/shared';
import { Box, Flex, Stack } from '@jung/design-system/components';
import { Suspense } from 'react';

function SpotsContent() {
	const { isListView, isSlidListVisible } = useSpotStore();
	const { cat, sort, q } = useSearchParamsState({
		defaults: {
			cat: SPOT_PARAMS.CAT,
			sort: SPOT_PARAMS.SORT,
			q: SPOT_PARAMS.QUERY,
		} as const,
	});

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useSpotsQuery({ cat, sort, q });
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
}

export const SpotsPage = () => {
	return (
		<>
			<Flex gap='3' align='center'>
				<Suspense fallback={<SearchBarSkeleton />}>
					<SearchBar />
				</Suspense>
				<ToggleSpotViewButton />
			</Flex>
			<Suspense fallback={<FilterSpotCategorySkeleton length={6} />}>
				<FilterSpotCategory />
			</Suspense>
			<Suspense fallback={<SpotListSkeleton count={12} />}>
				<SpotsContent />
			</Suspense>
		</>
	);
};
