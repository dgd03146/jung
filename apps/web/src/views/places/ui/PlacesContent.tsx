'use client';

import { Box, Flex, Stack } from '@jung/design-system/components';
import { useParams } from 'next/navigation';
import { PLACE_DEFAULTS, PlaceList } from '@/fsd/entities/place';
import {
	PlaceListWithLikes,
	TogglePlaceListButton,
	usePlaceListQuery,
	usePlaceView,
	ViewMapDynamic,
} from '@/fsd/features/place';
import { LoadingSpinner, useInfiniteScroll } from '@/fsd/shared';

export const PlacesContent = () => {
	const { isListView, isSlidListVisible } = usePlaceView();
	const params = useParams();
	const categoryName =
		typeof params.categoryName === 'string'
			? params.categoryName
			: PLACE_DEFAULTS.CAT;

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
		usePlaceListQuery(categoryName);
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
					<ViewMapDynamic places={places} />
					{places.length > 0 && <TogglePlaceListButton />}
					{isSlidListVisible && <PlaceList places={places} variant='slideUp' />}
				</Box>
			)}
		</Stack>
	);
};
