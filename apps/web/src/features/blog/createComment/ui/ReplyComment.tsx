'use client';

import { Button } from '@jung/design-system/components';
import { useState } from 'react';
import { CreateCommentForm } from './CreateCommentForm';

interface ReplyCommentProps {
	postId: string;
	postTitle: string;
	parentId: string;
	canShowReplyButton: boolean;
	onReplySuccess?: () => void;
}

export const ReplyComment = ({
	postId,
	postTitle,
	parentId,
	canShowReplyButton,
	onReplySuccess,
}: ReplyCommentProps) => {
	const [isReplying, setIsReplying] = useState(false);

	if (!canShowReplyButton) {
		return null;
	}

	const handleReplyStart = () => {
		setIsReplying(true);
	};

	const handleReplyEnd = () => {
		setIsReplying(false);
		onReplySuccess?.();
	};

	if (isReplying) {
		return (
			<CreateCommentForm
				postId={postId}
				postTitle={postTitle}
				parentId={parentId}
				isReply={true}
				onSuccess={handleReplyEnd}
			/>
		);
	}

	return (
		<Button variant='ghost' size='sm' onClick={handleReplyStart}>
			Reply
		</Button>
	);
};
