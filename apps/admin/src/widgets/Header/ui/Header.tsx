import { usePathname } from '@/fsd/shared';
// FIXME: icons들 다 나중에 shared로 빼야할 듯?
import { getPageTitle } from '@/fsd/shared';
import { Box, Flex, Stack, Typography } from '@jung/design-system/components';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { IoNotificationsOutline } from 'react-icons/io5';
import { IoSearch } from 'react-icons/io5';

import me from '@/fsd/assets/me.png';

const Header = () => {
	const { pathname } = usePathname();
	const pageTitle = getPageTitle(pathname);

	return (
		<Box as='header' position='sticky' top={0} height='18'>
			<Flex justify='space-between'>
				<Stack space={'1'} align={'left'}>
					<Typography.Heading level={3}>{`${pageTitle}`}</Typography.Heading>
					<Typography.SubText level={2} color='gray100'>
						26th Aug 2024
					</Typography.SubText>
				</Stack>

				<Flex alignItems='center' columnGap='6'>
					<Flex
						alignItems='center'
						columnGap='4'
						boxShadow='primary'
						borderRadius='2xl'
						paddingX='4'
						paddingY='1'
						height='full'
					>
						<IoChatbubbleEllipsesOutline size={20} />
						<IoNotificationsOutline size={20} />
						<IoSearch size={20} />
					</Flex>
					<Flex
						alignItems='center'
						columnGap='3'
						boxShadow='primary'
						borderRadius='2xl'
						paddingX='4'
						paddingY='1'
						height='full'
					>
						{/* FIXME: 로그인 되엇을대만 */}
						<Box as='img' src={me} alt='Profile Image' width='8' height='8' />
						<Typography.Text level={3}>jung</Typography.Text>
					</Flex>
				</Flex>
			</Flex>
		</Box>
	);
};

export default Header;
