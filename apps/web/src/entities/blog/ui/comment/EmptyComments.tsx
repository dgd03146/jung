import { Flex, Text } from '@jung/design-system';
import { BsChatDots } from 'react-icons/bs';
import * as styles from './EmptyComments.css';

export const EmptyComments = () => {
	return (
		<Flex
			justify='center'
			align='center'
			className={styles.emptyCommentsContent}
		>
			<BsChatDots className={styles.emptyCommentsIcon} />
			<Text className={styles.emptyCommentsPrimaryText}>No comments yet.</Text>
			<Text className={styles.emptyCommentsSecondaryText}>
				Be the first to comment!
			</Text>
		</Flex>
	);
};
