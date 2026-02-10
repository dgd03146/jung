'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useCallback, useMemo, useRef, useState } from 'react';
import { ChatButton } from './ChatButton';
import { ChatWindow } from './ChatWindow';

const INITIAL_MESSAGES = [
	{
		id: 'welcome',
		role: 'assistant' as const,
		content: '안녕하세요! 무엇이든 물어보세요 🙌',
		parts: [
			{ type: 'text' as const, text: '안녕하세요! 무엇이든 물어보세요 🙌' },
		],
	},
];

export function ChatbotWidget() {
	const [isOpen, setIsOpen] = useState(false);
	const [input, setInput] = useState('');

	const transport = useMemo(
		() => new DefaultChatTransport({ api: '/api/chat' }),
		[],
	);

	const { messages, sendMessage, status } = useChat({
		transport,
		messages: INITIAL_MESSAGES,
	});

	const isLoading = status === 'submitted' || status === 'streaming';

	const COOLDOWN_MS = 3000;
	const lastSentRef = useRef(0);
	const [isCooldown, setIsCooldown] = useState(false);

	const canSend = useCallback(() => {
		return Date.now() - lastSentRef.current >= COOLDOWN_MS;
	}, []);

	const startCooldown = useCallback(() => {
		setIsCooldown(true);
		setTimeout(() => setIsCooldown(false), COOLDOWN_MS);
	}, []);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (input.trim() && canSend()) {
			lastSentRef.current = Date.now();
			sendMessage({ text: input });
			setInput('');
			startCooldown();
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInput(e.target.value);
	};

	const handleQuickAction = (text: string) => {
		if (canSend()) {
			lastSentRef.current = Date.now();
			sendMessage({ text });
			startCooldown();
		}
	};

	const toggle = () => setIsOpen((prev) => !prev);
	const close = () => setIsOpen(false);

	return (
		<>
			<ChatButton isOpen={isOpen} onClick={toggle} />
			<ChatWindow
				isOpen={isOpen}
				onClose={close}
				messages={messages}
				input={input}
				handleInputChange={handleInputChange}
				handleSubmit={handleSubmit}
				isLoading={isLoading}
				isCooldown={isCooldown}
				onQuickAction={handleQuickAction}
			/>
		</>
	);
}
