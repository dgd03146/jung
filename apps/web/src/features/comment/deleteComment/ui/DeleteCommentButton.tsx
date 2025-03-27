'use client';

import { Button } from '@jung/design-system/components';
import { FaTrash } from 'react-icons/fa';
import { useDeleteComment } from '../model/useDeleteComment';

interface DeleteCommentButtonProps {
	commentId: string;
	targetId: string;
}

export const DeleteCommentButton = ({
	commentId,
	targetId,
}: DeleteCommentButtonProps) => {
	const deleteComment = useDeleteComment();

	const handleDelete = () => {
		if (window.confirm('Are you sure you want to delete this comment?')) {
			console.log('deleteComment', commentId, targetId);
			deleteComment(commentId, targetId);
		}
	};

	return (
		<Button variant='ghost' fontSize='xxs' onClick={handleDelete}>
			<FaTrash size={12} style={{ marginRight: '4px' }} />
			Delete
		</Button>
	);
};
