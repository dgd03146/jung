'use client';

import { Button } from '@jung/design-system/components';
import { useThrottle } from '@jung/shared/hooks';
import { useFormStatus } from 'react-dom';
import type { GuestbookEmoji } from '@/fsd/entities/guestbook/model/guestbook';

interface CreateMessageButtonProps {
	emoji: GuestbookEmoji;
}

const getButtonText = (pending: boolean, isThrottled: boolean) => {
	if (pending) return 'Posting...';
	if (isThrottled) return 'Please wait...';
	return 'Post';
};

export const CreateMessageButton = ({ emoji }: CreateMessageButtonProps) => {
	const { pending } = useFormStatus();
	const isThrottled = useThrottle(pending);
	const isDisabled = pending || isThrottled;

	return (
		<Button
			type='submit'
			variant='secondary'
			fontSize={{ base: 'sm', tablet: 'base' }}
			fontWeight='medium'
			borderRadius='lg'
			flexShrink={0}
			loading={isDisabled}
			disabled={isDisabled}
			suffix={`${emoji}`}
		>
			{getButtonText(pending, isThrottled)}
		</Button>
	);
};
