'use client';

import {
	PLACE_DEFAULTS,
	PlaceList,
	usePlacesQuery,
} from '@/fsd/entities/place';
import {
	PlaceListWithLikes,
	TogglePlaceListButton,
	ViewMap,
	usePlaceView,
} from '@/fsd/features/place';
import {
	LoadingSpinner,
	useInfiniteScroll,
	useSearchParamsState,
} from '@/fsd/shared';
import { Box, Flex, Stack } from '@jung/design-system/components';
import { useParams } from 'next/navigation';

export const PlacesContent = () => {
	const { isListView, isSlidListVisible } = usePlaceView();
	const params = useParams();
	const categoryName =
		typeof params.categoryName === 'string'
			? params.categoryName
			: PLACE_DEFAULTS.CAT;

	const { sort, q } = useSearchParamsState({
		defaults: {
			sort: PLACE_DEFAULTS.SORT,
			q: PLACE_DEFAULTS.QUERY,
		} as const,
	});

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
		usePlacesQuery({ cat: categoryName, sort, q });
	const places = data.pages.flatMap((page) => page.items) ?? [];

	const { ref } = useInfiniteScroll({
		fetchNextPage,
		hasNextPage,
	});

	return (
		<Stack flex={1} marginY='4' width='full'>
			{isListView ? (
				<Box>
					<PlaceListWithLikes places={places} />
					<Flex justify='center' align='center' minHeight='10' ref={ref}>
						{isFetchingNextPage && hasNextPage && (
							<LoadingSpinner size='small' />
						)}
					</Flex>
				</Box>
			) : (
				<Box width='full' height='full' position='relative' overflow='hidden'>
					<ViewMap places={places} />
					{places.length > 0 && <TogglePlaceListButton />}
					{isSlidListVisible && <PlaceList places={places} variant='slideUp' />}
				</Box>
			)}
		</Stack>
	);
};
