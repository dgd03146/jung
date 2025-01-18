import { Button, Typography } from '@jung/design-system/components';
import { logo } from './Navbar.css';

interface Props {
	isMenuOpen: boolean;
	toggleMenu: () => void;
}

const MenuButton = ({ isMenuOpen, toggleMenu }: Props) => (
	<Button
		variant='ghost'
		size='zero'
		onClick={toggleMenu}
		aria-expanded={isMenuOpen}
		aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
	>
		<Typography.Heading
			level={5}
			color={{ base: isMenuOpen ? 'white' : 'primary', hover: 'primary200' }}
			transition='slow'
			className={logo}
		>
			{isMenuOpen ? 'CLOSE' : 'MENU'}
		</Typography.Heading>
	</Button>
);

export default MenuButton;
