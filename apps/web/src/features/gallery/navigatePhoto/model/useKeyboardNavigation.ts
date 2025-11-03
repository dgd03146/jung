import { ROUTES } from '@/fsd/shared';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';

interface UseKeyboardNavigationProps {
	previousPhotoId?: string | null;
	nextPhotoId?: string | null;
	isModal?: boolean;
}

export const useKeyboardNavigation = ({
	previousPhotoId,
	nextPhotoId,
	isModal,
}: UseKeyboardNavigationProps) => {
	const router = useRouter();

	const handleNavigation = useCallback(
		(photoId: string) => {
			router.replace(ROUTES.PHOTO.pathById(photoId), { scroll: false });
		},
		[router],
	);

	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (event.key === 'ArrowLeft' && previousPhotoId) {
				handleNavigation(previousPhotoId);
			} else if (event.key === 'ArrowRight' && nextPhotoId) {
				handleNavigation(nextPhotoId);
			}
		},
		[previousPhotoId, nextPhotoId, handleNavigation],
	);

	useEffect(() => {
		if (!isModal) return;

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [isModal, handleKeyDown]);

	return {
		handleNavigation,
	};
};
