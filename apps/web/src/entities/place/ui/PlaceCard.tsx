import { Box, Card, Flex, Typography } from '@jung/design-system/components';
import type { Place } from '@jung/shared/types';
import { IoLocationOutline } from 'react-icons/io5';
import { BlurImage } from '@/fsd/shared';
import { Link } from '@/i18n/routing';
import * as styles from './PlaceCard.css';

interface PlaceCardProps {
	place: Place;
	variant?: 'default' | 'compact';
	renderTopRight?: () => React.ReactNode;
	priority?: boolean;
}

export const PlaceCard = ({
	place,
	variant = 'default',
	priority = false,
	renderTopRight,
}: PlaceCardProps) => {
	return (
		<Box className={styles.cardWrapper({ variant })}>
			<Link
				href={`/places/${place.id}`}
				aria-label={`View details for ${place.title}`}
			>
				<Card
					boxShadow='primary'
					variant='outline'
					display='flex'
					flexDirection='column'
					height='full'
					className={styles.card({ variant })}
					borderRadius='lg'
				>
					<Card.Media className={styles.imageWrapper({ variant })}>
						<BlurImage
							src={place.photos[0]?.url ?? ''}
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
					</Card.Media>

					<Card.Content
						rowGap={variant === 'compact' ? '1' : '4'}
						padding={variant === 'compact' ? '2' : '4'}
						display='flex'
						flexDirection='column'
						height='full'
					>
						<Card.Title>
							<Typography.Heading level={5}>{place.title}</Typography.Heading>
						</Card.Title>

						{variant === 'default' && (
							<Card.Description>
								<Typography.Text level={3} truncate='two' fontWeight='normal'>
									{place.description}
								</Typography.Text>
							</Card.Description>
						)}

						<Flex align='center' gap='1.5' marginTop='auto'>
							<IoLocationOutline size={16} className={styles.locationIcon} />
							<Card.Description>
								<Typography.SubText
									level={3}
									truncate='two'
									fontWeight='normal'
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
