'use client';

import {
	SpotDetailCard,
	SpotDetailSkeleton,
	SpotPhotoGrid,
	useSpotQuery,
} from '@/fsd/entities';
import {
	ShareSpotButton,
	ToggleSpotViewButton,
	ViewMap,
	useSpotStore,
} from '@/fsd/features/spot';
import { Suspense } from 'react';

export const SpotDetailPage = ({ spotId }: { spotId: string }) => {
	return (
		<Suspense fallback={<SpotDetailSkeleton />}>
			<SpotDetailContent spotId={spotId} />
		</Suspense>
	);
};

function SpotDetailContent({ spotId }: { spotId: string }) {
	const [spot] = useSpotQuery(spotId);
	const { isListView } = useSpotStore();

	return (
		<SpotDetailCard
			spot={spot}
			renderMedia={() =>
				isListView ? (
					<SpotPhotoGrid photos={spot.photos} />
				) : (
					<ViewMap spot={spot} />
				)
			}
			renderActions={() => (
				<>
					<ToggleSpotViewButton />
					<ShareSpotButton spot={spot} />
				</>
			)}
		/>
	);
}
