import { BlurImage } from '@/fsd/shared';
import { Card, Flex } from '@jung/design-system';
import Link from 'next/link';
import { IoLocationOutline } from 'react-icons/io5';
import * as styles from './SpotCard.css';

import type { Spot } from '@jung/shared/types';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useToggleSpotLike } from '../model';

interface SpotCardProps {
	spot: Spot;
	variant?: 'default' | 'compact';
}

export function SpotCard({ spot, variant = 'default' }: SpotCardProps) {
	const { toggleLike, getIsLiked } = useToggleSpotLike();

	const isLiked = getIsLiked(spot.id);

	const handleLikeClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		event.stopPropagation();
		toggleLike(spot.id);
	};

	return (
		<Link
			href={`/spots/${spot.id}`}
			className={styles.cardWrapper({ variant })}
		>
			<Card
				variant='outline'
				display='flex'
				flexDirection='column'
				height='full'
				position='relative'
			>
				<Card.Media className={styles.imageWrapper({ variant })}>
					<BlurImage
						src={spot.photos[0]?.url ?? ''}
						alt={spot.title}
						fill
						sizes={
							variant === 'compact'
								? '300px'
								: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
						}
					/>
					<div className={styles.imageOverlay}>
						<button
							className={styles.likeButton}
							type='button'
							onClick={handleLikeClick}
						>
							{isLiked ? <FaHeart size={16} /> : <FaRegHeart size={16} />}
						</button>
					</div>
				</Card.Media>

				<Card.Content rowGap={variant === 'compact' ? '1' : '2'}>
					<Card.Title className={styles.title({ variant })} level={3}>
						{spot.title}
					</Card.Title>

					<Flex
						align='flex-start'
						gap='1'
						className={styles.location({ variant })}
					>
						<IoLocationOutline size={16} className={styles.locationIcon} />
						<Card.Description className={styles.address({ variant })}>
							{spot.address}
						</Card.Description>
					</Flex>
					{variant === 'default' && (
						<Card.Description className={styles.description}>
							{spot.description}
						</Card.Description>
					)}
					<Card.Actions className={styles.footer}>
						{/* <StarRating value={spot.likes} size="sm" /> */}
					</Card.Actions>
				</Card.Content>
			</Card>
		</Link>
	);
}
