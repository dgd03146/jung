import { SocialLogin } from '@/fsd/features/auth';
import { Box, Typography } from '@jung/design-system';
import * as styles from './MessagePrompt.css';

interface MessagePromptProps {
	title?: string;
	description?: string;
}

export const MessagePrompt = ({
	description = 'Leave your message by signing in',
}: MessagePromptProps) => {
	return (
		<Box className={styles.container}>
			<Typography.Text level={3} color='primary'>
				{description}
			</Typography.Text>
			<SocialLogin />
		</Box>
	);
};
