'use client';

import type { UIMessage } from 'ai';
import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { IoChatbubble, IoClose, IoSend } from 'react-icons/io5';
import * as styles from './ChatWindow.css';
import { MessageItem } from './MessageItem';

interface ChatWindowProps {
	isOpen: boolean;
	onClose: () => void;
	messages: UIMessage[];
	input: string;
	handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	isLoading: boolean;
	isCooldown?: boolean;
	onQuickAction?: (text: string) => void;
}

const QUICK_ACTIONS = [
	{ icon: '📝', label: 'Blog', action: '블로그 글 추천해줘' },
	{ icon: '📍', label: 'Places', action: '좋아하는 장소 알려줘' },
	{ icon: '📸', label: 'Photos', action: '사진 보여줘' },
	{ icon: '👋', label: 'About', action: '자기소개 해줘' },
];

export function ChatWindow({
	isOpen,
	onClose,
	messages,
	input,
	handleInputChange,
	handleSubmit,
	isLoading,
	isCooldown,
	onQuickAction,
}: ChatWindowProps) {
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const [showWelcome, setShowWelcome] = useState(true);

	const scrollToBottom = useCallback(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, []);

	const prevMessagesRef = useRef(messages);
	if (prevMessagesRef.current !== messages) {
		prevMessagesRef.current = messages;
		queueMicrotask(scrollToBottom);
	}

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener('keydown', handleKeyDown);
			if (!showWelcome) {
				textareaRef.current?.focus();
			}
		}

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [isOpen, onClose, showWelcome]);

	useEffect(() => {
		if (messages.some((m) => m.role === 'user')) {
			setShowWelcome(false);
		}
	}, [messages]);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			const form = e.currentTarget.form;
			if (form && input.trim()) {
				form.requestSubmit();
			}
		}
	};

	const autoResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const textarea = e.target;
		textarea.style.height = 'auto';
		textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
		handleInputChange(e);
	};

	const handleStartChat = () => {
		setShowWelcome(false);
		setTimeout(() => textareaRef.current?.focus(), 100);
	};

	const handleQuickActionClick = (action: string) => {
		if (onQuickAction) {
			onQuickAction(action);
		}
	};

	const lastMessage = messages[messages.length - 1];
	const lastHasText = lastMessage?.parts?.some(
		(p) => p.type === 'text' && 'text' in p && (p as { text: string }).text,
	);
	const showLoadingDots =
		isLoading &&
		(lastMessage?.role === 'user' ||
			(lastMessage?.role === 'assistant' && !lastHasText));

	if (typeof window === 'undefined') return null;

	return createPortal(
		<AnimatePresence>
			{isOpen && (
				<>
					<motion.div
						className={styles.overlay}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={onClose}
					/>
					<motion.div
						className={styles.container}
						initial={{ opacity: 0, y: 16, scale: 0.98 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 16, scale: 0.98 }}
						transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
						role='dialog'
						aria-modal='true'
						aria-label='Chat window'
					>
						<div className={styles.header}>
							<div className={styles.headerTitle}>
								<IoChatbubble size={16} />
								<span>Chat with Jung</span>
							</div>
							<button
								className={styles.closeButton}
								onClick={onClose}
								aria-label='Close chat'
							>
								<IoClose size={20} />
							</button>
						</div>

						{showWelcome ? (
							<div className={styles.welcomeScreen}>
								<div className={styles.blobAvatar}>
									<IoChatbubble size={36} />
								</div>
								<h2 className={styles.welcomeTitle}>
									Hi, I'm <span className={styles.welcomeHighlight}>Jung</span>
								</h2>
								<p className={styles.welcomeSubtitle}>
									Ask me anything about my blog, favorite places, or photos.
								</p>
								<button
									className={styles.startButton}
									onClick={handleStartChat}
								>
									Start Chat
								</button>
							</div>
						) : (
							<>
								<div className={styles.messagesContainer}>
									{messages.map((message) => (
										<MessageItem key={message.id} message={message} />
									))}
									{showLoadingDots && (
										<MessageItem
											message={{
												id: 'loading',
												role: 'assistant',
												parts: [],
											}}
											isLoading
										/>
									)}
									<div ref={messagesEndRef} />
								</div>

								{!isLoading && messages.length <= 2 && (
									<div className={styles.quickActionsContainer}>
										{QUICK_ACTIONS.map((action) => (
											<button
												key={action.label}
												className={styles.quickActionButton}
												onClick={() => handleQuickActionClick(action.action)}
												disabled={isCooldown}
											>
												<span className={styles.quickActionIcon}>
													{action.icon}
												</span>
												{action.label}
											</button>
										))}
									</div>
								)}

								<div className={styles.inputContainer}>
									<form onSubmit={handleSubmit} className={styles.inputWrapper}>
										<textarea
											ref={textareaRef}
											className={styles.textInput}
											value={input}
											onChange={autoResize}
											onKeyDown={handleKeyDown}
											placeholder='Type a message...'
											rows={1}
											disabled={isLoading}
										/>
										<button
											type='submit'
											className={styles.sendButton}
											disabled={!input.trim() || isLoading || isCooldown}
											aria-label='Send message'
										>
											<IoSend size={16} />
										</button>
									</form>
								</div>
							</>
						)}
					</motion.div>
				</>
			)}
		</AnimatePresence>,
		document.body,
	);
}
