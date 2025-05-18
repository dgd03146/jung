import { SpotCard, SpotList } from '@/fsd/entities/spot';
import type { Spot } from '@jung/shared/types';
import { ToggleSpotLikeButton } from './ToggleSpotLikeButton';

interface SpotListWithLikesProps {
	spots: Spot[];
	variant?: 'grid' | 'slideUp';
	cardVariant?: 'default' | 'compact';
	priorityCount?: number;
}

export const SpotListWithLikes = ({
	spots,
	variant,
	cardVariant,
	priorityCount = 3,
}: SpotListWithLikesProps) => {
	return (
		<SpotList
			spots={spots}
			variant={variant}
			renderSpot={(spot, index) => (
				<SpotCard
					key={spot.id}
					spot={spot}
					variant={cardVariant}
					renderTopRight={() => <ToggleSpotLikeButton spotId={spot.id} />}
					priority={index < priorityCount}
				/>
			)}
		/>
	);
};
