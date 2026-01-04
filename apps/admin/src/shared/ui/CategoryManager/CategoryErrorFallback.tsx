import { Container, Stack, Typography } from '@jung/design-system/components';
import { MESSAGES } from '@/fsd/shared';

export function CategoryErrorFallback(error: Error) {
	return (
		<Container centerContent padding='4' background='white'>
			<Stack gap='4' textAlign='center' padding='8'>
				<Typography.Text color='error' fontWeight='semibold'>
					{MESSAGES.BLOG.CATEGORIES.ERROR}
				</Typography.Text>
				<Typography.Text color='secondary100' fontSize='sm'>
					{error.message}
				</Typography.Text>
			</Stack>
		</Container>
	);
}
