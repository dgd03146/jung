import { usePathname } from '@/fsd/shared';
// FIXME: icons들 다 나중에 shared로 빼야할 듯?
import { getPageTitle } from '@/fsd/shared';
import { Box, Flex, Typography } from '@jung/design-system/components';
import { useCallback, useEffect, useState } from 'react';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { IoNotificationsOutline } from 'react-icons/io5';
import { IoSearch } from 'react-icons/io5';

const SCROLL_THRESHOLD = 50;

const Header = () => {
	const { pathname } = usePathname();
	const pageTitle = getPageTitle(pathname);
	const [isScrolled, setIsScrolled] = useState(false);

	const handleScroll = useCallback(() => {
		if (!isScrolled && window.scrollY > SCROLL_THRESHOLD) {
			setIsScrolled(true);
		} else if (isScrolled && window.scrollY <= SCROLL_THRESHOLD) {
			setIsScrolled(false);
		}
	}, [isScrolled]);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [handleScroll]);

	return (
		<Box
			as='header'
			position='sticky'
			top={0}
			background='white200'
			opacity={isScrolled ? 90 : 100}
			paddingX={{ mobile: '4', laptop: '8' }}
			display='flex'
			width='full'
			justifyContent='space-between'
			alignItems='center'
			paddingY='6'
		>
			<Typography.Heading
				level={3}
				color='primary'
			>{`${pageTitle}`}</Typography.Heading>

			<Flex alignItems='center' columnGap='4' color='primary'>
				<Flex
					alignItems='center'
					boxShadow='primary'
					borderRadius='2xl'
					paddingX='2'
					paddingY='1'
					height='full'
				>
					<IoChatbubbleEllipsesOutline size={20} />
				</Flex>
				<Flex
					alignItems='center'
					boxShadow='primary'
					borderRadius='2xl'
					paddingX='2'
					paddingY='2'
					height='full'
				>
					<IoNotificationsOutline size={20} />
				</Flex>
				<Flex
					alignItems='center'
					boxShadow='primary'
					borderRadius='2xl'
					paddingX='2'
					paddingY='2'
					height='full'
				>
					<IoSearch size={20} />
				</Flex>
				{/* <Flex
            alignItems="center"
            columnGap="3"
            boxShadow="primary"
            borderRadius="2xl"
            paddingX="4"
            paddingY="2"
            height="full"
          >
           
            <Box as="img" src={me} alt="Profile Image" width="8" height="8" />
            <Typography.Text level={3}>jung</Typography.Text>
          </Flex> */}
			</Flex>
		</Box>
	);
};

export default Header;
