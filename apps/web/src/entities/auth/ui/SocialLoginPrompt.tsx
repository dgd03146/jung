import { Stack } from '@jung/design-system/components';
import type { ReactNode } from 'react';
import { AppLogo } from '@/fsd/shared';

export const SocialLoginPrompt = ({ actions }: { actions: ReactNode }) => {
	return (
		<Stack align='center' gap={{ base: '4', laptop: '6' }}>
			<Stack align='center' gap='2'>
				<AppLogo />
				{actions && actions}
			</Stack>
			{/* <Box display={{ base: 'none', tablet: 'block' }}>
				<Typography.FootNote as='p' level={1}>
					🔵 Google sign-in shows your email (before '@') & profile picture
				</Typography.FootNote>
				<Typography.FootNote as='p' level={1}>
					🔵 GitHub and Kakao show your nickname & profile picture
				</Typography.FootNote>
			</Box> */}
		</Stack>
	);
};
