'use client';

import { LoadingSpinner } from '@/fsd/shared';
import { Box } from '@jung/design-system/components';
import { Suspense, useState } from 'react';
import { IoGridOutline, IoMapOutline } from 'react-icons/io5';
import { SearchBar } from '../../../shared/ui/SearchBar';
import { CategoryFilter } from './CategoryFilter';
import { SpotContent } from './SpotContent';
import * as styles from './SpotList.css';
import SpotListSkeleton from './SpotListSkeleton';

export function SpotList() {
	const [isMapView, setIsMapView] = useState(false);
	const [isListVisible, setIsListVisible] = useState(false);

	return (
		<>
			<Box as='header' className={styles.header}>
				<Box className={styles.headerContent}>
					<SearchBar />
					<Box
						as='button'
						className={styles.viewToggle}
						onClick={() => {
							setIsMapView(!isMapView);
							setIsListVisible(false);
						}}
					>
						{isMapView ? (
							<IoGridOutline size={20} />
						) : (
							<IoMapOutline size={20} />
						)}
					</Box>
				</Box>
			</Box>

			<CategoryFilter />

			<Suspense
				fallback={
					isMapView ? (
						<LoadingSpinner size='large' />
					) : (
						<SpotListSkeleton count={6} />
					)
				}
			>
				<SpotContent
					isListVisible={isListVisible}
					setIsListVisible={setIsListVisible}
					isMapView={isMapView}
				/>
			</Suspense>
		</>
	);
}
