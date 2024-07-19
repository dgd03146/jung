import { Box, Flex, Typography } from '@jung/design-system/components';
import Link from 'next/link';
import MenuButton from './MenuButton';

type Props = {
	isMenuOpen: boolean;
	toggleMenu: () => void;
};

const Navbar = ({ isMenuOpen, toggleMenu }: Props) => {
	return (
		<Box
			as='header'
			position='sticky'
			minHeight='24'
			height='24'
			paddingY='4'
			width='full'
			maxWidth='11/12'
			marginX='auto'
			top={0}
			left={0}
			zIndex={isMenuOpen ? '20' : '10'}
		>
			<Flex justifyContent='space-between' alignItems='center'>
				<Link href='/'>
					<Typography.Text level={1} color={isMenuOpen ? 'white' : 'primary'}>
						jung.
					</Typography.Text>
				</Link>
				<MenuButton isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
			</Flex>
		</Box>
	);
};

export default Navbar;
