import { Box, Button, Flex, Typography } from '@jung/design-system';
import { FiAlertTriangle } from 'react-icons/fi';
import * as styles from './CommentError.css';

interface CommentErrorProps {
	error: Error;
	onRetry?: () => void;
}

const CommentError = ({ error, onRetry }: CommentErrorProps) => (
	<Box className={styles.errorContainer}>
		<Flex alignItems='center' marginBottom='3' gap='2'>
			<Box className={styles.errorAvatar}>
				<FiAlertTriangle className={styles.errorIcon} size={24} />
			</Box>
			<Flex direction='column'>
				<Typography.SubText level={2} color='error'>
					Error Occurred
				</Typography.SubText>
				<Typography.FootNote level={1} color='gray100'>
					An issue occurred while processing the comment
				</Typography.FootNote>
			</Flex>
		</Flex>
		<Box className={styles.errorContent}>
			{process.env.NODE_ENV === 'development' && (
				<Typography.Text className={styles.errorMessage}>
					{error.message}
				</Typography.Text>
			)}
			{onRetry && (
				<Box className={styles.retryButtonContainer}>
					<Button onClick={onRetry} className={styles.retryButton}>
						Try Again
					</Button>
				</Box>
			)}
		</Box>
	</Box>
);

export default CommentError;
