import { Box } from '@jung/design-system/components';
import * as listStyles from './MessageList.css';
import * as styles from './MessageListSkeleton.css';

const SKELETON_COLORS = [
	'#FFFFFF',
	'#FFF3E0',
	'#E8F5E9',
	'#E3F2FD',
	'#F3E5F5',
	'#FFF8E1',
	'#E0F7FA',
];

const MessageCardSkeleton = ({ colorIndex }: { colorIndex: number }) => {
	return (
		<div
			className={styles.messageCardSkeleton}
			style={{
				background: SKELETON_COLORS[colorIndex % SKELETON_COLORS.length],
			}}
		>
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
				<MessageCardSkeleton key={index} colorIndex={index} />
			))}
		</Box>
	);
};
