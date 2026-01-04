'use client';

import { Button } from '@jung/design-system/components';
import { useState } from 'react';
import { EditCommentForm } from './EditCommentForm';

interface EditCommentProps {
	commentId: string;
	initialContent: string;
	postId: string;
	isOwner: boolean;
	onEditSuccess?: () => void;
}

export const EditComment = ({
	commentId,
	initialContent,
	postId,
	isOwner,
	onEditSuccess,
}: EditCommentProps) => {
	const [isEditing, setIsEditing] = useState(false);

	if (!isOwner) {
		return null;
	}

	const handleEditStart = () => {
		setIsEditing(true);
	};

	const handleEditEnd = () => {
		setIsEditing(false);
		onEditSuccess?.();
	};

	if (isEditing) {
		return (
			<EditCommentForm
				commentId={commentId}
				initialContent={initialContent}
				postId={postId}
				onSuccess={handleEditEnd}
			/>
		);
	}

	return (
		<Button variant='ghost' size='sm' onClick={handleEditStart}>
			Edit
		</Button>
	);
};
