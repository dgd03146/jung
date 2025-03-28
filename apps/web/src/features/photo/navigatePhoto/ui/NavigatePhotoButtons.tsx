'use client';

import { Box, Button } from '@jung/design-system/components';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

import {
	useAdjacentPhotosQuery,
	usePhotoFilterStore,
} from '@/fsd/entities/photo';
import { useKeyboardNavigation } from '../model/useKeyboardNavigation';
import * as styles from './NavigatePhotoButton.css';

interface Props {
	photoId: string;
	isModal: boolean;
}

export const NavigatePhotoButtons = ({ photoId, isModal }: Props) => {
	const { sort, collectionId } = usePhotoFilterStore();

	const { data: adjacentPhotos } = useAdjacentPhotosQuery({
		id: photoId,
		sort,
		collectionId,
		enabled: isModal,
	});

	const { previous: previousPhoto, next: nextPhoto } =
		isModal && adjacentPhotos ? adjacentPhotos : { previous: null, next: null };

	const { handleNavigation } = useKeyboardNavigation({
		previousPhotoId: previousPhoto?.id,
		nextPhotoId: nextPhoto?.id,
		isModal: true,
	});

	const containerClassName = `${styles.modalNavigationButtonsContainer} ${
		!previousPhoto || !nextPhoto ? styles.singleButtonContainer : ''
	}`;

	return (
		<Box className={styles.modalNavigationWrapper}>
			<div className={containerClassName}>
				{previousPhoto ? (
					<Button
						onClick={() => handleNavigation(previousPhoto.id)}
						className={styles.modalNavigationButton}
						aria-label='이전 사진 보기 (← 키)'
					>
						<HiChevronLeft className={styles.navigationIcon} />
					</Button>
				) : (
					<div className={styles.placeholderButton} />
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
