import { Box } from '@jung/design-system/components';
import type { Place } from '@jung/shared/types';
import { Fragment } from 'react';
import { PlaceCard } from './PlaceCard';
import { PlaceEmptyState } from './PlaceEmptyState';
import * as styles from './PlaceList.css';

interface PlaceListProps {
	places: Place[];
	variant?: 'grid' | 'slideUp';
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
				<Fragment key={place.id}>
					{renderPlace ? (
						renderPlace(place, index)
					) : (
						<PlaceCard place={place} priority={index === 0} />
					)}
				</Fragment>
			))}
		</Box>
	);
}
