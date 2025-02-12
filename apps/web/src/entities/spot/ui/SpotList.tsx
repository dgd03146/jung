import { Box } from '@jung/design-system/components';
import type { Spot } from '@jung/shared/types';
import { SpotCard } from './SpotCard';
import { SpotEmptyState } from './SpotEmptyState';
import * as styles from './SpotList.css';

interface SpotListProps {
	spots: Spot[];
	variant?: 'grid' | 'slideUp';
	renderSpot?: (spot: Spot) => React.ReactNode;
}

export function SpotList({
	spots,
	variant = 'grid',
	renderSpot,
}: SpotListProps) {
	if (spots.length === 0) {
		return <SpotEmptyState />;
	}

	return (
		<Box className={styles.spotList({ variant })}>
			{spots.map((spot) => (
				<Box key={spot.id}>
					{renderSpot ? renderSpot(spot) : <SpotCard spot={spot} />}
				</Box>
			))}
		</Box>
	);
}
