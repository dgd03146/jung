'use client';

import { Button } from '@jung/design-system/components';
import { useState } from 'react';
import { FaRegComment } from 'react-icons/fa';
import { CreateCommentForm } from '../../createComment/ui/CreateCommentForm';

interface ReplyCommentButtonProps {
	commentId: string;
	postId: string;
	postTitle: string;
	canShow: boolean;
}

export const ReplyCommentButton = ({
	commentId,
	postId,
	postTitle,
	canShow,
}: ReplyCommentButtonProps) => {
	const [isReplying, setIsReplying] = useState(false);

	if (!canShow) return null;

	if (isReplying) {
		return (
			<CreateCommentForm
				postId={postId}
				postTitle={postTitle}
				parentId={commentId}
				isReply={true}
				onCancel={() => setIsReplying(false)}
			/>
		);
	}

	return (
		<Button variant='ghost' fontSize='xxs' onClick={() => setIsReplying(true)}>
			<FaRegComment size={12} style={{ marginRight: '4px' }} />
			Reply
		</Button>
	);
};
