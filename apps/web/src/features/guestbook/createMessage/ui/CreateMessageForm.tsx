'use client';

import { Button, Flex, Stack, Textarea } from '@jung/design-system/components';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { GUESTBOOK_COLORS, GUESTBOOK_EMOJIS } from '@/fsd/entities/guestbook';
import { useSupabaseAuth } from '@/fsd/shared';
import { useCreateAnonymousMessageMutation } from '../model/useCreateAnonymousMessageMutation';
import { useCreateMessage } from '../model/useCreateMessage';
import { CreateMessageButton } from './CreateMessageButton';
import * as styles from './CreateMessageForm.css';

export const CreateMessageForm = () => {
	const t = useTranslations('guestbook');
	const { user } = useSupabaseAuth();
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

	const isLoggedIn = !!user;

	const handleAnonymousSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!nickname.trim()) {
			return;
		}

		if (!message.trim()) {
			return;
		}

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
			action={isLoggedIn ? handleSubmit : undefined}
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
				<Flex wrap='wrap' gap='2'>
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

				<Flex wrap='wrap' gap='2'>
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
							{t('nickname')}
						</label>
						<input
							id='guestbook-nickname'
							type='text'
							value={nickname}
							onChange={(e) => setNickname(e.target.value)}
							placeholder={t('nicknamePlaceholder')}
							maxLength={20}
							className={styles.nicknameInput}
						/>
					</Stack>
				)}

				<Textarea
					name='message'
					value={message}
					onChange={(e) => handleMessageChange(e.target.value)}
					placeholder={t('messagePlaceholder')}
					maxLength={50}
					rows={2}
					className={styles.textarea({
						backgroundColor: selectedColor,
					})}
				/>

				<Flex justifyContent='flex-end'>
					{isLoggedIn ? (
						<CreateMessageButton emoji={selectedEmoji} />
					) : (
						<Button
							type='submit'
							variant='primary'
							disabled={
								!nickname.trim() ||
								!message.trim() ||
								createAnonymousMutation.isPending
							}
						>
							{createAnonymousMutation.isPending
								? t('submitting')
								: `${selectedEmoji} ${t('submit')}`}
						</Button>
					)}
				</Flex>
			</Stack>
		</form>
	);
};
