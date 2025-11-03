import { PlaceCard, PlaceList } from '@/fsd/entities/place';
import type { Place } from '@jung/shared/types';
import { TogglePlaceLikeButton } from './TogglePlaceLikeButton';

interface PlaceListWithLikesProps {
	places: Place[];
	variant?: 'grid' | 'slideUp';
	cardVariant?: 'default' | 'compact';
	priorityCount?: number;
}

export const PlaceListWithLikes = ({
	places,
	variant,
	cardVariant,
	priorityCount = 3,
}: PlaceListWithLikesProps) => {
	return (
		<PlaceList
			places={places}
			variant={variant}
			renderPlace={(place, index) => (
				<PlaceCard
					key={place.id}
					place={place}
					variant={cardVariant}
					renderTopRight={() => <TogglePlaceLikeButton placeId={place.id} />}
					priority={index < priorityCount}
				/>
			)}
		/>
	);
};
