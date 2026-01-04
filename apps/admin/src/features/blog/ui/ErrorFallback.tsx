import { Box, Button, Flex, Typography } from '@jung/design-system/components';
import type { FallbackProps } from 'react-error-boundary';
import { FiAlertTriangle } from 'react-icons/fi';

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
	return (
		<Box
			role='alert'
			padding='6'
			background='white'
			borderRadius='lg'
			boxShadow='primary'
		>
			<Flex alignItems='center' marginBottom='4' color='secondary'>
				<FiAlertTriangle size={24} color='error' />
				<Typography.Heading level={4} marginLeft='2'>
					{error.message}
				</Typography.Heading>
			</Flex>
			<Typography.Text color='gray300' marginBottom='4'>
				{error.code}
			</Typography.Text>
			<Button onClick={resetErrorBoundary} size='lg' borderRadius='lg'>
				Try again
			</Button>
		</Box>
	);
};

export default ErrorFallback;
