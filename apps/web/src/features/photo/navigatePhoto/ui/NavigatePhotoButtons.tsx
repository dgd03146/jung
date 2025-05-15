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
			enabled:
				isModal &&
				(!initialAdjacentData ||
					(initialAdjacentData &&
						!initialAdjacentData.previous &&
						!initialAdjacentData.next)),
		});

	const previousPhoto = adjacentPhotos?.previous ?? null;
	const nextPhoto = adjacentPhotos?.next ?? null;

	const { handleNavigation } = useKeyboardNavigation({
		previousPhotoId: previousPhoto?.id,
		nextPhotoId: nextPhoto?.id,
		isModal,
	});

	const getContainerClassName = () => {
		const isLoading = isLoadingAdjacentPhotos;
		const hasPrevious = !!previousPhoto;
		const hasNext = !!nextPhoto;

		if (isLoading || (hasPrevious && hasNext)) {
			return styles.modalNavigationButtonsContainer;
		}
		if (hasPrevious || hasNext) {
			return `${styles.modalNavigationButtonsContainer} ${styles.singleButtonContainer}`;
		}
		return styles.modalNavigationButtonsContainer;
	};

	return (
		<Box className={styles.modalNavigationWrapper}>
			<div className={getContainerClassName()}>
				{isModal && (
					<Button
						onClick={() => previousPhoto && handleNavigation(previousPhoto.id)}
						className={styles.modalNavigationButton}
						aria-label='previous photo (← key)'
						disabled={isLoadingAdjacentPhotos || !previousPhoto}
					>
						<HiChevronLeft className={styles.navigationIcon} />
					</Button>
				)}
				{!isModal && <div />}

				{isModal && (
					<Button
						onClick={() => nextPhoto && handleNavigation(nextPhoto.id)}
						className={styles.modalNavigationButton}
						aria-label='next photo (→ key)'
						disabled={isLoadingAdjacentPhotos || !nextPhoto}
					>
						<HiChevronRight className={styles.navigationIcon} />
					</Button>
				)}
				{!isModal && <div />}
			</div>
		</Box>
	);
};
