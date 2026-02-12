'use client';

import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useId,
	useRef,
	useState,
} from 'react';
import { createPortal } from 'react-dom';
import * as styles from './Dialog.css';

const DialogIdContext = createContext({ titleId: '', descriptionId: '' });

const ANIMATION_DURATION_MS = 150;

interface DialogProps {
	open: boolean;
	onClose: () => void;
	children: ReactNode;
}

const DialogRoot = ({ open, onClose, children }: DialogProps) => {
	const [mounted, setMounted] = useState(false);
	const [closing, setClosing] = useState(false);
	const contentRef = useRef<HTMLDivElement>(null);
	const previousFocusRef = useRef<HTMLElement | null>(null);
	const closingRef = useRef(false);
	const id = useId();
	const titleId = `${id}-title`;
	const descriptionId = `${id}-description`;

	const closeTimerRef = useRef<ReturnType<typeof setTimeout>>(null);

	const handleClose = useCallback(() => {
		if (closingRef.current) return;
		closingRef.current = true;
		setClosing(true);
		closeTimerRef.current = setTimeout(() => {
			closingRef.current = false;
			setClosing(false);
			onClose();
		}, ANIMATION_DURATION_MS);
	}, [onClose]);

	useEffect(() => {
		return () => {
			if (closeTimerRef.current) {
				clearTimeout(closeTimerRef.current);
			}
		};
	}, []);

	useEffect(() => {
		if (open) {
			previousFocusRef.current = document.activeElement as HTMLElement;
			setMounted(true);
			closingRef.current = false;

			requestAnimationFrame(() => {
				contentRef.current?.focus();
			});
		} else {
			setMounted(false);
			previousFocusRef.current?.focus();
		}
	}, [open]);

	useEffect(() => {
		if (!open) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				handleClose();
				return;
			}

			if (e.key === 'Tab' && contentRef.current) {
				const focusable = contentRef.current.querySelectorAll<HTMLElement>(
					'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
				);
				const first = focusable[0];
				const last = focusable[focusable.length - 1];

				if (e.shiftKey) {
					if (document.activeElement === first) {
						e.preventDefault();
						last?.focus();
					}
				} else {
					if (document.activeElement === last) {
						e.preventDefault();
						first?.focus();
					}
				}
			}
		};

		document.addEventListener('keydown', handleKeyDown);
		document.body.style.overflow = 'hidden';

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			document.body.style.overflow = '';
		};
	}, [open, handleClose]);

	if (!open && !mounted) return null;

	return createPortal(
		<>
			<div
				className={styles.overlay}
				data-closing={closing}
				onClick={handleClose}
				aria-hidden='true'
			/>
			<div
				ref={contentRef}
				className={styles.content}
				data-closing={closing}
				role='dialog'
				aria-modal='true'
				aria-labelledby={titleId}
				aria-describedby={descriptionId}
				tabIndex={-1}
			>
				<DialogIdContext.Provider value={{ titleId, descriptionId }}>
					{children}
				</DialogIdContext.Provider>
			</div>
		</>,
		document.body,
	);
};

const Title = ({ children }: { children: ReactNode }) => {
	const { titleId } = useContext(DialogIdContext);
	return (
		<h2 id={titleId} className={styles.title}>
			{children}
		</h2>
	);
};

const Description = ({ children }: { children: ReactNode }) => {
	const { descriptionId } = useContext(DialogIdContext);
	return (
		<p id={descriptionId} className={styles.description}>
			{children}
		</p>
	);
};

const Actions = ({ children }: { children: ReactNode }) => (
	<div className={styles.actions}>{children}</div>
);

export const Dialog = Object.assign(DialogRoot, {
	Title,
	Description,
	Actions,
});
