import { SOCIAL_NAVIGATION } from '@/src/app';
import { Box, Flex, Typography } from '@jung/design-system/components';
import Link from 'next/link';
import { FaLinkedin } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa';

const Footer = () => {
	return (
		<Box
			as='footer'
			paddingY='4'
			width='full'
			height='18'
			maxWidth='11/12'
			marginX='auto'
			position='sticky'
			bottom={0}
			zIndex='10'
		>
			<Flex justifyContent='space-between' alignItems='center'>
				<Typography.SubText level={2} color='primary'>
					ⓒ 2024. jung. All rights reserved.
				</Typography.SubText>

				<Flex columnGap='4'>
					<Link href={SOCIAL_NAVIGATION.LINKEDIN}>
						<Typography.SubText
							level={2}
							color={{ base: 'primary', hover: 'primary200' }}
						>
							<FaLinkedin size='1.5rem' />
						</Typography.SubText>
					</Link>
					<Link href={SOCIAL_NAVIGATION.GITHUB}>
						<Typography.SubText
							level={2}
							color={{ base: 'primary', hover: 'primary200' }}
						>
							<FaGithub size='1.5rem' />
						</Typography.SubText>
					</Link>
					<Link href={SOCIAL_NAVIGATION.YOUTUBE}>
						<Typography.SubText
							level={2}
							color={{ base: 'primary', hover: 'primary200' }}
						>
							<FaYoutube size='1.5rem' />
						</Typography.SubText>
					</Link>
				</Flex>
			</Flex>
		</Box>
	);
};

export default Footer;
