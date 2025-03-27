'use client';

import { SpotDetailCard, SpotPhotoGrid, useSpotQuery } from '@/fsd/entities';
import {
	ShareSpotButton,
	ToggleSpotViewButton,
	ViewMap,
	useSpotStore,
} from '@/fsd/features/spot';

export const SpotDetailContent = ({ spotId }: { spotId: string }) => {
	const { data: spot } = useSpotQuery(spotId);
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
};
