import { Button, Dialog } from '@jung/design-system/components';
import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useRef,
	useState,
} from 'react';

interface ConfirmOptions {
	title: string;
	description?: string;
	confirmText?: string;
	cancelText?: string;
	variant?: 'default' | 'destructive';
}

interface ConfirmDialogContextValue {
	confirm: (options: ConfirmOptions) => Promise<boolean>;
}

const ConfirmDialogContext = createContext<ConfirmDialogContextValue | null>(
	null,
);

export const useConfirmDialog = () => {
	const ctx = useContext(ConfirmDialogContext);
	if (!ctx) {
		throw new Error(
			'useConfirmDialog must be used within ConfirmDialogProvider',
		);
	}
	return ctx;
};

export const ConfirmDialogProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const [open, setOpen] = useState(false);
	const [options, setOptions] = useState<ConfirmOptions>({
		title: '',
	});
	const resolveRef = useRef<((value: boolean) => void) | null>(null);

	const confirm = useCallback((opts: ConfirmOptions) => {
		setOptions(opts);
		setOpen(true);
		return new Promise<boolean>((resolve) => {
			resolveRef.current = resolve;
		});
	}, []);

	const handleClose = useCallback(() => {
		setOpen(false);
		resolveRef.current?.(false);
		resolveRef.current = null;
	}, []);

	const handleConfirm = useCallback(() => {
		setOpen(false);
		resolveRef.current?.(true);
		resolveRef.current = null;
	}, []);

	return (
		<ConfirmDialogContext.Provider value={{ confirm }}>
			{children}
			<Dialog open={open} onClose={handleClose}>
				<Dialog.Title>{options.title}</Dialog.Title>
				{options.description && (
					<Dialog.Description>{options.description}</Dialog.Description>
				)}
				<Dialog.Actions>
					<Button
						variant='outline'
						size='md'
						borderRadius='md'
						onClick={handleClose}
					>
						{options.cancelText || 'Cancel'}
					</Button>
					<Button
						variant={options.variant === 'destructive' ? 'primary' : 'primary'}
						size='md'
						borderRadius='md'
						onClick={handleConfirm}
						color={options.variant === 'destructive' ? 'white' : undefined}
						background={options.variant === 'destructive' ? 'error' : undefined}
					>
						{options.confirmText || 'Confirm'}
					</Button>
				</Dialog.Actions>
			</Dialog>
		</ConfirmDialogContext.Provider>
	);
};
