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
					Failed to load table
				</Typography.Heading>
			</Flex>
			<Typography.Text color='gray400' marginBottom='4'>
				{error.message}
			</Typography.Text>
			<Button onClick={resetErrorBoundary} rounded size='lg'>
				Try again
			</Button>
		</Box>
	);
};

export default ErrorFallback;
