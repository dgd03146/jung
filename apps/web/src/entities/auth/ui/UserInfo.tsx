import { Box, Flex, Typography } from '@jung/design-system/components';
import type { User } from '@supabase/supabase-js';
import Image from 'next/image';
import { getUserDisplayName } from '@/fsd/shared';
import * as styles from './UserInfo.css';

const AVATAR_SIZE = 40;

export const UserInfo = ({ user }: { user: User }) => {
	const displayName = getUserDisplayName(user);

	const avatarUrl = user.user_metadata.avatar_url;

	return (
		<Flex
			align='center'
			gap='2'
			boxShadow='primary'
			paddingY='2'
			paddingX='4'
			borderRadius='lg'
		>
			{avatarUrl && (
				<Box className={styles.avatarWrapper}>
					<Image
						src={avatarUrl}
						alt='Profile'
						width={AVATAR_SIZE}
						height={AVATAR_SIZE}
						className={styles.avatar}
					/>
				</Box>
			)}
			<Typography.Text level={3} color='primary' fontWeight='medium'>
				{displayName}
			</Typography.Text>
		</Flex>
	);
};
