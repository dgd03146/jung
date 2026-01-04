'use client';

import { Button } from '@jung/design-system/components';
import { FaTrash } from 'react-icons/fa';
import { useDeleteCommentMutation } from '../model/useDeleteCommentMutation';

interface DeleteCommentButtonProps {
	commentId: string;
	postId: string;
}

export const DeleteCommentButton = ({
	commentId,
	postId,
}: DeleteCommentButtonProps) => {
	const { mutate: deleteComment, isPending: isDeleting } =
		useDeleteCommentMutation();

	const handleDelete = () => {
		if (window.confirm('Are you sure you want to delete this comment?')) {
			deleteComment({ commentId, postId });
		}
	};

	return (
		<Button
			variant='ghost'
			fontSize='xxs'
			onClick={handleDelete}
			disabled={isDeleting}
			color='primary'
		>
			<FaTrash size={12} style={{ marginRight: '4px' }} />
			{isDeleting ? 'Deleting...' : 'Delete'}
		</Button>
	);
};
