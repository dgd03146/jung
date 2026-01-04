import { Box, Typography } from '@jung/design-system/components';
import { createPortal } from 'react-dom';
import { IoClose } from 'react-icons/io5';
import { SocialLoginPrompt } from '@/fsd/entities/auth';
import { Modal } from '@/fsd/shared';
import * as styles from './LoginModal.css';
import { SocialLoginButtons } from './SocialLoginButtons';

interface LoginModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
	if (!isOpen) return null;

	const handleLoginSuccess = () => {
		onClose();
	};

	return createPortal(
		<Modal variant='share' onClose={onClose} showCloseButton={false}>
			<Box className={styles.loginModalContent}>
				<button
					onClick={onClose}
					className={styles.closeButton}
					aria-label='Close modal'
				>
					<IoClose size={20} />
				</button>

				<SocialLoginPrompt
					actions={<SocialLoginButtons onSuccess={handleLoginSuccess} />}
				/>
				<Typography.Text level={4} color='black'>
					You can use more features by logging in
				</Typography.Text>
			</Box>
		</Modal>,
		document.body,
	);
}
