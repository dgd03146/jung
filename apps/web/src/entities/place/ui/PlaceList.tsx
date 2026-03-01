import { Box } from '@jung/design-system/components';
import type { Place } from '@jung/shared/types';
import { PlaceCard } from './PlaceCard';
import { PlaceEmptyState } from './PlaceEmptyState';
import * as styles from './PlaceList.css';

interface PlaceListProps {
	places: Place[];
	variant?: 'grid' | 'slideUp' | 'masonry';
	featured?: boolean;
	renderPlace?: (place: Place, index: number) => React.ReactNode;
}

export function PlaceList({
	places,
	variant = 'grid',
	featured = false,
	renderPlace,
}: PlaceListProps) {
	if (places.length === 0) {
		return <PlaceEmptyState />;
	}

	const getItemClassName = (index: number) => {
		if (variant !== 'masonry') return undefined;
		return featured && index === 0 ? styles.featuredItem : styles.masonryItem;
	};

	return (
		<Box className={styles.placeList({ variant })}>
			{places.map((place, index) => (
				<Box key={place.id} className={getItemClassName(index)}>
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
