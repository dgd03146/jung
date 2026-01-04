import { Box } from '@jung/design-system/components';
import * as listStyles from './MessageList.css';
import * as styles from './MessageListSkeleton.css';

const MessageCardSkeleton = () => {
	return (
		<div className={styles.messageCardSkeleton}>
			<Box className={styles.messageEmoji} />
			<Box display='flex' gap='2' marginBottom='5'>
				<Box className={styles.avatar} />
				<Box display='flex' flexDirection='column' gap='1'>
					<Box
						width='24'
						height='5'
						className={styles.skeletonItem}
						borderRadius='md'
					/>
					<Box
						width='16'
						height='3'
						className={styles.skeletonItem}
						borderRadius='md'
					/>
				</Box>
			</Box>

			<Box display='flex' flexDirection='column' gap='2'>
				<Box
					width='full'
					height='4'
					className={styles.skeletonItem}
					borderRadius='md'
				/>
				<Box
					width='2/3'
					height='4'
					className={styles.skeletonItem}
					borderRadius='md'
				/>
				<Box
					width='2/3'
					height='4'
					className={styles.skeletonItem}
					borderRadius='md'
				/>
			</Box>
		</div>
	);
};

export const MessageListSkeleton = ({ count = 6 }: { count?: number }) => {
	return (
		<Box
			display='grid'
			gap='4'
			paddingY='4'
			marginX='auto'
			className={listStyles.messageListContainer}
		>
			{Array.from({ length: count }).map((_, index) => (
				<MessageCardSkeleton key={index} />
			))}
		</Box>
	);
};
