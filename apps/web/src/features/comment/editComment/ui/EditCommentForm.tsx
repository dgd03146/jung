'use client';

import {
	Box,
	Button,
	Flex,
	Textarea,
	useToast,
} from '@jung/design-system/components';
import { useState } from 'react';
import { useUpdateComment } from '../model/useUpdateComment';
import * as styles from './EditCommentForm.css';

interface EditCommentFormProps {
	commentId: string;
	initialContent: string;
	targetId: string;
	onSuccess?: () => void;
}

export const EditCommentForm = ({
	commentId,
	initialContent,
	targetId,
	onSuccess,
}: EditCommentFormProps) => {
	const showToast = useToast();
	const [content, setContent] = useState(initialContent);
	const updateComment = useUpdateComment();

	const handleSubmit = async () => {
		if (!content || content.trim() === '') {
			showToast('Please enter a comment.', 'error');
			return;
		}

		await updateComment(commentId, content, targetId);
		onSuccess?.();
	};

	return (
		<Box className={styles.commentContainer} marginBottom='4'>
			<Flex gap='4' alignItems='flex-start'>
				<Box flex={1}>
					<Textarea
						fontSize='xs'
						borderRadius='md'
						value={content}
						onChange={(e) => setContent(e.target.value)}
						rows={3}
						placeholder='Edit your comment'
					/>
					<Flex justifyContent='flex-end' gap='3' marginTop='3'>
						<Button
							variant='outline'
							borderRadius='md'
							fontSize='xs'
							onClick={onSuccess}
						>
							Cancel
						</Button>
						<Button
							variant='primary'
							borderRadius='md'
							fontSize='xs'
							onClick={handleSubmit}
						>
							Update
						</Button>
					</Flex>
				</Box>
			</Flex>
		</Box>
	);
};
