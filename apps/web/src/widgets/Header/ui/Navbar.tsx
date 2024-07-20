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
			paddingY='4'
			width='full'
			maxWidth='11/12'
			marginX='auto'
			top={0}
			left={0}
			zIndex={isMenuOpen ? '20' : '10'}
		>
			<Flex
				justifyContent={isMenuOpen ? 'flex-end' : 'space-between'}
				alignItems='center'
			>
				{!isMenuOpen && (
					<Link href='/'>
						<Typography.Text
							level={1}
							color={{
								base: isMenuOpen ? 'white' : 'primary',
								hover: 'primary200',
							}}
						>
							jung.
						</Typography.Text>
					</Link>
				)}

				<MenuButton isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
			</Flex>
		</Box>
	);
};

export default Navbar;
