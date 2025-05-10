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

	const { data: adjacentPhotos } = useAdjacentPhotosQuery({
		id: photoId,
		sort,
		collectionId,
		initialData: initialAdjacentData,
		enabled: isModal && !initialAdjacentData,
	});

	const previousPhoto =
		isModal && adjacentPhotos ? adjacentPhotos.previous : null;
	const nextPhoto = isModal && adjacentPhotos ? adjacentPhotos.next : null;

	const { handleNavigation } = useKeyboardNavigation({
		previousPhotoId: previousPhoto?.id,
		nextPhotoId: nextPhoto?.id,
		isModal,
	});

	const containerClassName = `${styles.modalNavigationButtonsContainer} ${
		!previousPhoto || !nextPhoto ? styles.singleButtonContainer : ''
	}`;

	return (
		<Box className={styles.modalNavigationWrapper}>
			<div className={containerClassName}>
				{previousPhoto && (
					<Button
						onClick={() => handleNavigation(previousPhoto.id)}
						className={styles.modalNavigationButton}
						aria-label='이전 사진 보기 (← 키)'
					>
						<HiChevronLeft className={styles.navigationIcon} />
					</Button>
				)}

				{nextPhoto && (
					<Button
						onClick={() => handleNavigation(nextPhoto.id)}
						className={styles.modalNavigationButton}
						aria-label='다음 사진 보기 (→ 키)'
					>
						<HiChevronRight className={styles.navigationIcon} />
					</Button>
				)}
			</div>
		</Box>
	);
};
