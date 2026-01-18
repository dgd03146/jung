'use client';

import { Box, Textarea } from '@jung/design-system/components';
import { SocialLoginButtons } from '@/fsd/features/auth';
import * as styles from './CreateCommentForm.css';

interface GuestCommentFormProps {
	isReply?: boolean;
}

export const GuestCommentForm = ({
	isReply = false,
}: GuestCommentFormProps) => {
	return (
		<Box
			className={
				isReply ? styles.nestedCommentContainer : styles.commentContainer
			}
			marginBottom='4'
		>
			<Textarea
				borderRadius='md'
				fontSize='sm'
				placeholder='Sign in to write a comment'
				disabled
				rows={4}
			/>
			<SocialLoginButtons />
		</Box>
	);
};
