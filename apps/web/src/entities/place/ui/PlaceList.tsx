import { Box } from '@jung/design-system/components';
import type { Place } from '@jung/shared/types';
import { PlaceCard } from './PlaceCard';
import { PlaceEmptyState } from './PlaceEmptyState';
import * as styles from './PlaceList.css';

interface PlaceListProps {
	places: Place[];
	variant?: 'grid' | 'slideUp' | 'masonry';
	renderPlace?: (place: Place, index: number) => React.ReactNode;
}

export function PlaceList({
	places,
	variant = 'grid',
	renderPlace,
}: PlaceListProps) {
	if (places.length === 0) {
		return <PlaceEmptyState />;
	}

	return (
		<Box className={styles.placeList({ variant })}>
			{places.map((place, index) => (
				<Box
					key={place.id}
					className={variant === 'masonry' ? styles.masonryItem : undefined}
				>
					{renderPlace ? (
						renderPlace(place, index)
					) : (
						<PlaceCard place={place} priority={index === 0} />
					)}
				</Box>
			))}
		</Box>
	);
}
