import type { GuestbookEmoji } from '@/fsd/entities/message/model/guestbook';
import { Button } from '@jung/design-system';
import { useThrottle } from '@jung/shared/hooks';
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
			size='md'
			fontWeight='medium'
			borderRadius='lg'
			disabled={isDisabled}
		>
			{isDisabled
				? 'Posting...'
				: isThrottled
				  ? 'Please wait...'
				  : `Post ${emoji}`}
		</Button>
	);
};
