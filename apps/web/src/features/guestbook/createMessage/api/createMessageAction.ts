'use server';

import { cookies } from 'next/headers';
import type { GuestbookColor, GuestbookEmoji } from '@/fsd/entities/guestbook';
import { validateGuestbookMessage } from '@/fsd/features/guestbook/createMessage/lib/validateGuestbookMessage';
import { getCaller } from '@/fsd/shared/api/trpc/server';

type CreateMessageState = {
	success?: boolean;
	error?: string;
};

const THROTTLE_TIME = 2000;

export async function createMessageAction(
	_prevState: CreateMessageState | null,
	formData: FormData,
): Promise<CreateMessageState> {
	try {
		const cookieStore = await cookies();
		const lastSubmitTime = cookieStore.get('last-submit-time')?.value;
		const currentTime = Date.now();

		if (
			lastSubmitTime &&
			currentTime - Number(lastSubmitTime) < THROTTLE_TIME
		) {
			return {
				success: false,
				error: 'Please try again later.',
			};
		}

		const content = formData.get('message') as string;
		const emoji = formData.get('emoji') as GuestbookEmoji;
		const backgroundColor = formData.get('backgroundColor') as GuestbookColor;
		const userId = formData.get('userId') as string;

		const validationResult = validateGuestbookMessage(
			content,
			emoji,
			backgroundColor,
		);
		if (!validationResult.isValid) {
			return {
				success: false,
				error: validationResult.error,
			};
		}

		await getCaller().guestbook.createMessage({
			content: content.trim(),
			emoji,
			backgroundColor,
			userId,
		});

		cookieStore.set('last-submit-time', currentTime.toString(), {
			maxAge: THROTTLE_TIME / 2000,
		});

		return {
			success: true,
		};
	} catch (error) {
		return {
			success: false,
			error: error instanceof Error ? error.message : 'Failed to post message.',
		};
	}
}
