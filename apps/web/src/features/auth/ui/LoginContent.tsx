'use client';

import { Box, Button, Flex, Typography } from '@jung/design-system';
import type { Session } from '@supabase/supabase-js';
import { signOut } from '../api';
import * as styles from './LoginContent.css';
import { SocialLogin } from './SocialLogin';

interface LoginContentProps {
	session: Session | null;
	next?: string;
}

export function LoginContent({ session, next }: LoginContentProps) {
	if (session) {
		return (
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
					<Flex direction='column' align='center' gap='4'>
						<Typography.Text level={3} color='primary200' fontWeight='medium'>
							Welcome Back 💙
						</Typography.Text>
						<Typography.Heading level={5} color='primary'>
							{session.user.user_metadata.name}
						</Typography.Heading>
					</Flex>
				</Flex>

				<form action={signOut}>
					<Button
						type='submit'
						boxShadow='secondary'
						size='md'
						borderRadius='lg'
					>
						Sign Out
					</Button>
				</form>
			</Flex>
		);
	}

	return (
		<Flex direction='column' align='center' gap={{ mobile: '6', tv: '8' }}>
			<Flex direction='column' align='center' gap='8'>
				<Typography.Heading
					level={1}
					color='primary'
					textAlign='center'
					className={styles.title}
				>
					JUNG'S
				</Typography.Heading>
				<Typography.Text level={2} color='black100' fontWeight='medium'>
					Sign in with your social account
				</Typography.Text>
			</Flex>

			<Box className={styles.socialLoginWrapper}>
				<SocialLogin />
			</Box>

			<Box textAlign='center'>
				<Typography.SubText level={2} color='black100'>
					Your email will not be displayed.
				</Typography.SubText>
				<Typography.SubText level={2} color='black100'>
					Only nickname and profile picture will be visible.
				</Typography.SubText>
			</Box>
		</Flex>
	);
}
