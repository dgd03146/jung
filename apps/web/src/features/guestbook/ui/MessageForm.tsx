'use client';

import { SocialLogin } from '@/fsd/features/auth';
import { useSupabaseAuth } from '@/fsd/shared';
import { useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { useOptimisticCreateMessage } from '../model/useOptimisticCreateMessage';
import * as styles from './MessageForm.css';

import {
	Box,
	Button,
	Flex,
	Stack,
	Textarea,
	Typography,
} from '@jung/design-system/components';
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
		<Button
			type='submit'
			size='md'
			fontWeight='medium'
			borderRadius='lg'
			disabled={pending || isThrottled}
		>
			{pending
				? 'Posting...'
				: isThrottled
				  ? 'Please wait...'
				  : `Post ${emoji}`}
		</Button>
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
			<Box className={styles.loginContainer}>
				<Stack align='center' gap='10'>
					<Typography.Heading level={4} color='primary'>
						Please sign in to leave a message
					</Typography.Heading>
					<Typography.Text level={4} color='primary100'>
						Share your thoughts with others by signing in
					</Typography.Text>
					<SocialLogin />
				</Stack>
			</Box>
		);
	}

	return (
		<form action={handleSubmit} className={styles.form}>
			<input type='hidden' name='userId' value={user.id} />
			<input type='hidden' name='emoji' value={selectedEmoji} />
			<input type='hidden' name='backgroundColor' value={selectedColor} />

			<Flex
				align='center'
				gap='2'
				background='white100'
				padding='2'
				marginBottom='6'
				borderRadius='lg'
			>
				<img
					src={user.user_metadata.avatar_url}
					alt={user.user_metadata.full_name}
					className={styles.avatar}
					loading='lazy'
				/>
				<Typography.Text level={4}>
					{user.user_metadata.full_name}
				</Typography.Text>
			</Flex>
			<Stack space='6'>
				<Flex wrap='wrap' gap='2'>
					{GUESTBOOK_EMOJIS.map((emoji) => (
						<Button
							key={emoji}
							type='button'
							className={`${styles.emojiButton} ${
								selectedEmoji === emoji ? styles.emojiButtonSelected : ''
							}`}
							onClick={() => setSelectedEmoji(emoji)}
						>
							{emoji}
						</Button>
					))}
				</Flex>
				<Flex wrap='wrap' gap='2'>
					{GUESTBOOK_COLORS.map((color) => (
						<Button
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
				</Flex>
			</Stack>
			<Box position='relative' marginTop='4'>
				<Textarea
					name='message'
					value={message}
					rows={3}
					onChange={(e) => setMessage(e.target.value)}
					placeholder='Write your message here... (max 50 characters)'
					maxLength={50}
					className={styles.textarea({
						backgroundColor: selectedColor,
					})}
				/>
				<Box className={styles.submitButtonWrapper}>
					<SubmitButton emoji={selectedEmoji} />
				</Box>
			</Box>
		</form>
	);
};
