import { SocialLoginPrompt, UserInfo } from '@/fsd/entities/auth';
import { SocialLoginButtons, SocialLogoutButton } from '@/fsd/features/auth';
import { AppLogo } from '@/fsd/shared';
import { Box, Container, Flex } from '@jung/design-system/components';
import type { Session } from '@supabase/supabase-js';
import * as styles from './LoginPage.css';

export const LoginPage = ({ session }: { session: Session | null }) => {
	return (
		<Container className={styles.container}>
			<Box className={styles.card}>
				{session ? (
					<Flex direction='column' align='center' gap='2'>
						<AppLogo />
						<UserInfo user={session.user} />
						<SocialLogoutButton />
					</Flex>
				) : (
					<SocialLoginPrompt actions={<SocialLoginButtons />} />
				)}
			</Box>
		</Container>
	);
};
