import { BlurImage } from '@/fsd/shared';
import { Box, Card, Flex, Typography } from '@jung/design-system/components';
import type { Spot } from '@jung/shared/types';
import Link from 'next/link';
import { IoLocationOutline } from 'react-icons/io5';
import * as styles from './SpotCard.css';

interface SpotCardProps {
	spot: Spot;
	variant?: 'default' | 'compact';
	renderTopRight?: () => React.ReactNode;
}

export const SpotCard = ({
	spot,
	variant = 'default',
	renderTopRight,
}: SpotCardProps) => {
	return (
		<Link
			href={`/spots/${spot.id}`}
			className={styles.cardWrapper({ variant })}
		>
			<Card
				boxShadow='primary'
				variant='outline'
				display='flex'
				flexDirection='column'
				height='full'
				className={styles.card({ variant })}
				position='relative'
				borderRadius='xl'
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
					{renderTopRight && (
						<Box className={styles.imageOverlay}>{renderTopRight()}</Box>
					)}
				</Card.Media>

				<Card.Content
					rowGap={variant === 'compact' ? '1' : '4'}
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
							<Typography.SubText level={3} truncate='two' fontWeight='normal'>
								{spot.address}
							</Typography.SubText>
						</Card.Description>
					</Flex>
				</Card.Content>
			</Card>
		</Link>
	);
};
