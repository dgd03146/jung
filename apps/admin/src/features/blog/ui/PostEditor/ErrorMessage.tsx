import { Box } from '@jung/design-system/components';
import type React from 'react';
import * as styles from './ErrorMessage.css';

interface ErrorMessageProps {
	message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
	<Box className={styles.errorMessage}>{message}</Box>
);

export default ErrorMessage;
