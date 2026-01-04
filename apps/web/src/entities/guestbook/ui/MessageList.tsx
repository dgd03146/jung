import { Box } from '@jung/design-system/components';
import type { GuestbookMessage } from '@jung/shared/types';
import { EmptyMessageWall } from './EmptyMessageWall';
import { MessageCard } from './MessageCard';
import * as styles from './MessageList.css';

interface MessageListProps {
	messages: GuestbookMessage[];
}

export const MessageList = ({ messages }: MessageListProps) => {
	if (!messages || messages.length === 0) {
		return <EmptyMessageWall />;
	}

	return (
		<Box
			display='grid'
			gap='4'
			paddingY='4'
			marginX='auto'
			className={styles.messageListContainer}
		>
			{messages.map((message, index) => (
				<MessageCard key={message.id} message={message} index={index} />
			))}
		</Box>
	);
};
