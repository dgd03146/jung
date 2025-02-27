'use client';

import { Modal } from '@/fsd/shared';
import { Box, Button, Typography, useToast } from '@jung/design-system';
import { createPortal } from 'react-dom';
import { FaLink, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import { RiKakaoTalkFill } from 'react-icons/ri';
import * as styles from './ShareModal.css';

interface ShareModalProps {
	isOpen: boolean;
	onClose: () => void;

	links: {
		kakao: () => void;
		x: string;
		linkedin: string;
		whatsapp: string;
	};
}

export function ShareModal({ isOpen, onClose, links }: ShareModalProps) {
	const showToast = useToast();

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(window.location.href);
			showToast('Link copied', 'success');
		} catch (error) {
			showToast('Link copy failed', 'error');
		}
	};

	if (!isOpen) return null;

	return createPortal(
		<Modal variant='share' onClose={onClose} showCloseButton={false}>
			<Box className={styles.shareModalContent}>
				<Box className={styles.header}>
					<Typography.Text level={1} color='primary' fontWeight='medium'>
						Share with socials
					</Typography.Text>
					<button
						onClick={onClose}
						className={styles.closeButton}
						aria-label='Close modal'
					>
						<IoClose size={20} />
					</button>
				</Box>

				<Box className={styles.socialButtons}>
					<Button
						onClick={links.kakao}
						prefix={<RiKakaoTalkFill size={20} />}
						className={styles.socialButton({ platform: 'kakao' })}
					>
						KakaoTalk
					</Button>
					<Button
						onClick={() => window.open(links.whatsapp, '_blank')}
						prefix={<FaWhatsapp size={20} />}
						className={styles.socialButton({ platform: 'whatsapp' })}
					>
						WhatsApp
					</Button>
					<Button
						onClick={() => window.open(links.x, '_blank')}
						prefix={<FaXTwitter size={20} />}
						className={styles.socialButton({ platform: 'x' })}
					>
						X
					</Button>
					<Button
						onClick={() => window.open(links.linkedin, '_blank')}
						prefix={<FaLinkedin size={20} />}
						className={styles.socialButton({ platform: 'linkedin' })}
					>
						LinkedIn
					</Button>
				</Box>

				<Box className={styles.divider} />

				<Button
					onClick={copyToClipboard}
					variant='secondary'
					gap='1'
					prefix={<FaLink size={20} />}
					borderRadius='lg'
				>
					Copy link
				</Button>
			</Box>
		</Modal>,
		document.body,
	);
}
