import { BlurImage } from '@/fsd/shared';
import { Box, Button, Card, Flex, Typography } from '@jung/design-system';
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
					<Box className={styles.imageOverlay}>
						<Button
							className={styles.likeButton}
							type='button'
							onClick={handleLikeClick}
						>
							{isLiked ? <FaHeart size={16} /> : <FaRegHeart size={16} />}
						</Button>
					</Box>
				</Card.Media>

				<Card.Content
					rowGap={variant === 'compact' ? '1' : '3'}
					padding={variant === 'compact' ? '2' : '4'}
					display='flex'
					flexDirection='column'
					height='full'
				>
					<Card.Title>
						<Typography.Heading level={5}>{spot.title}</Typography.Heading>
					</Card.Title>

					{variant === 'default' && (
						<Card.Description>
							<Typography.Text level={3} truncate='two' fontWeight='normal'>
								{spot.description}
							</Typography.Text>
						</Card.Description>
					)}

					<Flex align='center' gap='1.5' marginTop='auto'>
						<IoLocationOutline size={16} className={styles.locationIcon} />
						<Card.Description>
							<Typography.SubText level={3} truncate='two' color='primary300'>
								{spot.address}
							</Typography.SubText>
						</Card.Description>
					</Flex>
				</Card.Content>
			</Card>
		</Link>
	);
}
