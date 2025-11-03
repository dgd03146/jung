'use client';

import { useSupabaseAuth } from '@/fsd/shared';
import { Button, Flex, Stack, Textarea } from '@jung/design-system/components';

import { GUESTBOOK_COLORS, GUESTBOOK_EMOJIS } from '@/fsd/entities/guestbook';
import { SocialLoginButtons } from '@/fsd/features/auth';
import { useCreateMessage } from '../model/useCreateMessage';
import { CreateMessageButton } from './CreateMessageButton';
import * as styles from './CreateMessageForm.css';

export const CreateMessageForm = () => {
	const { user } = useSupabaseAuth();
	const {
		message,
		selectedEmoji,
		selectedColor,
		handleMessageChange,
		handleEmojiSelect,
		handleColorSelect,
		handleSubmit,
	} = useCreateMessage();

	const isLoggedIn = !!user;

	return (
		<form
			action={isLoggedIn ? handleSubmit : undefined}
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
							} ${!isLoggedIn ? styles.disabled : ''}`}
							onClick={() => isLoggedIn && handleEmojiSelect(emoji)}
							disabled={!isLoggedIn}
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
							} ${!isLoggedIn ? styles.disabled : ''}`}
							style={{ backgroundColor: color }}
							onClick={() => isLoggedIn && handleColorSelect(color)}
							aria-label={`Select color ${color}`}
							disabled={!isLoggedIn}
						/>
					))}
				</Flex>
			</Stack>

			<Stack gap='2' marginTop='4'>
				<Textarea
					name='message'
					value={message}
					onChange={(e) => isLoggedIn && handleMessageChange(e.target.value)}
					placeholder={
						isLoggedIn
							? 'Write your message here!'
							: 'Sign in to write a message'
					}
					maxLength={50}
					rows={2}
					disabled={!isLoggedIn}
					className={styles.textarea({
						backgroundColor: isLoggedIn ? selectedColor : '#FFFFFF',
					})}
				/>

				{isLoggedIn ? (
					<Flex justifyContent='flex-end'>
						<CreateMessageButton emoji={selectedEmoji} />
					</Flex>
				) : (
					<SocialLoginButtons />
				)}
			</Stack>
		</form>
	);
};
