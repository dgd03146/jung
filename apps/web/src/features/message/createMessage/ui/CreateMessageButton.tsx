'use client';

import type { GuestbookEmoji } from '@/fsd/entities/message/model/guestbook';
import { Button } from '@jung/design-system/components';
import { useThrottle } from '@jung/shared/hooks';

// @ts-ignore
import { useFormStatus } from 'react-dom';

interface CreateMessageButtonProps {
	emoji: GuestbookEmoji;
}

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
			{isDisabled ? 'Posting...' : isThrottled ? 'Please wait...' : 'Post'}
		</Button>
	);
};
