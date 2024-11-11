'use client';

import { BlurImage } from '@/fsd/shared';
import { Box, Typography } from '@jung/design-system';
import type { Feed } from '@jung/shared/types';
import { useState } from 'react';
import { MasonryPhotoAlbum, type RenderImage } from 'react-photo-album';
import 'react-photo-album/masonry.css';
import * as styles from './FeedList.css';

interface CustomPhoto {
	src: string;
	width: number;
	height: number;
	alt: string;
	data: Omit<Feed, 'id' | 'imageUrl'>;
}

const MOCK_IMAGES: Feed[] = [
	{
		id: 1,
		imageUrl: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba',
		width: 2400,
		height: 3200,
		alt: 'Sunset in Seoul',
		description: '서울의 아름다운 일몰',
		tags: ['seoul', 'sunset', 'cityscape'],
		createdAt: new Date().toISOString(),
		likes: 342,
		views: 1205,
		author: { name: 'Kim Photographer' },
	},
	{
		id: 2,
		imageUrl: 'https://images.unsplash.com/photo-1682687221248-3116ba6ab483',
		width: 3000,
		height: 2000,
		alt: 'Busan Beach',
		description: '부산 해변의 평화로운 아침',
		tags: ['busan', 'beach', 'morning'],
		createdAt: new Date().toISOString(),
		likes: 275,
		views: 892,
		author: { name: 'Park Creator' },
	},
	{
		id: 3,
		imageUrl: 'https://images.unsplash.com/photo-1682687221006-b7fd60cf9dd0',
		width: 2800,
		height: 3600,
		alt: 'Jeju Island',
		description: '제주도의 푸른 바다',
		tags: ['jeju', 'ocean', 'nature'],
		createdAt: new Date().toISOString(),
		likes: 528,
		views: 1832,
		author: { name: 'Lee Visual' },
	},
	{
		id: 4,
		imageUrl: 'https://images.unsplash.com/photo-1682687220199-d0124f48f95b',
		width: 3200,
		height: 2400,
		alt: 'Gyeongju Temple',
		description: '경주의 고즈넉한 사찰',
		tags: ['gyeongju', 'temple', 'traditional'],
		createdAt: new Date().toISOString(),
		likes: 423,
		views: 1567,
		author: { name: 'Choi Lens' },
	},
	{
		id: 5,
		imageUrl: 'https://images.unsplash.com/photo-1601042879364-f3947d3f9c16',
		width: 2800,
		height: 3500,
		alt: 'Namsan Tower',
		description: '밤에 빛나는 남산타워',
		tags: ['seoul', 'night', 'tower'],
		createdAt: new Date().toISOString(),
		likes: 892,
		views: 2341,
		author: { name: 'Jung Capture' },
	},
	{
		id: 6,
		imageUrl: 'https://images.unsplash.com/photo-1601042879364-f3947d3f9c16',
		width: 3200,
		height: 2400,
		alt: 'Hongdae Street',
		description: '홍대의 활기찬 거리',
		tags: ['seoul', 'street', 'culture'],
		createdAt: new Date().toISOString(),
		likes: 756,
		views: 1892,
		author: { name: 'Shin Street' },
	},
	{
		id: 7,
		imageUrl: 'https://images.unsplash.com/photo-1584633155097-19e7753dba76',
		width: 2600,
		height: 3400,
		alt: 'Traditional Hanok',
		description: '전통 한옥의 아름다움',
		tags: ['hanok', 'traditional', 'architecture'],
		createdAt: new Date().toISOString(),
		likes: 645,
		views: 1523,
		author: { name: 'Han Culture' },
	},
	{
		id: 8,
		imageUrl: 'https://images.unsplash.com/photo-1601042879364-f3947d3f9c16',
		width: 3000,
		height: 2000,
		alt: 'Gwanghwamun Palace',
		description: '광화문의 웅장함',
		tags: ['palace', 'history', 'seoul'],
		createdAt: new Date().toISOString(),
		likes: 934,
		views: 2567,
		author: { name: 'Kim History' },
	},
	{
		id: 9,
		imageUrl: 'https://images.unsplash.com/photo-1584633155097-19e7753dba76',
		width: 2800,
		height: 3600,
		alt: 'Bukchon Village',
		description: '북촌 한옥마을의 고즈넉함',
		tags: ['hanok', 'village', 'traditional'],
		createdAt: new Date().toISOString(),
		likes: 823,
		views: 1934,
		author: { name: 'Lee Heritage' },
	},
	{
		id: 10,
		imageUrl: 'https://images.unsplash.com/photo-1601042879364-f3947d3f9c16',
		width: 3200,
		height: 2400,
		alt: 'Dongdaemun Design Plaza',
		description: 'DDP의 미래적인 건축',
		tags: ['architecture', 'modern', 'seoul'],
		createdAt: new Date().toISOString(),
		likes: 567,
		views: 1456,
		author: { name: 'Park Modern' },
	},
	{
		id: 11,
		imageUrl: 'https://images.unsplash.com/photo-1584633155097-19e7753dba76',
		width: 2600,
		height: 3400,
		alt: 'Gamcheon Culture Village',
		description: '감천문화마을의 색채',
		tags: ['busan', 'culture', 'village'],
		createdAt: new Date().toISOString(),
		likes: 745,
		views: 1823,
		author: { name: 'Choi Color' },
	},
	{
		id: 12,
		imageUrl: 'https://images.unsplash.com/photo-1601042879364-f3947d3f9c16',
		width: 3000,
		height: 2000,
		alt: 'Hallasan Mountain',
		description: '한라산의 장엄함',
		tags: ['jeju', 'mountain', 'nature'],
		createdAt: new Date().toISOString(),
		likes: 892,
		views: 2345,
		author: { name: 'Jeong Nature' },
	},
	{
		id: 13,
		imageUrl: 'https://images.unsplash.com/photo-1584633155097-19e7753dba76',
		width: 2800,
		height: 3600,
		alt: 'Seongsan Sunrise',
		description: '성산일출봉의 일출',
		tags: ['jeju', 'sunrise', 'landscape'],
		createdAt: new Date().toISOString(),
		likes: 934,
		views: 2567,
		author: { name: 'Kang Landscape' },
	},
	{
		id: 14,
		imageUrl: 'https://images.unsplash.com/photo-1601042879364-f3947d3f9c16',
		width: 3200,
		height: 2400,
		alt: 'Gwangalli Beach',
		description: '광안리 야경',
		tags: ['busan', 'night', 'beach'],
		createdAt: new Date().toISOString(),
		likes: 856,
		views: 2134,
		author: { name: 'Nam Night' },
	},
	{
		id: 15,
		imageUrl: 'https://images.unsplash.com/photo-1584633155097-19e7753dba76',
		width: 2600,
		height: 3400,
		alt: 'Bulguksa Temple',
		description: '불국사의 고요함',
		tags: ['gyeongju', 'temple', 'buddhism'],
		createdAt: new Date().toISOString(),
		likes: 723,
		views: 1845,
		author: { name: 'Oh Temple' },
	},
	{
		id: 16,
		imageUrl: 'https://images.unsplash.com/photo-1601042879364-f3947d3f9c16',
		width: 3000,
		height: 2000,
		alt: 'Jeonju Hanok Village',
		description: '전주 한옥마을의 전통',
		tags: ['jeonju', 'hanok', 'traditional'],
		createdAt: new Date().toISOString(),
		likes: 645,
		views: 1567,
		author: { name: 'Yoon Hanok' },
	},
	{
		id: 17,
		imageUrl: 'https://images.unsplash.com/photo-1584633155097-19e7753dba76',
		width: 2800,
		height: 3600,
		alt: 'Seoraksan Mountain',
		description: '설악산의 가을',
		tags: ['mountain', 'autumn', 'nature'],
		createdAt: new Date().toISOString(),
		likes: 867,
		views: 2234,
		author: { name: 'Moon Mountain' },
	},
	{
		id: 18,
		imageUrl: 'https://images.unsplash.com/photo-1601042879364-f3947d3f9c16',
		width: 3200,
		height: 2400,
		alt: 'Andong Hahoe Village',
		description: '안동 하회마을의 전통',
		tags: ['andong', 'village', 'heritage'],
		createdAt: new Date().toISOString(),
		likes: 534,
		views: 1456,
		author: { name: 'Song Heritage' },
	},
	{
		id: 19,
		imageUrl: 'https://images.unsplash.com/photo-1584633155097-19e7753dba76',
		width: 2600,
		height: 3400,
		alt: 'Changdeokgung Palace',
		description: '창덕궁 후원의 비밀',
		tags: ['palace', 'garden', 'seoul'],
		createdAt: new Date().toISOString(),
		likes: 756,
		views: 1923,
		author: { name: 'Hwang Palace' },
	},
	{
		id: 20,
		imageUrl: 'https://images.unsplash.com/photo-1601042879364-f3947d3f9c16',
		width: 3000,
		height: 2000,
		alt: 'Boseong Green Tea Field',
		description: '보성 녹차밭의 푸르름',
		tags: ['boseong', 'tea', 'landscape'],
		createdAt: new Date().toISOString(),
		likes: 845,
		views: 2145,
		author: { name: 'Baek Nature' },
	},
].map((image) => ({
	...image,
	width: Math.floor(Math.random() * 800) + 1600, // 1600-2400 사이 랜덤 너비
	height: Math.floor(Math.random() * 800) + 1600, // 1600-2400 사이 랜덤 높이
}));

const photos: CustomPhoto[] = MOCK_IMAGES.map((image) => ({
	src: image.imageUrl,
	width: image.width,
	height: image.height,
	alt: image.alt,
	data: {
		alt: image.alt,
		description: image.description,
		tags: image.tags,
		createdAt: image.createdAt,
		likes: image.likes,
		views: image.views,
		author: image.author,
	},
}));

const renderNextImage: RenderImage<CustomPhoto> = (props, context) => {
	const { photo, width, height } = context;

	return (
		<div
			style={{
				position: 'relative',
				width: '100%',
				paddingBottom: `${(height / width) * 100}%`,
			}}
		>
			<BlurImage
				src={photo.src}
				alt={photo.alt}
				fill
				style={{ objectFit: 'cover' }}
				sizes='(max-width: 768px) 50vw, (max-width: 1024px) 33.33vw, 25vw'
			/>
		</div>
	);
};

const FeedList = () => {
	const [selectedPhoto, setSelectedPhoto] = useState<CustomPhoto | null>(null);

	return (
		<Box className={styles.container}>
			<MasonryPhotoAlbum
				photos={photos}
				columns={(containerWidth) => {
					if (containerWidth < 768) return 2;
					if (containerWidth < 1024) return 3;
					return 4;
				}}
				render={{
					image: renderNextImage,
					wrapper: ({ children }, { photo, index }) => (
						<div
							className={styles.photoWrapper}
							onClick={() => setSelectedPhoto(photos[index] as CustomPhoto)}
						>
							{children}
							<div className={styles.overlay}>
								<Typography.SubText color='white' level={2}>
									{(photo as CustomPhoto).data.description}
								</Typography.SubText>
							</div>
						</div>
					),
				}}
			/>

			{/* FIXME: pararell route로 변경 */}
			{selectedPhoto && (
				<div className={styles.modal} onClick={() => setSelectedPhoto(null)}>
					<div
						className={styles.modalContent}
						onClick={(e) => e.stopPropagation()}
					>
						<BlurImage
							src={selectedPhoto.src}
							alt={selectedPhoto.alt}
							width={800}
							height={800}
							className={styles.modalImage}
						/>
						<div className={styles.modalInfo}>
							<Typography.Text level={2}>
								{selectedPhoto.data.description}
							</Typography.Text>
							<Typography.SubText level={4}>
								by {selectedPhoto.data.author.name}
							</Typography.SubText>
						</div>
					</div>
				</div>
			)}
		</Box>
	);
};

export default FeedList;
