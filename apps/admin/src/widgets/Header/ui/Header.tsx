import { usePathname } from '@/fsd/shared';
import { Box, Flex, Stack, Typography } from '@jung/design-system/components';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { IoNotificationsOutline } from 'react-icons/io5';
import { IoSearch } from 'react-icons/io5';
// FIXME: icons들 다 나중에 shared로 빼야할 듯?

import me from '@/fsd/assets/me.png';

const Header = () => {
	const { pathname } = usePathname();
	const pageTitle = pathname === '/' ? 'dashboard' : pathname;

	return (
		<Box as='header' position='sticky' top={0}>
			<Flex justify='space-between'>
				<Stack>
					<Typography.Heading level={3} color='primary'>
						{`${pageTitle}.`}
					</Typography.Heading>
					<Typography.SubText level={2} color='primary200'>
						26th Aug 2024
					</Typography.SubText>
				</Stack>

				<Flex alignItems='center' columnGap='6' color='primary'>
					<Flex
						alignItems='center'
						columnGap='4'
						boxShadow='primary'
						borderRadius='2xl'
						paddingX='4'
						paddingY='2'
						height='full'
					>
						<IoChatbubbleEllipsesOutline size={25} />
						<IoNotificationsOutline size={25} />
						<IoSearch size={25} />
					</Flex>
					<Flex
						alignItems='center'
						columnGap='3'
						boxShadow='primary'
						borderRadius='2xl'
						paddingX='4'
						paddingY='2'
						height='full'
					>
						<Box as='img' src={me} alt='Profile Image' width='8' height='8' />
						<Typography.Text level={3}>jung</Typography.Text>
					</Flex>
				</Flex>
			</Flex>
		</Box>
	);
};

export default Header;
