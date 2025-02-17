import { Typography } from '@jung/design-system/components';

import { Box, Flex } from '@jung/design-system/components';
import type { User } from '@supabase/supabase-js';
import { getUserDisplayName } from '../model/getUserDisplayName';
import * as styles from './UserInfo.css';

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
					<img src={avatarUrl} alt='Profile' className={styles.avatar} />
				</Box>
			)}
			<Typography.Text level={3} color='primary' fontWeight='medium'>
				{displayName}
			</Typography.Text>
		</Flex>
	);
};
