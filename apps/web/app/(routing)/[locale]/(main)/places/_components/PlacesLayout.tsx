import { Suspense } from 'react';
import { PlaceListSkeleton } from '@/fsd/entities/place';
import {
	FilterPlaceCategory,
	FilterPlaceCategorySkeleton,
	MarkerProvider,
	PlaceViewProvider,
	TogglePlaceViewButton,
} from '@/fsd/features/place';
import { PlacesContent } from '@/fsd/views';

interface PlacesLayoutProps {
	currentCategory?: string;
}

export const PlacesLayout = ({ currentCategory }: PlacesLayoutProps) => {
	return (
		<PlaceViewProvider>
			<MarkerProvider>
				<TogglePlaceViewButton />
				<Suspense fallback={<FilterPlaceCategorySkeleton length={6} />}>
					<FilterPlaceCategory currentCategory={currentCategory} />
				</Suspense>
				<Suspense fallback={<PlaceListSkeleton count={6} />}>
					<PlacesContent />
				</Suspense>
			</MarkerProvider>
		</PlaceViewProvider>
	);
};
