import { SocialLogin } from '@/fsd/features/auth';
import { Box, Stack, Typography } from '@jung/design-system';
import * as styles from './MessagePrompt.css';

interface MessagePromptProps {
	title?: string;
	description?: string;
}

export const MessagePrompt = ({
	title = 'Please sign in to leave a message',
	description = 'Share your thoughts with others by signing in',
}: MessagePromptProps) => {
	return (
		<Box className={styles.container}>
			<Stack align='center' gap='10'>
				<Typography.Heading level={4} color='primary'>
					{title}
				</Typography.Heading>
				<Typography.Text level={4} color='primary100'>
					{description}
				</Typography.Text>
				<SocialLogin />
			</Stack>
		</Box>
	);
};
