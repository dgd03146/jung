'use client';

import { getImageUrl } from '@jung/shared/lib';
import type { PlacePhoto } from '@jung/shared/types';
import { useCallback, useEffect } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { BlurImage, Modal } from '@/fsd/shared/ui';
import * as styles from './PlacePhotoModal.css';

interface PlacePhotoModalProps {
	photos: PlacePhoto[];
	currentIndex: number;
	onClose: () => void;
	onNavigate: (index: number) => void;
}

function usePhotoNavigation(
	photos: PlacePhoto[],
	currentIndex: number,
	onNavigate: (index: number) => void,
) {
	const canNavigate = photos.length > 1;

	const goToPrev = useCallback(() => {
		if (!canNavigate) return;
		const prevIndex = currentIndex === 0 ? photos.length - 1 : currentIndex - 1;
		onNavigate(prevIndex);
	}, [canNavigate, currentIndex, photos.length, onNavigate]);

	const goToNext = useCallback(() => {
		if (!canNavigate) return;
		const nextIndex = currentIndex === photos.length - 1 ? 0 : currentIndex + 1;
		onNavigate(nextIndex);
	}, [canNavigate, currentIndex, photos.length, onNavigate]);

	return {
		goToPrev,
		goToNext,
		hasPrev: canNavigate,
		hasNext: canNavigate,
	};
}

export function PlacePhotoModal({
	photos,
	currentIndex,
	onClose,
	onNavigate,
}: PlacePhotoModalProps) {
	const { goToPrev, goToNext, hasPrev, hasNext } = usePhotoNavigation(
		photos,
		currentIndex,
		onNavigate,
	);

	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === 'ArrowLeft') goToPrev();
			if (e.key === 'ArrowRight') goToNext();
		},
		[goToPrev, goToNext],
	);

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [handleKeyDown]);

	const currentPhoto = photos[currentIndex];

	if (!currentPhoto) return null;

	return (
		<Modal onClose={onClose} useRouterBack={false}>
			<div className={styles.imageContainer}>
				<BlurImage
					src={getImageUrl(currentPhoto.url)}
					alt={`Photo ${currentIndex + 1}`}
					fill
					sizes='90vw'
					style={{ objectFit: 'contain' }}
				/>
			</div>

			<div className={styles.navigationWrapper}>
				<div className={styles.navigationButtonsContainer}>
					<button
						type='button'
						className={styles.navigationButton}
						onClick={goToPrev}
						disabled={!hasPrev}
						aria-label='Previous photo'
					>
						<HiChevronLeft className={styles.navigationIcon} />
					</button>
					<button
						type='button'
						className={styles.navigationButton}
						onClick={goToNext}
						disabled={!hasNext}
						aria-label='Next photo'
					>
						<HiChevronRight className={styles.navigationIcon} />
					</button>
				</div>
			</div>

			<div className={styles.counter}>
				{currentIndex + 1} / {photos.length}
			</div>
		</Modal>
	);
}
