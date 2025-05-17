'use client';

import { Box, Button } from '@jung/design-system/components';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

import { useAdjacentPhotosQuery } from '@/fsd/entities/photo';
import { usePhotoFilter } from '@/fsd/views/gallery';
import { useInitialAdjacentPhotos } from '../model/useInitialAdjacentPhotos';
import { useKeyboardNavigation } from '../model/useKeyboardNavigation';
import * as styles from './NavigatePhotoButton.css';

interface Props {
	photoId: string;
	isModal: boolean;
}

export const NavigatePhotoButtons = ({ photoId, isModal }: Props) => {
	if (!isModal) {
		return null;
	}

	const { sort, collectionId } = usePhotoFilter();

	const initialAdjacentData = useInitialAdjacentPhotos({
		photoId,
		sort,
		collectionId,
	});

	const { data: adjacentPhotos, isFetching: isLoadingAdjacentPhotos } =
		useAdjacentPhotosQuery({
			id: photoId,
			sort,
			collectionId,
			initialData: initialAdjacentData,
			enabled: isModal && !!photoId,
		});

	const previousPhoto = adjacentPhotos?.previous ?? null;
	const nextPhoto = adjacentPhotos?.next ?? null;

	const { handleNavigation } = useKeyboardNavigation({
		previousPhotoId: previousPhoto?.id,
		nextPhotoId: nextPhoto?.id,
		isModal,
	});

	const renderNavButton = (
		direction: 'prev' | 'next',
		target: { id: string } | null,
	) => {
		const isDisabled = !target;
		const Icon = direction === 'prev' ? HiChevronLeft : HiChevronRight;
		const ariaLabel = direction === 'prev' ? 'Previous photo' : 'Next photo';
		const title =
			direction === 'prev'
				? 'Go to previous photo (← key)'
				: 'Go to next photo (→ key)';

		const onClick = () => {
			if (!target) {
				return;
			}
			handleNavigation(target.id);
		};

		return (
			<Button
				onClick={onClick}
				className={styles.modalNavigationButton}
				aria-label={ariaLabel}
				title={title}
				disabled={isDisabled}
			>
				<Icon className={styles.navigationIcon} />
			</Button>
		);
	};

	return (
		<Box className={styles.modalNavigationWrapper}>
			<div className={styles.modalNavigationButtonsContainer}>
				{previousPhoto ? (
					renderNavButton('prev', previousPhoto)
				) : (
					<div className={styles.placeholderButton} />
				)}
				{nextPhoto ? (
					renderNavButton('next', nextPhoto)
				) : (
					<div className={styles.placeholderButton} />
				)}
			</div>
		</Box>
	);
};
