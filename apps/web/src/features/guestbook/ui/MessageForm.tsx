'use client';

import { SocialLogin } from '@/fsd/features/auth';
import { useSupabaseAuth } from '@/fsd/shared';
import { useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { useOptimisticCreateMessage } from '../model/useOptimisticCreateMessage';
import * as styles from './MessageForm.css';

import {
	DEFAULT_BACKGROUND_COLOR,
	DEFAULT_EMOJI,
	GUESTBOOK_COLORS,
	GUESTBOOK_EMOJIS,
	type GuestbookColor,
	type GuestbookEmoji,
} from '../config';

function SubmitButton({ emoji }: { emoji: GuestbookEmoji }) {
	const { pending } = useFormStatus();
	const [isThrottled, setIsThrottled] = useState(false);

	useEffect(() => {
		if (pending) {
			const timer = setTimeout(() => {
				if (pending) {
					setIsThrottled(true);
					setTimeout(() => {
						setIsThrottled(false);
					}, 2000);
				}
			}, 500);

			return () => clearTimeout(timer);
		}
	}, [pending]);

	return (
		<button
			type='submit'
			className={styles.submitButton}
			disabled={pending || isThrottled}
		>
			{pending
				? 'Posting...'
				: isThrottled
				  ? 'Please wait...'
				  : `Post Message ${emoji}`}
		</button>
	);
}

export const MessageForm = () => {
	const [message, setMessage] = useState('');
	const [selectedEmoji, setSelectedEmoji] =
		useState<GuestbookEmoji>(DEFAULT_EMOJI);
	const [selectedColor, setSelectedColor] = useState<GuestbookColor>(
		DEFAULT_BACKGROUND_COLOR,
	);

	const { user } = useSupabaseAuth();
	const createMessage = useOptimisticCreateMessage();

	const handleSubmit = async (formData: FormData) => {
		const success = await createMessage(formData);
		if (success) {
			setMessage('');
			setSelectedEmoji(DEFAULT_EMOJI);
			setSelectedColor(DEFAULT_BACKGROUND_COLOR);
		}
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
		<form action={handleSubmit} className={styles.form}>
			<input type='hidden' name='userId' value={user.id} />
			<input type='hidden' name='emoji' value={selectedEmoji} />
			<input type='hidden' name='backgroundColor' value={selectedColor} />

			<div className={styles.userInfo}>
				<img
					src={user.user_metadata.avatar_url}
					alt={user.user_metadata.full_name}
					className={styles.avatar}
				/>
				<span>{user.user_metadata.full_name}</span>
			</div>
			<textarea
				name='message'
				value={message}
				onChange={(e) => setMessage(e.target.value)}
				placeholder='Write your message here... (max 50 characters)'
				maxLength={50}
				className={styles.textarea({
					backgroundColor: selectedColor,
				})}
			/>
			<div className={styles.formFooter}>
				<div className={styles.emojiPicker}>
					{GUESTBOOK_EMOJIS.map((emoji) => (
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
					{GUESTBOOK_COLORS.map((color) => (
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
				<SubmitButton emoji={selectedEmoji} />
			</div>
		</form>
	);
};
