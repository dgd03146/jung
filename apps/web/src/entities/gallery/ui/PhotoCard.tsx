import { Box, Typography } from '@jung/design-system/components';
import type { AlbumPhoto } from '@jung/shared/types';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import type { RenderImageContext, RenderImageProps } from 'react-photo-album';
import { BlurImage, MotionCard, ROUTES } from '@/fsd/shared';
import { Link } from '@/i18n/routing';
import { getPriorityImageCount } from '../lib';
import * as styles from './PhotoCard.css';

interface PhotoCardProps {
	imageProps: RenderImageProps;
	contextProps: RenderImageContext<AlbumPhoto>;
}

export const PhotoCard = ({ imageProps, contextProps }: PhotoCardProps) => {
	const { alt = '', sizes } = imageProps;
	const { photo, width, height, index } = contextProps;

	return (
		<Link href={ROUTES.PHOTO.pathById(photo.data.id)} scroll={false}>
			<MotionCard>
				<Box
					width='full'
					position='relative'
					style={assignInlineVars({
						[styles.aspectRatioVar]: `${width} / ${height}`,
					})}
					className={styles.imageContainer}
				>
					<BlurImage
						fill
						src={photo.src}
						alt={alt}
						sizes={sizes}
						className={styles.image}
						priority={index < getPriorityImageCount(width)}
					/>
					<Box
						position='absolute'
						className={styles.overlay}
						display='flex'
						padding='4'
					>
						<Typography.SubText
							level={3}
							color='white'
							className={styles.title}
						>
							{photo.data.description}
						</Typography.SubText>
					</Box>
				</Box>
			</MotionCard>
		</Link>
	);
};
