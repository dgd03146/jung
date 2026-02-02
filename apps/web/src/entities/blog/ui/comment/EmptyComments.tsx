'use client';

import { Flex, Text } from '@jung/design-system';
import { useTranslations } from 'next-intl';
import { BsChatDots } from 'react-icons/bs';
import * as styles from './EmptyComments.css';

export const EmptyComments = () => {
	const t = useTranslations('empty');

	return (
		<Flex
			justify='center'
			align='center'
			className={styles.emptyCommentsContent}
		>
			<BsChatDots className={styles.emptyCommentsIcon} />
			<Text className={styles.emptyCommentsPrimaryText}>{t('comments')}</Text>
			<Text className={styles.emptyCommentsSecondaryText}>
				{t('commentsFirst')}
			</Text>
		</Flex>
	);
};
