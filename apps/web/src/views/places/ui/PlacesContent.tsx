'use client';

import { Flex } from '@jung/design-system/components';
import { useParams } from 'next/navigation';
import { PLACE_DEFAULTS, PlaceEmptyState } from '@/fsd/entities/place';
import {
	PlaceListWithLikes,
	usePlaceListQuery,
	ViewMapDynamic,
} from '@/fsd/features/place';
import { LoadingSpinner, useInfiniteScroll } from '@/fsd/shared';
import * as styles from './PlacesContent.css';

export const PlacesContent = () => {
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

	if (places.length === 0) {
		return <PlaceEmptyState />;
	}

	return (
		<div className={styles.splitContainer}>
			<div className={styles.listSection}>
				<PlaceListWithLikes places={places} />
				<Flex justify='center' align='center' minHeight='10' ref={ref}>
					{isFetchingNextPage && hasNextPage && <LoadingSpinner size='small' />}
				</Flex>
			</div>
			<div className={styles.mapSection}>
				<ViewMapDynamic places={places} />
			</div>
		</div>
	);
};
