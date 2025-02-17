import { SOCIAL_NAVIGATION } from '@/fsd/shared/config';
import { Box, Flex, Typography } from '@jung/design-system/components';
import { BiLogoGmail } from 'react-icons/bi';
import { FaLinkedin } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { logo } from '../../Header/ui/Navbar.css';

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
			paddingY='4'
			width='full'
			height='18'
			maxWidth='11/12'
			marginX='auto'
		>
			<Flex justifyContent='space-between' alignItems='center'>
				<Typography.Text level={2} color='primary' className={logo}>
					ⓒ 2025. Jung. All rights reserved.
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
							<Typography.Heading
								level={5}
								color={{ base: 'primary', hover: 'primary200' }}
								transition='slow'
							>
								<Icon />
							</Typography.Heading>
						</Box>
					))}
				</Flex>
			</Flex>
		</Box>
	);
};

export default Footer;
