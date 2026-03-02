import { Box, Card, Flex, Typography } from '@jung/design-system/components';
import { getImageUrl } from '@jung/shared/lib';
import type { Place } from '@jung/shared/types';
import { IoLocationOutline } from 'react-icons/io5';
import { BlurImage } from '@/fsd/shared';
import { Link } from '@/i18n/routing';
import * as styles from './PlaceCard.css';

interface PlaceCardProps {
	place: Place;
	variant?: 'default' | 'compact' | 'featured';
	renderTopRight?: () => React.ReactNode;
	priority?: boolean;
}

export const PlaceCard = ({
	place,
	variant = 'default',
	priority = false,
	renderTopRight,
}: PlaceCardProps) => {
	if (variant === 'featured') {
		return (
			<Box className={styles.cardWrapper({ variant })}>
				<Link
					href={`/places/${place.id}`}
					aria-label={`View details for ${place.title}`}
				>
					<Card
						display='flex'
						flexDirection='row'
						height='full'
						className={styles.card({ variant })}
						rounded='none'
					>
						<Card.Media
							className={`${styles.imageWrapper({ variant })} ${styles.imageWrapperHoverable}`}
						>
							<BlurImage
								src={getImageUrl(place.photos[0]?.url ?? '')}
								alt={place.title}
								fill
								priority={priority}
								sizes='(max-width: 768px) 100vw, 40vw'
							/>
							{place.category && (
								<span className={styles.categoryBadge}>{place.category}</span>
							)}
							<div className={styles.hoverOverlay} />
						</Card.Media>

						<div className={styles.featuredContent}>
							{place.category && (
								<p className={styles.featuredCategory}>{place.category}</p>
							)}
							<p className={styles.featuredTitle}>{place.title}</p>
							{place.description && (
								<p className={styles.featuredDescription}>
									{place.description}
								</p>
							)}
							<div className={styles.featuredAddress}>
								<IoLocationOutline size={12} />
								<span>{place.address}</span>
							</div>
						</div>
					</Card>
				</Link>

				{renderTopRight && (
					<Box className={styles.imageOverlay}>{renderTopRight()}</Box>
				)}
			</Box>
		);
	}

	return (
		<Box className={styles.cardWrapper({ variant })}>
			<Link
				href={`/places/${place.id}`}
				aria-label={`View details for ${place.title}`}
			>
				<Card
					display='flex'
					flexDirection='column'
					height='full'
					className={styles.card({ variant })}
					rounded='none'
				>
					<Card.Media
						className={`${styles.imageWrapper({ variant })}${variant === 'default' ? ` ${styles.imageWrapperHoverable}` : ''}`}
					>
						<BlurImage
							src={getImageUrl(place.photos[0]?.url ?? '')}
							alt={place.title}
							fill
							priority={priority}
							sizes={
								variant === 'compact'
									? '300px'
									: [
											'(max-width: 500px) 100vw',
											'(max-width: 768px) 50vw',
											'(max-width: 1200px) 33vw',
											'25vw',
										].join(', ')
							}
						/>
						{place.category && (
							<span className={styles.categoryBadge}>{place.category}</span>
						)}
						{variant === 'default' && (
							<>
								<div className={styles.hoverOverlay} />
								<div className={styles.hoverContent}>
									<p className={styles.hoverTitle}>{place.title}</p>
									<p className={styles.hoverAddress}>{place.address}</p>
								</div>
							</>
						)}
					</Card.Media>

					<Card.Content
						rowGap='1'
						padding={variant === 'compact' ? '2' : '4'}
						display='flex'
						flexDirection='column'
						height='full'
					>
						<Card.Title>
							<Typography.Heading level={5} className={styles.cardTitle}>
								{place.title}
							</Typography.Heading>
						</Card.Title>

						{variant === 'default' && place.description && (
							<p className={styles.cardDescription}>{place.description}</p>
						)}

						<Flex align='center' gap='1.5' marginTop='auto'>
							<IoLocationOutline size={13} className={styles.locationIcon} />
							<Card.Description>
								<Typography.SubText
									level={3}
									truncate='single'
									fontWeight='normal'
									className={styles.cardAddress}
								>
									{place.address}
								</Typography.SubText>
							</Card.Description>
						</Flex>
					</Card.Content>
				</Card>
			</Link>

			{renderTopRight && (
				<Box className={styles.imageOverlay}>{renderTopRight()}</Box>
			)}
		</Box>
	);
};
