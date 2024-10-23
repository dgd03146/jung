import { Box, Flex, Typography } from '@jung/design-system/components';
import { FiAlertTriangle } from 'react-icons/fi';
import * as styles from './CommentError.css';

interface CommentErrorProps {
	error: Error;
}

const CommentError = ({ error }: CommentErrorProps) => (
	<Box className={styles.errorContainer}>
		<Flex align='center'>
			<FiAlertTriangle className={styles.errorIcon} />
			<Typography.Text className={styles.errorText}>
				An error occurred while processing the comment: {error.message}
			</Typography.Text>
		</Flex>
	</Box>
);

export default CommentError;
