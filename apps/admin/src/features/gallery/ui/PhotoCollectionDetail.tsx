import { useNavigate, useParams } from '@tanstack/react-router';
import { useState } from 'react';
import { HiCheck, HiPlus, HiTrash } from 'react-icons/hi';
import { useDeletePhotosFromCollection } from '../api/useDeletePhotosFromCollection';
import { useGetPhotosByCollectionId } from '../api/useGetPhotosByCollectionId';
import * as styles from './PhotoCollectionDetail.css.ts';
import { PhotoCollectionDetailSkeleton } from './PhotoCollectionDetailSkeleton.tsx';

export const PhotoCollectionDetail = () => {
	const { collectionId } = useParams({
		from: '/gallery/collections/$collectionId',
	});
	const navigate = useNavigate();

	const { photos, total, collectionTitle, isLoading } =
		useGetPhotosByCollectionId({
			collectionId,
			page: 1,
			limit: 50,
		});

	const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);

	const deletePhotosMutation = useDeletePhotosFromCollection({
		collectionId,
	});

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
			params: {
				collectionId,
			},
		});
	};

	const handleDeleteSelected = async () => {
		if (selectedPhotos.length === 0) return;

		if (window.confirm(`Delete ${selectedPhotos.length} selected photos?`)) {
			const selectedPhotoUrls = photos
				.filter((photo) => selectedPhotos.includes(photo.id))
				.map((photo) => photo.image_url);

			deletePhotosMutation.mutate(
				{
					photoIds: selectedPhotos,
					photoUrls: selectedPhotoUrls,
				},
				{
					onSuccess: () => {
						setSelectedPhotos([]);
					},
				},
			);
		}
	};

	if (isLoading) {
		return <PhotoCollectionDetailSkeleton />;
	}

	return (
		<div className={styles.pageWrapper}>
			<div className={styles.header}>
				<h2 className={styles.title}>
					{collectionTitle} ({total})
				</h2>
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
								<button
									className={styles.actionButton}
									data-danger='true'
									onClick={handleDeleteSelected}
									disabled={deletePhotosMutation.isPending}
								>
									<HiTrash /> Delete {selectedPhotos.length} Selected
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
