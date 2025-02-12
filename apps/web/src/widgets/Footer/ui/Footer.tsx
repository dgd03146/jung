import { SOCIAL_NAVIGATION } from '@/fsd/shared/config';
import { Box, Flex, Typography } from '@jung/design-system/components';
import Link from 'next/link';
import { BiLogoGmail } from 'react-icons/bi';
import { FaLinkedin } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { logo } from '../../Header/ui/Navbar.css';

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
				<Typography.Text level={3} color='primary' className={logo}>
					ⓒ 2025. Jung. All rights reserved.
				</Typography.Text>

				<Flex columnGap='4'>
					<Link href={SOCIAL_NAVIGATION.LINKEDIN}>
						<Typography.SubText
							level={2}
							color={{ base: 'primary', hover: 'primary200' }}
							transition='slow'
						>
							<FaLinkedin size='1.5rem' />
						</Typography.SubText>
					</Link>
					<Link href={SOCIAL_NAVIGATION.GITHUB}>
						<Typography.SubText
							level={2}
							color={{ base: 'primary', hover: 'primary200' }}
							transition='slow'
						>
							<FaGithub size='1.5rem' />
						</Typography.SubText>
					</Link>
					<Link href={SOCIAL_NAVIGATION.EMAIL}>
						<Typography.SubText
							level={2}
							color={{ base: 'primary', hover: 'primary200' }}
							transition='slow'
						>
							<BiLogoGmail size='1.5rem' />
						</Typography.SubText>
					</Link>
				</Flex>
			</Flex>
		</Box>
	);
};

export default Footer;
