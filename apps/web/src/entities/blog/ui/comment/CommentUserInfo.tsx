import { Flex, Typography } from '@jung/design-system/components';
import Image from 'next/image';
import { IoPerson } from 'react-icons/io5';
import { formatRelativeTime } from '@/fsd/shared';
import * as styles from './CommentUserInfo.css';

const AVATAR_SIZE = 32;

interface CommentUserInfoProps {
	avatarUrl?: string | null;
	userName: string;
	createdAt: string;
}

export const CommentUserInfo = ({
	avatarUrl,
	userName,
	createdAt,
}: CommentUserInfoProps) => (
	<Flex gap='2' align='center' marginBottom='2'>
		{avatarUrl ? (
			<Image
				src={avatarUrl}
				alt={userName}
				width={AVATAR_SIZE}
				height={AVATAR_SIZE}
				className={styles.userAvatar}
			/>
		) : (
			<div className={styles.defaultAvatar}>
				<IoPerson size={16} />
			</div>
		)}
		<Flex direction='column'>
			<Typography.FootNote level={1}>{userName}</Typography.FootNote>
			<Typography.FootNote level={2} color='gray100'>
				{formatRelativeTime(createdAt)}
			</Typography.FootNote>
		</Flex>
	</Flex>
);
