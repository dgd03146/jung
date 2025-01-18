'use client';

import { BlurImage } from '@/fsd/shared/ui';
import { useState } from 'react';
import {
	IoImageOutline,
	IoLocationOutline,
	IoMapOutline,
	IoShareOutline,
} from 'react-icons/io5';
import * as styles from './SpotDetail.css';

import { formatDate } from '@/fsd/shared/lib';
import {
	Badge,
	Box,
	Button,
	Container,
	Flex,
	List,
	ListItem,
	Stack,
	Tag,
	Typography,
} from '@jung/design-system/components';
import { FaRegHeart } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import { useGetSpotById } from '../api';
import { useShareSpot } from '../model/useShareSpot';
import { useToggleSpotLike } from '../model/useToggleSpotLike';
import { SpotMap } from './SpotMap';

interface SpotDetailProps {
	spotId: string;
}

const getGridClassName = (totalPhotos: number) => {
	switch (totalPhotos) {
		case 1:
			return styles.singleImage;
		case 2:
			return styles.twoImages;
		case 3:
			return styles.threeImages;
		default:
			return styles.fourImages;
	}
};

export function SpotDetail({ spotId }: SpotDetailProps) {
	const { toggleLike, getIsLiked } = useToggleSpotLike();
	const { handleShare } = useShareSpot();

	const isLiked = getIsLiked(spotId);

	const [showMap, setShowMap] = useState(false);
	const results = useGetSpotById(spotId);
	const spot = results[0];

	return (
		<Container
			marginX='auto'
			boxShadow='primary'
			borderRadius='xl'
			marginY='10'
		>
			<Box className={styles.imageSection}>
				{showMap ? (
					<SpotMap spot={spot} initialCenter={spot.coordinates} />
				) : (
					<Box
						className={`${styles.imageGrid} ${getGridClassName(
							spot?.photos.length ?? 0,
						)}`}
					>
						{spot?.photos.slice(0, 4).map((photo, index) => (
							<Box
								key={photo.id}
								className={`${styles.imageWrapper} ${
									index === 0 ? styles.mainImage : ''
								}`}
							>
								<BlurImage
									src={photo.url}
									alt={`${spot?.title} ${index + 1}`}
									fill
									priority={index === 0}
									sizes={index === 0 ? '66vw' : '33vw'}
									className={styles.gridImage}
								/>
								{index === 3 && spot.photos.length > 4 && (
									<Box className={styles.lastImageOverlay}>
										+{spot.photos.length - 4}
									</Box>
								)}
							</Box>
						))}
					</Box>
				)}
			</Box>

			<Stack maxWidth='tablet' marginX='auto' padding='10' gap='5'>
				<Typography.Heading level={3}>{spot.title}</Typography.Heading>
				<Flex gap='1' alignItems='center'>
					<IoLocationOutline size={16} className={styles.locationIcon} />
					<Typography.SubText level={3} truncate='two' color='primary300'>
						{spot.address}
					</Typography.SubText>
				</Flex>

				<Flex
					justify='space-between'
					align='center'
					gap='4'
					borderBottomWidth='hairline'
					borderColor='primary50'
					borderStyle='solid'
					paddingY='4'
				>
					<Badge variant='secondary'>
						<Typography.SubText level={3} color='primary' fontWeight='medium'>
							{formatDate(spot.created_at)}
						</Typography.SubText>
					</Badge>

					<Flex gap='2'>
						<Button
							variant='outline'
							onClick={() => toggleLike(spotId)}
							borderRadius='md'
						>
							{isLiked ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
						</Button>

						<Button
							variant='outline'
							borderRadius='md'
							selected={showMap}
							onClick={() => setShowMap((prev) => !prev)}
							title={showMap ? '사진 보기' : '지도 보기'}
						>
							{showMap ? (
								<IoImageOutline size={18} />
							) : (
								<IoMapOutline size={18} />
							)}
						</Button>
						<Button
							variant='outline'
							borderRadius='md'
							onClick={() =>
								handleShare({
									title: spot.title,
									description: spot.description,
									imageUrl: spot.photos[0]?.url,
									link: {
										mobileWebUrl: window.location.href,
										webUrl: window.location.href,
									},
								})
							}
							aria-label='Share spot'
						>
							<IoShareOutline size={18} />
						</Button>
					</Flex>
				</Flex>

				<Stack space='10'>
					<Typography.Text level={2} marginY='10'>
						{spot.description}
					</Typography.Text>

					<Flex
						gap='2'
						wrap='wrap'
						borderBottomWidth='hairline'
						borderColor='primary50'
						borderStyle='solid'
						paddingBottom='5'
					>
						{spot.tags?.map((tag) => (
							<Tag key={tag} variant='secondary'>
								<Typography.FootNote level={1}># {tag}</Typography.FootNote>
							</Tag>
						))}
					</Flex>

					<Box marginTop='6'>
						<Typography.Heading level={5} color='primary' marginBottom='4'>
							Tips
						</Typography.Heading>
						<List
							items={spot.tips ?? []}
							display='flex'
							flexDirection='column'
							gap='3'
							renderItem={(tip) => (
								<ListItem
									className={styles.tipItem}
									key={tip}
									padding='4'
									borderRadius='lg'
								>
									<Typography.Text
										color='black100'
										level={4}
										fontWeight='medium'
									>
										{tip}
									</Typography.Text>
								</ListItem>
							)}
						/>
					</Box>
				</Stack>
			</Stack>
		</Container>
	);
}
