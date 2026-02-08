'use client';

import { AnimatePresence, motion } from 'motion/react';
import { IoChatbubble, IoClose } from 'react-icons/io5';
import * as styles from './ChatButton.css';

interface ChatButtonProps {
	isOpen: boolean;
	onClick: () => void;
}

export function ChatButton({ isOpen, onClick }: ChatButtonProps) {
	return (
		<motion.button
			className={styles.floatingButton}
			onClick={onClick}
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
			aria-label={isOpen ? 'Close chat' : 'Open chat'}
		>
			<AnimatePresence mode='wait' initial={false}>
				<motion.div
					key={isOpen ? 'close' : 'chat'}
					initial={{ rotate: -90, opacity: 0 }}
					animate={{ rotate: 0, opacity: 1 }}
					exit={{ rotate: 90, opacity: 0 }}
					transition={{ duration: 0.15 }}
					className={styles.iconWrapper}
				>
					{isOpen ? <IoClose size={22} /> : <IoChatbubble size={22} />}
				</motion.div>
			</AnimatePresence>
		</motion.button>
	);
}
