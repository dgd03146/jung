export const MIN_LENGTH = 3;
export const MAX_LENGTH = 50;

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
	if (messageLength < MIN_LENGTH) {
		return {
			isValid: false,
			error: `Message must be at least ${MIN_LENGTH} characters.`,
		};
	}

	if (messageLength > MAX_LENGTH) {
		return {
			isValid: false,
			error: `Message must be less than ${MAX_LENGTH} characters.`,
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
