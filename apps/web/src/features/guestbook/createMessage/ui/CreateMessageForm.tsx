'use client';

import {
	Button,
	Flex,
	Stack,
	Textarea,
	useToast,
} from '@jung/design-system/components';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { SiKakaotalk } from 'react-icons/si';
import { VscGithub } from 'react-icons/vsc';
import {
	GUESTBOOK_COLORS,
	GUESTBOOK_EMOJIS,
	MESSAGE_MAX_LENGTH,
	NICKNAME_MAX_LENGTH,
} from '@/fsd/entities/guestbook';
import { useSocialLogin } from '@/fsd/features/auth';
import { useSupabaseAuth, useTrackEvent } from '@/fsd/shared';
import { useCreateAnonymousMessageMutation } from '../model/useCreateAnonymousMessageMutation';
import { useCreateMessage } from '../model/useCreateMessage';
import { CreateMessageButton } from './CreateMessageButton';
import * as styles from './CreateMessageForm.css';

export const CreateMessageForm = () => {
	const showToast = useToast();
	const { user } = useSupabaseAuth();
	const { handleSocialLogin } = useSocialLogin();
	const pathname = usePathname();
	const [nickname, setNickname] = useState('');
	const {
		message,
		selectedEmoji,
		selectedColor,
		handleMessageChange,
		handleEmojiSelect,
		handleColorSelect,
		handleSubmit,
	} = useCreateMessage();

	const createAnonymousMutation = useCreateAnonymousMessageMutation();
	const { trackEvent } = useTrackEvent();

	const isLoggedIn = !!user;

	const handleAnonymousSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!nickname.trim()) {
			showToast('Please enter a nickname', 'warning');
			return;
		}

		if (!message.trim()) {
			showToast('Please enter a message', 'warning');
			return;
		}

		trackEvent({
			event_name: 'create_guestbook_message',
			event_category: 'engagement',
			resource_type: 'guestbook',
			properties: { is_anonymous: true },
		});

		createAnonymousMutation.mutate(
			{
				content: message,
				backgroundColor: selectedColor,
				emoji: selectedEmoji,
				nickname: nickname.trim(),
			},
			{
				onSuccess: () => {
					handleMessageChange('');
					setNickname('');
				},
			},
		);
	};

	return (
		<form
			action={
				isLoggedIn
					? (formData: FormData) => {
							trackEvent({
								event_name: 'create_guestbook_message',
								event_category: 'engagement',
								resource_type: 'guestbook',
							});
							handleSubmit(formData);
						}
					: undefined
			}
			onSubmit={!isLoggedIn ? handleAnonymousSubmit : undefined}
			className={styles.form}
		>
			{isLoggedIn && (
				<>
					<input type='hidden' name='userId' value={user.id} />
					<input type='hidden' name='emoji' value={selectedEmoji} />
					<input type='hidden' name='backgroundColor' value={selectedColor} />
				</>
			)}

			<Stack space='6'>
				<Flex wrap='wrap' gap='1.5'>
					{GUESTBOOK_EMOJIS.map((emoji) => (
						<Button
							key={emoji}
							type='button'
							className={`${styles.emojiButton} ${
								selectedEmoji === emoji ? styles.emojiButtonSelected : ''
							}`}
							onClick={() => handleEmojiSelect(emoji)}
						>
							{emoji}
						</Button>
					))}
				</Flex>

				<Flex wrap='wrap' gap='1.5'>
					{GUESTBOOK_COLORS.map((color) => (
						<Button
							key={color}
							type='button'
							className={`${styles.colorButton} ${
								selectedColor === color ? styles.colorButtonSelected : ''
							}`}
							style={{ backgroundColor: color }}
							onClick={() => handleColorSelect(color)}
							aria-label={`Select color ${color}`}
						/>
					))}
				</Flex>
			</Stack>

			<Stack gap='2' marginTop='4'>
				{!isLoggedIn && (
					<Stack gap='1'>
						<label
							htmlFor='guestbook-nickname'
							className={styles.anonymousLabel}
						>
							Nickname
						</label>
						<input
							id='guestbook-nickname'
							type='text'
							value={nickname}
							onChange={(e) => setNickname(e.target.value)}
							placeholder='Enter your nickname'
							maxLength={NICKNAME_MAX_LENGTH}
							className={styles.nicknameInput}
						/>
					</Stack>
				)}

				<Textarea
					name='message'
					value={message}
					onChange={(e) => handleMessageChange(e.target.value)}
					placeholder='Leave a message!'
					maxLength={MESSAGE_MAX_LENGTH}
					rows={2}
					className={styles.textarea({
						backgroundColor: selectedColor,
					})}
				/>

				<Flex justifyContent='flex-end' align='center' gap='1.5'>
					{!isLoggedIn && (
						<Flex align='center' gap='1' marginRight='1'>
							<button
								type='button'
								className={styles.socialIconButton}
								onClick={() =>
									handleSocialLogin('google', { redirectTo: pathname })
								}
								aria-label='Sign in with Google'
							>
								<FcGoogle size={16} />
							</button>
							<button
								type='button'
								className={styles.socialIconButton}
								onClick={() =>
									handleSocialLogin('kakao', { redirectTo: pathname })
								}
								aria-label='Sign in with Kakao'
							>
								<SiKakaotalk size={14} />
							</button>
							<button
								type='button'
								className={styles.socialIconButton}
								onClick={() =>
									handleSocialLogin('github', { redirectTo: pathname })
								}
								aria-label='Sign in with GitHub'
							>
								<VscGithub size={14} />
							</button>
						</Flex>
					)}
					{isLoggedIn ? (
						<CreateMessageButton emoji={selectedEmoji} />
					) : (
						<button
							type='submit'
							className={styles.postButton}
							disabled={
								!nickname.trim() ||
								!message.trim() ||
								createAnonymousMutation.isPending
							}
						>
							{createAnonymousMutation.isPending
								? 'Posting...'
								: `Post ${selectedEmoji}`}
						</button>
					)}
				</Flex>
			</Stack>
		</form>
	);
};
