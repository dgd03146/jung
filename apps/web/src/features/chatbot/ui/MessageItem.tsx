'use client';

import { isToolUIPart, type UIMessage } from 'ai';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { IoChatbubble, IoPerson } from 'react-icons/io5';
import * as styles from './MessageItem.css';

interface MessageItemProps {
	message: UIMessage;
	isLoading?: boolean;
}

interface ToolOutputItem {
	id: string;
	title?: string;
	description?: string;
	url: string;
}

function isToolOutputItem(item: unknown): item is ToolOutputItem {
	return (
		typeof item === 'object' &&
		item !== null &&
		typeof (item as ToolOutputItem).id === 'string' &&
		typeof (item as ToolOutputItem).url === 'string'
	);
}

function isValidToolOutput(output: unknown): output is ToolOutputItem[] {
	return Array.isArray(output) && output.every(isToolOutputItem);
}

function getToolLabel(toolName: string): string {
	switch (toolName) {
		case 'searchBlog':
			return '📝 관련 블로그';
		case 'searchPlaces':
			return '📍 관련 장소';
		case 'searchPhotos':
			return '📸 관련 사진';
		case 'getProfile':
			return '👤 프로필';
		default:
			return '🔍 검색';
	}
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
	const hasAnimatedRef = useRef(false);

	// Extract text content from parts
	const textContent = message.parts
		?.filter((part) => part.type === 'text')
		.map((part) => (part as { type: 'text'; text: string }).text)
		.join('');

	// Determine if animation should run (only once per message)
	const shouldAnimate =
		!isUser && !!textContent && !isLoading && !hasAnimatedRef.current;

	// Mark as animated after first render with content
	if (shouldAnimate) {
		hasAnimatedRef.current = true;
	}

	const { displayedText, isComplete } = useTypingAnimation(
		textContent || '',
		shouldAnimate,
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

					const toolName =
						'toolName' in part
							? (part.toolName as string)
							: part.type.replace('tool-', '');
					const label = getToolLabel(toolName);

					if (part.state !== 'output-available') {
						return (
							<div key={part.toolCallId} className={styles.toolSearching}>
								<div className={styles.toolSearchingDot} />
								<span>{label} 검색 중...</span>
							</div>
						);
					}

					// Runtime type guard for tool output
					if (!isValidToolOutput(part.output) || part.output.length === 0) {
						return null;
					}
					const result = part.output;

					return (
						<div key={part.toolCallId} className={styles.toolResult}>
							<div className={styles.toolResultTitle}>{label}</div>
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
