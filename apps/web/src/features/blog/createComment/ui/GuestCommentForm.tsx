'use client';

import { Box, Textarea } from '@jung/design-system/components';
import { useTranslations } from 'next-intl';
import { SocialLoginButtons } from '@/fsd/features/auth';
import * as styles from './CreateCommentForm.css';

interface GuestCommentFormProps {
	isReply?: boolean;
}

export const GuestCommentForm = ({
	isReply = false,
}: GuestCommentFormProps) => {
	const t = useTranslations('auth');

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
				placeholder={t('signInToComment')}
				disabled
				rows={4}
			/>
			<SocialLoginButtons />
		</Box>
	);
};
