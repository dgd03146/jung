import { formatRelativeTime } from '@/fsd/shared';
import { Box, Flex, Typography } from '@jung/design-system';
import * as styles from './CommentUserInfo.css';

interface CommentUserInfoProps {
	avatarUrl: string;
	userName: string;
	createdAt: string;
}

export const CommentUserInfo = ({
	avatarUrl,
	userName,
	createdAt,
}: CommentUserInfoProps) => (
	<Flex gap='2' align='center' marginBottom='3'>
		<Box
			as='img'
			loading='lazy'
			src={avatarUrl || ''}
			alt={userName}
			className={styles.userAvatar}
		/>
		<Flex direction='column'>
			<Typography.SubText level={2}>{userName}</Typography.SubText>
			<Typography.FootNote level={1} color='gray100'>
				{formatRelativeTime(createdAt)}
			</Typography.FootNote>
		</Flex>
	</Flex>
);
