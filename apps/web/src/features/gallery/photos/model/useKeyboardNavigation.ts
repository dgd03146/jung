import type { Photo } from '@jung/shared/types';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';

interface UseKeyboardNavigationProps {
	previousPhoto?: Photo | null;
	nextPhoto?: Photo | null;
	isModal?: boolean;
}

export const useKeyboardNavigation = ({
	previousPhoto,
	nextPhoto,
	isModal,
}: UseKeyboardNavigationProps) => {
	const router = useRouter();

	const handleNavigation = useCallback(
		(photoId: string) => {
			router.replace(`/gallery/photo/${photoId}`, { scroll: false });
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
					if (previousPhoto) {
						handleNavigation(previousPhoto.id);
					}
					break;
				case 'ArrowRight':
					if (nextPhoto) {
						handleNavigation(nextPhoto.id);
					}
					break;
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [isModal, previousPhoto, nextPhoto, handleNavigation]);

	return {
		handleNavigation,
	};
};
