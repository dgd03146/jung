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

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (!isModal) {
				return;
			}

			switch (event.key) {
				case 'ArrowLeft':
					if (previousPhotoId) {
						handleNavigation(previousPhotoId);
					}
					break;
				case 'ArrowRight':
					if (nextPhotoId) {
						handleNavigation(nextPhotoId);
					}
					break;
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [isModal, previousPhotoId, nextPhotoId, handleNavigation]);

	return {
		handleNavigation,
	};
};
