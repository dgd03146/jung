import type { Photo } from '@jung/shared/types';
import { useNavigate, useParams } from '@tanstack/react-router';
import { useState } from 'react';
import { HiCheck, HiPlus, HiTrash } from 'react-icons/hi';

import { MOCK_COLLECTIONS } from './PhotoCollection.tsx';
import * as styles from './PhotoCollectionDetail.css.ts';

const MOCK_COLLECTION_PHOTOS: Record<string, Photo[]> = {
	'1': [
		{
			id: '1',
			title: 'Spring_Main_01',
			image_url: 'https://picsum.photos/800/600?random=101',
			alt: '봄 화보 메인컷 1',
			description: '2024 봄 시즌 메인 화보 1',
			width: 800,
			height: 600,
			created_at: '2024-03-15T09:00:00Z',
			likes: 0,
			views: 0,
			tags: ['봄', '화보', '메인컷'],
		},
		{
			id: '2',
			title: 'Spring_Main_02',
			image_url: 'https://picsum.photos/800/600?random=102',
			alt: '봄 화보 메인컷 2',
			description: '2024 봄 시즌 메인 화보 2',
			width: 800,
			height: 600,
			created_at: '2024-03-15T09:01:00Z',
			likes: 0,
			views: 0,
			tags: ['봄', '화보', '메인컷'],
		},
		{
			id: '3',
			title: 'Spring_Detail_01',
			image_url: 'https://picsum.photos/800/600?random=103',
			alt: '봄 화보 상세컷 1',
			description: '2024 봄 시즌 상세 화보 1',
			width: 800,
			height: 600,
			created_at: '2024-03-15T09:02:00Z',
			likes: 0,
			views: 0,
			tags: ['봄', '화보', '상세컷'],
		},
		{
			id: '4',
			title: 'Spring_Detail_02',
			image_url: 'https://picsum.photos/800/600?random=104',
			alt: '봄 화보 상세컷 2',
			description: '2024 봄 시즌 상세 화보 2',
			width: 800,
			height: 600,
			created_at: '2024-03-15T09:03:00Z',
			likes: 0,
			views: 0,
			tags: ['봄', '화보', '상세컷'],
		},
	],
	'2': [
		{
			id: '5',
			title: 'Product_Detail_01',
			image_url: 'https://picsum.photos/800/600?random=201',
			alt: '제품 상세컷 1',
			description: '제품 상세 페이지 사진 1',
			width: 800,
			height: 600,
			created_at: '2024-03-10T10:00:00Z',
			likes: 0,
			views: 0,
			tags: ['제품', '상세컷'],
		},
		{
			id: '6',
			title: 'Product_Detail_02',
			image_url: 'https://picsum.photos/800/600?random=202',
			alt: '제품 상세컷 2',
			description: '제품 상세 페이지 사진 2',
			width: 800,
			height: 600,
			created_at: '2024-03-10T10:01:00Z',
			likes: 0,
			views: 0,
			tags: ['제품', '상세컷'],
		},
	],
};

export const PhotoCollectionDetail = () => {
	const { collectionId } = useParams({
		from: '/gallery/collections/$collectionId',
	});
	const navigate = useNavigate();

	const collection = MOCK_COLLECTIONS.find((c) => c.id === collectionId);
	const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
	const photos = MOCK_COLLECTION_PHOTOS[collectionId] || [];

	const handlePhotoSelect = (photoId: string) => {
		setSelectedPhotos((prev) =>
			prev.includes(photoId)
				? prev.filter((id) => id !== photoId)
				: [...prev, photoId],
		);
	};

	const handleSelectAll = () => {
		setSelectedPhotos((prev) =>
			prev.length === photos.length ? [] : photos.map((photo) => photo.id),
		);
	};

	const handleAddPhotos = () => {
		navigate({
			to: '/gallery/photos/new',
			search: {
				collectionId,
			},
		});
	};

	return (
		<div className={styles.pageWrapper}>
			<div className={styles.header}>
				<h2 className={styles.title}>{collection?.title}</h2>
				<div className={styles.actions}>
					<button className={styles.actionButton} onClick={handleAddPhotos}>
						<HiPlus /> New Photos
					</button>
					{photos.length > 0 && (
						<>
							<button className={styles.actionButton} onClick={handleSelectAll}>
								{selectedPhotos.length === photos.length
									? 'Deselect All'
									: 'Select All'}
							</button>
							{selectedPhotos.length > 0 && (
								<button className={styles.actionButton} data-danger='true'>
									<HiTrash /> {selectedPhotos.length} Selected
								</button>
							)}
						</>
					)}
				</div>
			</div>

			{photos.length === 0 ? (
				<div className={styles.emptyState}>
					<span className={styles.emptyStateIcon}>🖼️</span>
					<p className={styles.emptyStateText}>No photos in this collection</p>
				</div>
			) : (
				<div className={styles.photoGrid}>
					{photos.map((photo) => (
						<div
							key={photo.id}
							className={`${styles.photoItem} ${
								selectedPhotos.includes(photo.id) ? styles.selected : ''
							}`}
							onClick={() => handlePhotoSelect(photo.id)}
						>
							<img
								src={photo.image_url}
								alt={photo.alt || ''}
								className={styles.photo}
							/>
							<div className={styles.photoOverlay}>
								<div className={styles.checkboxWrapper}>
									<input
										type='checkbox'
										className={styles.checkbox}
										checked={selectedPhotos.includes(photo.id)}
										onChange={(e) => {
											e.stopPropagation();
											handlePhotoSelect(photo.id);
										}}
									/>
									<HiCheck className={styles.checkIcon} />
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};
