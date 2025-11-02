import { Box, Typography } from '@jung/design-system/components';
import * as styles from './MessagePrompt.css';

interface MessagePromptProps {
	description?: string;
	actions?: React.ReactNode;
}

export const MessagePrompt = ({
	description = 'Leave your message by signing in',
	actions,
}: MessagePromptProps) => {
	return (
		<Box className={styles.container}>
			<Typography.Text level={3} color='primary'>
				{description}
			</Typography.Text>
			{actions && actions}
		</Box>
	);
};
