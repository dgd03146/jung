import { BlurImage } from '@/fsd/shared';
import { Card, Flex, Typography } from '@jung/design-system';
import Link from 'next/link';
import { IoHeartOutline, IoLocationOutline } from 'react-icons/io5';
import * as styles from './SpotCard.css';
import type { Spot } from './SpotList';
import { StarRating } from './StarRating';

interface SpotCardProps {
	spot: Spot;
}

export function SpotCard({ spot }: SpotCardProps) {
	return (
		<Link href={`/spots/${spot.id}`} className={styles.cardWrapper}>
			<Card variant='outline'>
				<Card.Media className={styles.imageWrapper}>
					<BlurImage
						src={spot.photos[0]?.url ?? ''}
						alt={spot.name}
						fill
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
					/>
					<div className={styles.imageOverlay}>
						<button className={styles.likeButton} type='button'>
							<IoHeartOutline size={16} />
						</button>
					</div>
				</Card.Media>

				<Card.Content rowGap='3'>
					<Card.Title className={styles.title} level={3}>
						{spot.name}
					</Card.Title>

					<Flex align='flex-start' gap='1' className={styles.location}>
						<IoLocationOutline size={16} className={styles.locationIcon} />
						<Card.Description className={styles.address}>
							{spot.address}
						</Card.Description>
					</Flex>

					<Card.Actions
						className={styles.footer}
						justifyContent='space-between'
					>
						<Flex align='center' gap='2'>
							<StarRating value={spot.rating} size='sm' />
							<Typography.SubText level={4} color='primary'>
								{spot.rating.toFixed(1)}
							</Typography.SubText>
						</Flex>
						<Typography.SubText level={4} color='gray400'>
							{spot.reviewCount.toLocaleString()} reviews
						</Typography.SubText>
					</Card.Actions>
				</Card.Content>
			</Card>
		</Link>
	);
}
