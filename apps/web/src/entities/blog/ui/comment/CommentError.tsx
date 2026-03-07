import { Typography } from '@jung/design-system/components';
import { FiAlertCircle } from 'react-icons/fi';
import * as styles from './CommentError.css';

interface CommentErrorProps {
	error: Error;
	onRetry?: () => void;
}

const CommentError = ({ error, onRetry }: CommentErrorProps) => (
	<div className={styles.errorContainer}>
		<div className={styles.iconWrapper}>
			<FiAlertCircle size={18} />
		</div>
		<Typography.SubText level={2} color='gray200'>
			Something went wrong loading comments
		</Typography.SubText>
		{process.env.NODE_ENV === 'development' && (
			<div className={styles.errorMessage}>{error.message}</div>
		)}
		{onRetry && (
			<div>
				<button type='button' onClick={onRetry} className={styles.retryButton}>
					Try again
				</button>
			</div>
		)}
	</div>
);

export default CommentError;
