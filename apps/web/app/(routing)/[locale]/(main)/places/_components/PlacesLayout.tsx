import { Suspense } from 'react';
import {
	MarkerProvider,
	PlaceCategoryNavigation,
	PlaceCategoryNavigationSkeleton,
} from '@/fsd/features/place';
import { PlacesContent, PlacesContentSkeleton } from '@/fsd/views';

interface PlacesLayoutProps {
	currentCategory?: string;
}

export const PlacesLayout = ({ currentCategory }: PlacesLayoutProps) => {
	return (
		<MarkerProvider>
			<Suspense fallback={<PlaceCategoryNavigationSkeleton length={6} />}>
				<PlaceCategoryNavigation currentCategory={currentCategory} />
			</Suspense>
			<Suspense fallback={<PlacesContentSkeleton count={6} />}>
				<PlacesContent />
			</Suspense>
		</MarkerProvider>
	);
};
