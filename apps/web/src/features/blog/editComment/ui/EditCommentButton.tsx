'use client';

import { Button } from '@jung/design-system/components';
import { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { EditCommentForm } from './EditCommentForm';

interface EditCommentButtonProps {
	commentId: string;
	initialContent: string;
	postId: string;
	canShow: boolean;
}

export const EditCommentButton = ({
	commentId,
	initialContent,
	postId,
	canShow,
}: EditCommentButtonProps) => {
	const [isEditing, setIsEditing] = useState(false);

	if (!canShow) return null;

	if (isEditing) {
		return (
			<EditCommentForm
				commentId={commentId}
				initialContent={initialContent}
				postId={postId}
				onSuccess={() => setIsEditing(false)}
				onCancel={() => setIsEditing(false)}
			/>
		);
	}

	return (
		<Button variant='ghost' fontSize='xxs' onClick={() => setIsEditing(true)}>
			<FaEdit size={12} style={{ marginRight: '4px' }} />
			Edit
		</Button>
	);
};
