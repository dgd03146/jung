import { Flex, Typography } from '@jung/design-system/components';
import Image from 'next/image';
import { formatRelativeTime } from '@/fsd/shared';
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
		<Image
			src={avatarUrl || '/images/default-avatar.png'}
			alt={userName}
			width={40}
			height={40}
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
