'use client';

import { isToolUIPart, type UIMessage } from 'ai';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { IoChatbubble, IoPerson } from 'react-icons/io5';
import * as styles from './MessageItem.css';

interface MessageItemProps {
	message: UIMessage;
	isLoading?: boolean;
}

// Typing animation hook
function useTypingAnimation(text: string, isActive: boolean, speed = 20) {
	const [displayedText, setDisplayedText] = useState('');
	const [isComplete, setIsComplete] = useState(false);

	useEffect(() => {
		if (!isActive || !text) {
			setDisplayedText(text);
			setIsComplete(true);
			return;
		}

		setDisplayedText('');
		setIsComplete(false);
		let index = 0;

		const interval = setInterval(() => {
			if (index < text.length) {
				setDisplayedText(text.slice(0, index + 1));
				index++;
			} else {
				setIsComplete(true);
				clearInterval(interval);
			}
		}, speed);

		return () => clearInterval(interval);
	}, [text, isActive, speed]);

	return { displayedText, isComplete };
}

export function MessageItem({ message, isLoading }: MessageItemProps) {
	const isUser = message.role === 'user';
	const [shouldAnimate, setShouldAnimate] = useState(false);

	// Extract text content from parts
	const textContent = message.parts
		?.filter((part) => part.type === 'text')
		.map((part) => (part as { type: 'text'; text: string }).text)
		.join('');

	// Enable animation only for new assistant messages
	useEffect(() => {
		if (!isUser && textContent && !isLoading) {
			setShouldAnimate(true);
		}
	}, [isUser, textContent, isLoading]);

	const { displayedText, isComplete } = useTypingAnimation(
		textContent || '',
		shouldAnimate && !isUser,
	);

	if (isLoading) {
		return (
			<div className={styles.assistantMessage}>
				<div className={styles.avatar}>
					<IoChatbubble size={14} />
				</div>
				<div className={styles.assistantBubble}>
					<div className={styles.loadingDots}>
						<div className={styles.dot} />
						<div className={styles.dot} />
						<div className={styles.dot} />
					</div>
				</div>
			</div>
		);
	}

	// Extract tool parts using isToolUIPart
	const toolParts = message.parts?.filter((part) => isToolUIPart(part));

	return (
		<div className={isUser ? styles.userMessage : styles.assistantMessage}>
			<div className={isUser ? styles.userAvatar : styles.avatar}>
				{isUser ? <IoPerson size={16} /> : <IoChatbubble size={14} />}
			</div>
			<div className={isUser ? styles.userBubble : styles.assistantBubble}>
				{textContent && (
					<div>
						{isUser ? (
							textContent
						) : (
							<>
								<span className={styles.typingText}>{displayedText}</span>
								{!isComplete && <span className={styles.typingCursor} />}
							</>
						)}
					</div>
				)}

				{toolParts?.map((part) => {
					if (!isToolUIPart(part)) return null;
					if (part.state !== 'output-available') return null;

					const result = part.output as
						| Array<{
								id: string;
								title?: string;
								description?: string;
								url: string;
						  }>
						| undefined;

					if (!Array.isArray(result) || result.length === 0) return null;

					// Extract tool name from part.type (e.g., "tool-searchBlog" -> "searchBlog")
					const toolName =
						'toolName' in part
							? (part.toolName as string)
							: part.type.replace('tool-', '');

					return (
						<div key={part.toolCallId} className={styles.toolResult}>
							<div className={styles.toolResultTitle}>
								{toolName === 'searchBlog' && '📝 관련 블로그'}
								{toolName === 'searchPlaces' && '📍 관련 장소'}
								{toolName === 'searchPhotos' && '📸 관련 사진'}
							</div>
							{result.slice(0, 3).map((item) => (
								<div key={item.id} className={styles.toolResultItem}>
									<Link href={item.url} className={styles.toolResultLink}>
										{item.title || item.description || `ID: ${item.id}`}
									</Link>
								</div>
							))}
						</div>
					);
				})}
			</div>
		</div>
	);
}
