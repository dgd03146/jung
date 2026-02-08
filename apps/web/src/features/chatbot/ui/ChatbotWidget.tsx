'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useState } from 'react';
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

	const { messages, sendMessage, status } = useChat({
		transport: new DefaultChatTransport({ api: '/api/chat' }),
		messages: INITIAL_MESSAGES,
	});

	const isLoading = status === 'submitted' || status === 'streaming';

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (input.trim()) {
			sendMessage({ text: input });
			setInput('');
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInput(e.target.value);
	};

	const handleQuickAction = (text: string) => {
		sendMessage({ text });
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
				onQuickAction={handleQuickAction}
			/>
		</>
	);
}
