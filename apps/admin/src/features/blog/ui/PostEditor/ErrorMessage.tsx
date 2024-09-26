import { Typography } from '@jung/design-system/components';
import type React from 'react';

interface ErrorMessageProps {
	message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
	<Typography.SubText color='error'>{message}</Typography.SubText>
);

export default ErrorMessage;
