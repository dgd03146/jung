import { Suspense } from 'react';
import {
	MarkerProvider,
	PlaceCategoryNavigation,
	PlaceCategoryNavigationSkeleton,
} from '@/fsd/features/place';
import { PlacesContent, PlacesContentSkeleton } from '@/fsd/views';

const PLACES_SKELETON_COUNT = 6;

interface PlacesLayoutProps {
	currentCategory?: string;
}

export const PlacesLayout = ({ currentCategory }: PlacesLayoutProps) => {
	return (
		<MarkerProvider>
			<Suspense
				fallback={
					<PlaceCategoryNavigationSkeleton length={PLACES_SKELETON_COUNT} />
				}
			>
				<PlaceCategoryNavigation currentCategory={currentCategory} />
			</Suspense>
			<Suspense
				fallback={<PlacesContentSkeleton count={PLACES_SKELETON_COUNT} />}
			>
				<PlacesContent />
			</Suspense>
		</MarkerProvider>
	);
};
