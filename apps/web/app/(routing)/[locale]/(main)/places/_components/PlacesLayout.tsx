'use client';

import { Suspense, useState } from 'react';
import { IoMapOutline } from 'react-icons/io5';
import {
	MarkerProvider,
	PlaceCategoryNavigation,
	PlaceCategoryNavigationSkeleton,
} from '@/fsd/features/place';
import { PlacesContent, PlacesContentSkeleton } from '@/fsd/views';
import * as styles from './PlacesLayout.css';

interface PlacesLayoutProps {
	currentCategory?: string;
}

export const PlacesLayout = ({ currentCategory }: PlacesLayoutProps) => {
	const [showMap, setShowMap] = useState(false);

	return (
		<MarkerProvider>
			<div className={styles.controlBar}>
				<Suspense fallback={<PlaceCategoryNavigationSkeleton />}>
					<PlaceCategoryNavigation currentCategory={currentCategory} />
				</Suspense>
				<button
					type='button'
					className={`${styles.mapToggleButton}${showMap ? ` ${styles.mapToggleButtonActive}` : ''}`}
					onClick={() => setShowMap((v) => !v)}
					aria-label={showMap ? 'Close map' : 'Open map'}
				>
					<IoMapOutline size={16} />
				</button>
			</div>
			<Suspense fallback={<PlacesContentSkeleton />}>
				<PlacesContent showMap={showMap} />
			</Suspense>
		</MarkerProvider>
	);
};
