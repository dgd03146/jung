import { AppLogo } from '@/fsd/shared';
import { Box, Stack, Typography } from '@jung/design-system';
import type { ReactNode } from 'react';

export const SocialLoginPrompt = ({ actions }: { actions: ReactNode }) => {
	return (
		<Stack align='center' gap={{ mobile: '6', tv: '8' }}>
			<Stack align='center' gap='2'>
				<AppLogo />
				<Typography.Text level={2} color='black100' fontWeight='medium'>
					Sign in with your social account
				</Typography.Text>
			</Stack>
			{actions && actions}
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
};
