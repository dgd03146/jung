'use client';

import { useScrollLock } from '@/fsd/shared';
import { Box } from '@jung/design-system/components';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';
import { IoClose } from 'react-icons/io5';
import * as styles from './Modal.css';

interface ModalProps {
	children: React.ReactNode;
	showCloseButton?: boolean;
	onClose?: () => void;
	useRouterBack?: boolean;
	variant?: 'photo' | 'share';
}

export function Modal({
	children,
	showCloseButton = true,
	onClose,
	useRouterBack = false,
	variant = 'photo',
}: ModalProps) {
	const router = useRouter();
	const overlayRef = useRef<HTMLDivElement>(null);

	const handleDismiss = useCallback(() => {
		if (useRouterBack) {
			router.back();
		}

		onClose?.();
	}, [router, onClose, useRouterBack]);

	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === 'Escape') handleDismiss();
		},
		[handleDismiss],
	);

	const handleOverlayClick = useCallback(
		(e: React.MouseEvent) => {
			if (e.target === overlayRef.current) {
				handleDismiss();
			}
		},
		[handleDismiss],
	);

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [handleKeyDown]);

	useScrollLock(true);

	const isPhotoModal = variant === 'photo';

	return (
		<Box role='dialog' aria-modal='true' className={styles.container}>
			{showCloseButton && isPhotoModal && (
				<button
					className={styles.closeButton}
					onClick={handleDismiss}
					aria-label='Close modal'
				>
					<IoClose size={24} />
				</button>
			)}
			<Box
				ref={overlayRef}
				className={isPhotoModal ? styles.overlay : styles.shareOverlay}
				onClick={handleOverlayClick}
			>
				<Box
					className={isPhotoModal ? styles.photoContent : styles.shareContent}
					tabIndex={-1}
				>
					{children}
				</Box>
			</Box>
		</Box>
	);
}
