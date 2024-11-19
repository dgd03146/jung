'use client';

import { Box } from '@jung/design-system/components';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';
import { IoClose } from 'react-icons/io5';
import * as styles from './Modal.css';

interface ModalProps {
	children: React.ReactNode;
	onClose?: () => void;
	showCloseButton?: boolean;
}

export function Modal({
	children,
	onClose,
	showCloseButton = true,
}: ModalProps) {
	const router = useRouter();
	const contentRef = useRef<HTMLDivElement>(null);

	const handleDismiss = useCallback(() => {
		if (onClose) {
			onClose();
		} else {
			router.back();
		}
	}, [router, onClose]);

	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === 'Escape') handleDismiss();
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
				<motion.button
					className={styles.closeButton}
					onClick={handleDismiss}
					aria-label='Close modal'
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.95 }}
				>
					<IoClose size={24} />
				</motion.button>
			)}
			<Box className={styles.overlay} onClick={handleDismiss}>
				<Box
					ref={contentRef}
					className={styles.content}
					onClick={(e) => e.stopPropagation()}
					tabIndex={-1}
				>
					{children}
				</Box>
			</Box>
		</Box>
	);
}
