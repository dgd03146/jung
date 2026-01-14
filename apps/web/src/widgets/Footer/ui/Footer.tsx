import { Box, Flex, Typography } from '@jung/design-system/components';
import { BiLogoGmail } from 'react-icons/bi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SOCIAL_NAVIGATION } from '@/fsd/shared/config';

import * as styles from './Footer.css';

const SOCIAL_LINKS = [
	{
		href: SOCIAL_NAVIGATION.LINKEDIN,
		icon: FaLinkedin,
		ariaLabel: 'Visit LinkedIn profile',
	},
	{
		href: SOCIAL_NAVIGATION.GITHUB,
		icon: FaGithub,
		ariaLabel: 'Visit GitHub profile',
	},
	{
		href: SOCIAL_NAVIGATION.EMAIL,
		icon: BiLogoGmail,
		ariaLabel: 'Send email',
	},
];

const Footer = () => {
	return (
		<Box
			as='footer'
			className={styles.footer}
			paddingY='4'
			width={{
				base: 'tablet',
				tablet: 'tablet',
				laptop: 'laptop',
			}}
			marginX='auto'
		>
			<Flex justifyContent='space-between' alignItems='center' height='full'>
				<Typography.Text
					level={2}
					color='primary'
					className={styles.footerText}
				>
					© 2026. Jung. All rights reserved.
				</Typography.Text>

				<Flex columnGap='4'>
					{SOCIAL_LINKS.map(({ href, icon: Icon, ariaLabel }) => (
						<Box
							key={href}
							as='a'
							href={href}
							target='_blank'
							rel='noopener noreferrer'
							role='link'
							aria-label={ariaLabel}
						>
							<Typography.Text
								level={1}
								color='primary'
								className={styles.socialIconText}
							>
								<Icon />
							</Typography.Text>
						</Box>
					))}
				</Flex>
			</Flex>
		</Box>
	);
};

export default Footer;
