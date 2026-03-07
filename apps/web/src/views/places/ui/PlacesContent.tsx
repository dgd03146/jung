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

interface PlacesContentProps {
	showMap: boolean;
}

export const PlacesContent = ({ showMap }: PlacesContentProps) => {
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
		isFetchingNextPage,
	});

	if (places.length === 0) {
		return <PlaceEmptyState />;
	}

	return (
		<div className={styles.container}>
			<div className={showMap ? styles.splitContainer : styles.fullContainer}>
				<div className={styles.listSection}>
					<PlaceListWithLikes
						places={places}
						variant='masonry'
						featured={places.length >= 2}
					/>
					<Flex justify='center' align='center' minHeight='10' ref={ref}>
						{isFetchingNextPage && hasNextPage && (
							<LoadingSpinner size='small' />
						)}
					</Flex>
				</div>
				{showMap && (
					<div className={styles.mapSection}>
						<ViewMapDynamic places={places} />
					</div>
				)}
			</div>
		</div>
	);
};
