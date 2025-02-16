'use client';

import { BlurImage } from '@/fsd/shared';
import { Box, Button, Flex, Stack, Typography } from '@jung/design-system';
import type { Session } from '@supabase/supabase-js';
import logo from '/public/images/og/default.png';
import { signOut } from '../api';
import { getUserDisplayName } from '../lib/getUserDisplayName';
import * as styles from './LoginContent.css';
import { SocialLogin } from './SocialLogin';

interface LoginContentProps {
	session: Session | null;
}

export function LoginContent({ session }: LoginContentProps) {
	if (session) {
		const displayName = getUserDisplayName(session.user);

		return (
			<Flex direction='column' align='center' gap='2'>
				<BlurImage
					src={logo}
					alt="Jung's logo"
					width={200}
					height={200}
					priority
					quality={100}
				/>
				<Flex
					align='center'
					gap='2'
					boxShadow='primary'
					paddingY='2'
					paddingX='4'
					borderRadius='lg'
				>
					{session.user.user_metadata.avatar_url && (
						<Box className={styles.avatarWrapper}>
							<img
								src={session.user.user_metadata.avatar_url}
								alt='Profile'
								className={styles.avatar}
							/>
						</Box>
					)}
					<Typography.Text level={3} color='primary' fontWeight='medium'>
						{displayName}
					</Typography.Text>
				</Flex>

				<form action={signOut}>
					<Button
						marginTop='4'
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
		<Stack align='center' gap={{ mobile: '6', tv: '8' }}>
			<Stack align='center' gap='2'>
				<BlurImage
					src={logo}
					alt="Jung's logo"
					width={200}
					height={200}
					priority
				/>
				<Typography.Text level={2} color='black100' fontWeight='medium'>
					Sign in with your social account
				</Typography.Text>
			</Stack>

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
		</Stack>
	);
}
