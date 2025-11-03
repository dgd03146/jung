import { PlaceListSkeleton } from '@/fsd/entities/place';
import {
	FilterPlaceCategory,
	FilterPlaceCategorySkeleton,
	MarkerProvider,
	PlaceViewProvider,
	TogglePlaceViewButton,
} from '@/fsd/features/place';
import { SearchBar, SearchBarSkeleton } from '@/fsd/shared';
import { PlacesContent } from '@/fsd/views';
import { Flex } from '@jung/design-system/components';
import type { ReactNode } from 'react';
import { Suspense } from 'react';

interface PlacesLayoutProps {
	currentCategory?: string;
	children?: ReactNode;
}

export const PlacesLayout = ({ currentCategory }: PlacesLayoutProps) => {
	return (
		<PlaceViewProvider>
			<MarkerProvider>
				<Flex gap='3' align='center'>
					<Suspense fallback={<SearchBarSkeleton />}>
						<SearchBar />
					</Suspense>
					<TogglePlaceViewButton />
				</Flex>
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
