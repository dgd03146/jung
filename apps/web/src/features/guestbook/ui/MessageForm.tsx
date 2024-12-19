'use client';

import { SocialLogin } from '@/fsd/features/auth';
import { useSupabaseAuth } from '@/fsd/shared';
import { useState } from 'react';
import * as styles from './MessageForm.css';

const EMOJIS = ['💖', '✨', '👻', '🎉', '👋', '🙌', '💫', '💭', '💀', '👽'];
const COLORS = [
	'#FFFFFF',
	'#FFF3E0', // 연한 주황
	'#E8F5E9', // 연한 초록
	'#E3F2FD', // 연한 파랑
	'#F3E5F5', // 연한 보라
	'#FFF8E1', // 연한 노랑
	'#E0F7FA', // 연한 청록
] as const;

type ColorType = (typeof COLORS)[number];

export const MessageForm = () => {
	const [message, setMessage] = useState('');
	const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
	const [selectedColor, setSelectedColor] = useState<ColorType>(COLORS[0]);

	const { user } = useSupabaseAuth();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		// TODO: 메시지 저장 로직 구현
		console.log({ message, emoji: selectedEmoji });
		setMessage('');
		setSelectedEmoji(null);
	};

	if (!user) {
		return (
			<div className={styles.loginContainer}>
				<div className={styles.loginContent}>
					<h3>Please sign in to leave a message</h3>
					<p>Share your thoughts with others by signing in</p>
					<SocialLogin />
				</div>
			</div>
		);
	}

	return (
		<form onSubmit={handleSubmit} className={styles.form}>
			<div className={styles.userInfo}>
				<img
					src={user.user_metadata.avatar_url}
					alt={user.user_metadata.full_name}
					className={styles.avatar}
				/>
				<span>{user.user_metadata.full_name}</span>
			</div>
			<textarea
				value={message}
				onChange={(e) => setMessage(e.target.value)}
				placeholder='Write your message here... (max 200 characters)'
				maxLength={200}
				className={styles.textarea({
					backgroundColor: selectedColor,
				})}
			/>
			<div className={styles.formFooter}>
				<div className={styles.emojiPicker}>
					{EMOJIS.map((emoji) => (
						<button
							key={emoji}
							type='button'
							className={`${styles.emojiButton} ${
								selectedEmoji === emoji ? styles.emojiButtonSelected : ''
							}`}
							onClick={() => setSelectedEmoji(emoji)}
						>
							{emoji}
						</button>
					))}
				</div>
				<div className={styles.colorPicker}>
					{COLORS.map((color) => (
						<button
							key={color}
							type='button'
							className={`${styles.colorButton} ${
								selectedColor === color ? styles.colorButtonSelected : ''
							}`}
							style={{ backgroundColor: color }}
							onClick={() => setSelectedColor(color)}
							aria-label={`Select color ${color}`}
						/>
					))}
				</div>
				<button
					type='submit'
					className={styles.submitButton}
					disabled={!message.trim()}
				>
					Post Message {selectedEmoji}
				</button>
			</div>
		</form>
	);
};
