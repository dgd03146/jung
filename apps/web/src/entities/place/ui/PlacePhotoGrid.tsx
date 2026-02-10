import { Box } from '@jung/design-system/components';
import { getImageUrl } from '@jung/shared/lib';
import type { PlacePhoto } from '@jung/shared/types';
import { BlurImage } from '@/fsd/shared/ui';
import type { GridVariant } from './PlacePhotoGrid.css';
import * as styles from './PlacePhotoGrid.css';

interface PlacePhotoGridProps {
	photos: PlacePhoto[];
	onPhotoClick?: (index: number) => void;
}

const GRID_VARIANTS: Record<number, GridVariant> = {
	1: 'single',
	2: 'two',
	3: 'three',
	4: 'four',
} as const;

export function PlacePhotoGrid({ photos, onPhotoClick }: PlacePhotoGridProps) {
	const count = photos.length > 4 ? 4 : photos.length;
	const variant = GRID_VARIANTS[count];

	return (
		<Box
			className={`${styles.imageGrid} ${styles.gridVariants({
				count: variant,
			})}`}
		>
			{photos.slice(0, 4).map((photo, index) => (
				<Box
					key={index}
					className={`${styles.imageWrapper} ${
						index === 0 ? styles.mainImage : ''
					}`}
					onClick={() => onPhotoClick?.(index)}
				>
					<BlurImage
						src={getImageUrl(photo.url)}
						alt={`Photo ${index + 1}`}
						fill
						priority={index === 0}
						sizes={index === 0 ? '66vw' : '33vw'}
						className={styles.gridImage}
					/>
					{index === 3 && photos.length > 4 && (
						<Box className={styles.lastImageOverlay}>+{photos.length - 4}</Box>
					)}
				</Box>
			))}
		</Box>
	);
}
