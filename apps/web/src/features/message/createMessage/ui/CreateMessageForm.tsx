import { useSupabaseAuth } from '@/fsd/shared';

import { Button, Flex, Stack, Textarea } from '@jung/design-system';

import {
	GUESTBOOK_COLORS,
	GUESTBOOK_EMOJIS,
	MessagePrompt,
} from '@/fsd/entities/message';
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

	if (!user) {
		return <MessagePrompt />;
	}

	return (
		<form action={handleSubmit} className={styles.form}>
			<input type='hidden' name='userId' value={user.id} />
			<input type='hidden' name='emoji' value={selectedEmoji} />
			<input type='hidden' name='backgroundColor' value={selectedColor} />

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
			<Stack space='4'>
				<Textarea
					name='message'
					value={message}
					onChange={(e) => handleMessageChange(e.target.value)}
					placeholder='Write your message here... (max 50 characters)'
					maxLength={50}
					rows={3}
					className={styles.textarea({
						backgroundColor: selectedColor,
					})}
				/>
				<CreateMessageButton emoji={selectedEmoji} />
			</Stack>
		</form>
	);
};
