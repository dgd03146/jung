'use client';

import { BlurImage } from '@/fsd/shared/ui';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
	IoImageOutline,
	IoLocationOutline,
	IoMapOutline,
	IoShareOutline,
} from 'react-icons/io5';
import * as styles from './SpotDetail.css';
import { MOCK_SPOTS } from './SpotList';
import { StarRating } from './StarRating';

export const MOCK_REVIEW = {
	spot: MOCK_SPOTS[0],
	visitDate: '2024.03.15',
	personalRating: 4.5,
	content:
		'서울의 상징적인 랜드마크인 남산서울타워를 방문했습니다. 도시의 멋진 전경을 감상할 수 있는 특별한 경험이었습니다. 해질 무렵의 황금빛 도시 풍경은 정말 잊을 수 없는 순간이었죠.',
	highlights: ['야경', '전망', '데이트 코스'],
	tips: ['평일 방문 추천', '날씨 맑은 날 방문하기', '석양 시간대 방문 추천'],
	coordinates: { lat: 37.5511, lng: 126.9882 },
};

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
	const router = useRouter();
	const [showMap, setShowMap] = useState(false);
	const {
		spot,
		visitDate,
		personalRating,
		content,
		highlights,
		tips,
		coordinates,
	} = MOCK_REVIEW;

	return (
		<div className={styles.container}>
			<div className={styles.imageSection}>
				{showMap ? (
					<div className={styles.mapContainer}>
						<div className={styles.mapPlaceholder}>
							<span className={styles.mapCoordinates}>
								Latitude: {coordinates.lat}
								<br />
								Longitude: {coordinates.lng}
							</span>
							<p className={styles.mapText}>지도 서비스 준비 중</p>
						</div>
					</div>
				) : (
					<div
						className={`${styles.imageGrid} ${getGridClassName(
							spot?.photos.length ?? 0,
						)}`}
					>
						{spot?.photos.slice(0, 4).map((photo, index) => (
							<div
								key={photo.id}
								className={`${styles.imageWrapper} ${
									index === 0 ? styles.mainImage : ''
								}`}
							>
								<BlurImage
									src={photo.url}
									alt={`${spot?.name} ${index + 1}`}
									fill
									priority={index === 0}
									sizes={index === 0 ? '66vw' : '33vw'}
									className={styles.gridImage}
								/>
								{index === 3 && spot.photos.length > 4 && (
									<div className={styles.lastImageOverlay}>
										+{spot.photos.length - 4}
									</div>
								)}
							</div>
						))}
					</div>
				)}
			</div>

			<div className={styles.content}>
				<div className={styles.contentHeader}>
					<div className={styles.titleRow}>
						<h1 className={styles.title}>{spot?.name}</h1>

						<div className={styles.headerButtons}>
							<button
								className={styles.iconButton}
								onClick={() => setShowMap((prev) => !prev)}
								title={showMap ? '사진 보기' : '지도 보기'}
							>
								{showMap ? (
									<IoImageOutline size={18} />
								) : (
									<IoMapOutline size={18} />
								)}
							</button>
							<button className={styles.iconButton}>
								<IoShareOutline size={18} />
							</button>
						</div>
					</div>
					<div className={styles.meta}>
						<div className={styles.ratingRow}>
							<StarRating value={personalRating} size='md' />
							<time className={styles.date}>{visitDate}</time>
						</div>
						<div className={styles.locationRow}>
							<IoLocationOutline size={16} className={styles.locationIcon} />
							<span className={styles.location}>{spot?.address}</span>
						</div>
					</div>
					<div className={styles.tags}>
						{highlights.map((tag) => (
							<span key={tag} className={styles.tag}>
								# {tag}
							</span>
						))}
					</div>
				</div>

				<div className={styles.body}>
					<p className={styles.description}>{content}</p>

					<div className={styles.tips}>
						<h2 className={styles.tipsTitle}>Tips</h2>
						<ul className={styles.tipsList}>
							{tips.map((tip) => (
								<li key={tip} className={styles.tipItem}>
									{tip}
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
