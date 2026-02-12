import {
	type ReactNode,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import { createPortal } from 'react-dom';
import * as styles from './Dialog.css';

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

	const handleClose = useCallback(() => {
		setClosing(true);
		setTimeout(() => {
			setClosing(false);
			onClose();
		}, 150);
	}, [onClose]);

	useEffect(() => {
		if (open) {
			previousFocusRef.current = document.activeElement as HTMLElement;
			setMounted(true);

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
				tabIndex={-1}
			>
				{children}
			</div>
		</>,
		document.body,
	);
};

const Title = ({ children }: { children: ReactNode }) => (
	<h2 className={styles.title}>{children}</h2>
);

const Description = ({ children }: { children: ReactNode }) => (
	<p className={styles.description}>{children}</p>
);

const Actions = ({ children }: { children: ReactNode }) => (
	<div className={styles.actions}>{children}</div>
);

export const Dialog = Object.assign(DialogRoot, {
	Title,
	Description,
	Actions,
});
