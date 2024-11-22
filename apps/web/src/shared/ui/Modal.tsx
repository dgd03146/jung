'use client';

import { Box } from '@jung/design-system/components';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';
import { IoClose } from 'react-icons/io5';
import * as styles from './Modal.css';

interface ModalProps {
	children: React.ReactNode;
	showCloseButton?: boolean;
}

export function Modal({
	children,

	showCloseButton = true,
}: ModalProps) {
	const router = useRouter();
	const overlayRef = useRef<HTMLDivElement>(null);

	const handleDismiss = useCallback(() => {
		router.back();
	}, [router]);

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
		document.body.style.overflow = 'hidden';

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			document.body.style.overflow = 'unset';
		};
	}, [handleKeyDown]);

	return (
		<Box role='dialog' aria-modal='true' className={styles.container}>
			{showCloseButton && (
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
				className={styles.overlay}
				onClick={handleOverlayClick}
			>
				<Box className={styles.content} tabIndex={-1}>
					{children}
				</Box>
			</Box>
		</Box>
	);
}
