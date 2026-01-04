'use client';

import { Box, Button } from '@jung/design-system/components';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

import { useAdjacentPhotosQuery } from '@/fsd/entities/gallery';
import { usePhotoFilter } from '@/fsd/features/gallery';
import {
	useAdjacentPhotosPrefetch,
	useInitialAdjacentPhotos,
	usePhotoNavigationActions,
} from '../model';
import * as styles from './NavigatePhotoButton.css';

interface Props {
	photoId: string;
	isModal: boolean;
}

const ButtonIcon = {
	prev: HiChevronLeft,
	next: HiChevronRight,
};

export const NavigatePhotoButtons = ({ photoId, isModal }: Props) => {
	const { sort, collectionId } = usePhotoFilter();

	const initialAdjacentData = useInitialAdjacentPhotos({
		photoId,
		sort,
		collectionId,
	});

	const { data: adjacentPhotos, isLoading } = useAdjacentPhotosQuery({
		id: photoId,
		sort,
		collectionId,
		initialData: initialAdjacentData,
		enabled: isModal && !!photoId,
	});

	const previousPhoto = adjacentPhotos?.previous ?? null;
	const nextPhoto = adjacentPhotos?.next ?? null;

	useAdjacentPhotosPrefetch({
		photoId,
		previousPhoto,
		nextPhoto,
		sort,
		collectionId,
	});

	const { handlePrevClick, handleNextClick, canNavigatePrev, canNavigateNext } =
		usePhotoNavigationActions({
			previousPhoto,
			nextPhoto,
			isModal,
		});

	if (!isModal) {
		return null;
	}

	return (
		<Box className={styles.modalNavigationWrapper}>
			<div className={styles.modalNavigationButtonsContainer}>
				<Button
					onClick={handlePrevClick}
					className={styles.modalNavigationButton}
					aria-label='Previous photo'
					title='Go to previous photo (← key)'
					disabled={isLoading || !canNavigatePrev}
				>
					<ButtonIcon.prev className={styles.navigationIcon} />
				</Button>
				<Button
					onClick={handleNextClick}
					className={styles.modalNavigationButton}
					aria-label='Next photo'
					title='Go to next photo (→ key)'
					disabled={isLoading || !canNavigateNext}
				>
					<ButtonIcon.next className={styles.navigationIcon} />
				</Button>
			</div>
		</Box>
	);
};
