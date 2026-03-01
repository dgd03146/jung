import type { Place } from '@jung/shared/types';
import { PlaceCard, PlaceList } from '@/fsd/entities/place';
import { TogglePlaceLikeButton } from './TogglePlaceLikeButton';

interface PlaceListWithLikesProps {
	places: Place[];
	variant?: 'grid' | 'slideUp' | 'masonry';
	cardVariant?: 'default' | 'compact';
	priorityCount?: number;
	featured?: boolean;
}

export const PlaceListWithLikes = ({
	places,
	variant,
	cardVariant,
	priorityCount = 3,
	featured = false,
}: PlaceListWithLikesProps) => {
	return (
		<PlaceList
			places={places}
			variant={variant}
			featured={featured}
			renderPlace={(place, index) => (
				<PlaceCard
					key={place.id}
					place={place}
					variant={featured && index === 0 ? 'featured' : cardVariant}
					renderTopRight={() => <TogglePlaceLikeButton placeId={place.id} />}
					priority={index < priorityCount}
				/>
			)}
		/>
	);
};
