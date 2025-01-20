'use client';

import { type Dispatch, type SetStateAction, useEffect } from 'react';

import { useInView } from 'react-intersection-observer';

import { LoadingSpinner } from '@/fsd/shared/ui';
import { EmptyState } from '@/fsd/shared/ui';
import { Box } from '@jung/design-system/components/Box/Box';
import { Container } from '@jung/design-system/components/Container/Container';
import { useSearchParams } from 'next/navigation';
import { useGetSpots } from '../api/useGetSpots';
import { SpotCard } from './SpotCard';
import * as styles from './SpotList.css';
import { SpotMap } from './SpotMap';

type SpotContentProps = {
	isMapView: boolean;
	isListVisible: boolean;
	setIsListVisible: Dispatch<SetStateAction<boolean>>;
};

type Sort = 'latest' | 'popular' | 'oldest';

export const SpotContent = ({
	isMapView,
	isListVisible,
	setIsListVisible,
}: SpotContentProps) => {
	const searchParams = useSearchParams();
	const cat = searchParams.get('cat') || 'all';
	const sort = (searchParams.get('sort') as Sort) || 'latest';
	const q = searchParams.get('q') || '';

	const [data, query] = useGetSpots({ cat, sort, q });
	const { fetchNextPage, hasNextPage, isFetchingNextPage } = query;

	const { ref, inView } = useInView();

	useEffect(() => {
		if (inView && hasNextPage) {
			fetchNextPage();
		}
	}, [inView, fetchNextPage, hasNextPage]);

	const spots = data.pages.flatMap((page) => page.items) ?? [];

	if (spots.length === 0) {
		return <EmptyState />;
	}

	return (
		<>
			<Box as='main' className={styles.main}>
				{isMapView ? (
					<Box className={styles.mapView}>
						<Box className={styles.mapSection}>
							<SpotMap
								spots={spots}
								onShowListClick={() => setIsListVisible(!isListVisible)}
								isListVisible={isListVisible}
							/>
						</Box>

						{isListVisible && (
							<Box className={styles.slideUpList}>
								{spots.map((spot) => (
									<SpotCard key={spot.id} spot={spot} />
								))}
							</Box>
						)}
					</Box>
				) : (
					<Container>
						<Box className={styles.gridView}>
							{spots.map((spot) => (
								<SpotCard key={spot.id} spot={spot} />
							))}
						</Box>

						{isFetchingNextPage && <LoadingSpinner size='small' />}
					</Container>
				)}
			</Box>

			<Box ref={ref} minHeight='10' />
		</>
	);
};
