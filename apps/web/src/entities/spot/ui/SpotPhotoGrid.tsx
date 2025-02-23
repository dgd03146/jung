import { BlurImage } from '@/fsd/shared/ui';
import { Box } from '@jung/design-system/components';
import type { SpotPhoto } from '@jung/shared/types';
import type { GridVariant } from './SpotPhotoGrid.css';
import * as styles from './SpotPhotoGrid.css';

interface SpotPhotoGridProps {
	photos: SpotPhoto[];
}

const GRID_VARIANTS: Record<number, GridVariant> = {
	1: 'single',
	2: 'two',
	3: 'three',
	4: 'four',
} as const;

export function SpotPhotoGrid({ photos }: SpotPhotoGridProps) {
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
				>
					<BlurImage
						src={photo.url}
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
