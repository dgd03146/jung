import {
	MESSAGE_MAX_LENGTH,
	MESSAGE_MIN_LENGTH,
} from '@/fsd/entities/guestbook';

type ValidationResult = {
	isValid: boolean;
	error?: string;
};

export const validateGuestbookMessage = (
	content: string | null | undefined,
	emoji: string | null | undefined,
	backgroundColor: string | null | undefined,
): ValidationResult => {
	if (!content?.trim()) {
		return {
			isValid: false,
			error: 'Please enter a message.',
		};
	}

	const messageLength = content.trim().length;
	if (messageLength < MESSAGE_MIN_LENGTH) {
		return {
			isValid: false,
			error: `Message must be at least ${MESSAGE_MIN_LENGTH} characters.`,
		};
	}

	if (messageLength > MESSAGE_MAX_LENGTH) {
		return {
			isValid: false,
			error: `Message must be less than ${MESSAGE_MAX_LENGTH} characters.`,
		};
	}

	if (!emoji) {
		return {
			isValid: false,
			error: 'Please select an emoji.',
		};
	}

	if (!backgroundColor) {
		return {
			isValid: false,
			error: 'Please select a background color.',
		};
	}

	return { isValid: true };
};
