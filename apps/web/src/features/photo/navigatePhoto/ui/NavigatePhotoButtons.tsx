'use client';

import { Box, Button } from '@jung/design-system/components';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

import { useAdjacentPhotosQuery } from '@/fsd/entities/photo';
import { usePhotoFilter } from '@/fsd/features/photo';
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
	if (!isModal) {
		return null;
	}

	const { sort, collectionId } = usePhotoFilter();

	// 훅은 항상 컴포넌트 최상위 레벨에서 직접 호출
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
