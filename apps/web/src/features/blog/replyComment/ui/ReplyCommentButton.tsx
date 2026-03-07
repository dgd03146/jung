'use client';

import { Button } from '@jung/design-system/components';
import { FaRegComment } from 'react-icons/fa';

interface ReplyCommentButtonProps {
	canShow: boolean;
	onReply: () => void;
}

export const ReplyCommentButton = ({
	canShow,
	onReply,
}: ReplyCommentButtonProps) => {
	if (!canShow) return null;

	return (
		<Button variant='ghost' fontSize='xxs' onClick={onReply}>
			<FaRegComment size={12} style={{ marginRight: '4px' }} />
			Reply
		</Button>
	);
};
