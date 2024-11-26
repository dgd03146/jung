import { SocialLogin, signOut } from '@/fsd/features/auth';
import { Box, Button, Flex, Typography } from '@jung/design-system';

import { createClientForServer } from '@/fsd/shared/index.server';
import * as styles from './page.css';

export default async function LoginPage() {
	const supabase = createClientForServer();
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (session) {
		return (
			<Box className={styles.container}>
				<div className={styles.card}>
					<Flex direction='column' align='center' gap='8'>
						<Flex direction='column' align='center' gap='4'>
							{session.user.user_metadata.avatar_url && (
								<Box className={styles.avatarWrapper}>
									<img
										src={session.user.user_metadata.avatar_url}
										alt='Profile'
										className={styles.avatar}
									/>
								</Box>
							)}
							<Flex direction='column' align='center' gap='2'>
								<Typography.Text level={3} color='primary200'>
									Welcome back
								</Typography.Text>
								<Typography.Heading level={4} color='primary'>
									{session.user.user_metadata.name}
								</Typography.Heading>
							</Flex>
						</Flex>

						<form action={signOut}>
							<Button
								type='submit'
								variant='ghost'
								boxShadow='secondary'
								color='primary'
								rounded
							>
								Sign out
							</Button>
						</form>
					</Flex>
				</div>
			</Box>
		);
	}

	return (
		<Box className={styles.container}>
			<div className={styles.card}>
				<Flex direction='column' align='center' gap={{ mobile: '6', tv: '8' }}>
					<Flex direction='column' align='center' gap='8'>
						<Typography.Heading level={3} color='primary' textAlign='center'>
							Welcome to Jung's
						</Typography.Heading>
						<Typography.Text
							level={3}
							color='primary200'
							className={styles.subtitle}
						>
							Sign in with your social account
						</Typography.Text>
					</Flex>

					<Box className={styles.socialLoginWrapper}>
						<SocialLogin />
					</Box>

					<Typography.SubText
						level={3}
						color='primary100'
						className={styles.footer}
					>
						Your email will not be displayed. Only nickname and profile picture
						will be visible.
					</Typography.SubText>
				</Flex>
			</div>
		</Box>
	);
}
