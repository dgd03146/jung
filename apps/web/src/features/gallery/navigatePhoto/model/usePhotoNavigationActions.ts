import type { Photo } from '@jung/shared/types';
import { useCallback } from 'react';
import { useKeyboardNavigation } from './useKeyboardNavigation';

interface UsePhotoNavigationActionsParams {
	previousPhoto: Photo | null;
	nextPhoto: Photo | null;
	isModal: boolean;
}

export function usePhotoNavigationActions({
	previousPhoto,
	nextPhoto,
	isModal,
}: UsePhotoNavigationActionsParams) {
	const { handleNavigation } = useKeyboardNavigation({
		previousPhotoId: previousPhoto?.id,
		nextPhotoId: nextPhoto?.id,
		isModal,
	});

	// 이전 사진으로 이동
	const handlePrevClick = useCallback(() => {
		if (previousPhoto) {
			handleNavigation(previousPhoto.id);
		}
	}, [previousPhoto, handleNavigation]);

	// 다음 사진으로 이동
	const handleNextClick = useCallback(() => {
		if (nextPhoto) {
			handleNavigation(nextPhoto.id);
		}
	}, [nextPhoto, handleNavigation]);

	return {
		handlePrevClick,
		handleNextClick,
		canNavigatePrev: !!previousPhoto,
		canNavigateNext: !!nextPhoto,
	};
}
