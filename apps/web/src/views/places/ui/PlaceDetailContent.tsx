'use client';

import { useState } from 'react';
import { PlaceDetailCard, PlacePhotoGrid, usePlaceQuery } from '@/fsd/entities';
import {
	PlacePhotoModal,
	SharePlaceButton,
	TogglePlaceViewButton,
	usePlaceView,
	ViewMapDynamic,
} from '@/fsd/features/place';

export const PlaceDetailContent = ({ placeId }: { placeId: string }) => {
	const { data: place } = usePlaceQuery(placeId);
	const { isListView } = usePlaceView();
	const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(
		null,
	);

	return (
		<>
			<PlaceDetailCard
				place={place}
				renderMedia={() =>
					isListView ? (
						<PlacePhotoGrid
							photos={place.photos}
							onPhotoClick={setSelectedPhotoIndex}
						/>
					) : (
						<ViewMapDynamic place={place} />
					)
				}
				renderActions={() => (
					<>
						<TogglePlaceViewButton />
						<SharePlaceButton place={place} />
					</>
				)}
			/>
			{selectedPhotoIndex !== null && (
				<PlacePhotoModal
					photos={place.photos}
					currentIndex={selectedPhotoIndex}
					onClose={() => setSelectedPhotoIndex(null)}
					onNavigate={setSelectedPhotoIndex}
				/>
			)}
		</>
	);
};
