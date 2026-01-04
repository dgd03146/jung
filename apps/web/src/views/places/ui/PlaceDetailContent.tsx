'use client';

import { PlaceDetailCard, PlacePhotoGrid, usePlaceQuery } from '@/fsd/entities';
import {
	SharePlaceButton,
	TogglePlaceViewButton,
	usePlaceView,
	ViewMap,
} from '@/fsd/features/place';

export const PlaceDetailContent = ({ placeId }: { placeId: string }) => {
	const { data: place } = usePlaceQuery(placeId);
	const { isListView } = usePlaceView();

	return (
		<PlaceDetailCard
			place={place}
			renderMedia={() =>
				isListView ? (
					<PlacePhotoGrid photos={place.photos} />
				) : (
					<ViewMap place={place} />
				)
			}
			renderActions={() => (
				<>
					<TogglePlaceViewButton />
					<SharePlaceButton place={place} />
				</>
			)}
		/>
	);
};
