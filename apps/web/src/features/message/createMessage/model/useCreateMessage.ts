import {
	DEFAULT_BACKGROUND_COLOR,
	DEFAULT_EMOJI,
	type GuestbookColor,
	type GuestbookEmoji,
} from '@/fsd/entities/message';
import { useState } from 'react';
import { useOptimisticCreateMessage } from './useOptimisticCreateMessage';

export const useCreateMessage = () => {
	const [message, setMessage] = useState('');
	const [selectedEmoji, setSelectedEmoji] =
		useState<GuestbookEmoji>(DEFAULT_EMOJI);
	const [selectedColor, setSelectedColor] = useState<GuestbookColor>(
		DEFAULT_BACKGROUND_COLOR,
	);

	const createMessage = useOptimisticCreateMessage();

	const handleMessageChange = (value: string) => {
		setMessage(value);
	};

	const handleEmojiSelect = (emoji: GuestbookEmoji) => {
		setSelectedEmoji(emoji);
	};

	const handleColorSelect = (color: GuestbookColor) => {
		setSelectedColor(color);
	};

	const handleSubmit = async (formData: FormData) => {
		const success = await createMessage(formData);

		if (success) {
			setMessage('');
			setSelectedEmoji(DEFAULT_EMOJI);
			setSelectedColor(DEFAULT_BACKGROUND_COLOR);
		}
	};

	return {
		message,
		selectedEmoji,
		selectedColor,

		handleMessageChange,
		handleEmojiSelect,
		handleColorSelect,
		handleSubmit,
	};
};
