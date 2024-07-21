import { Button, Typography } from '@jung/design-system/components';

interface Props {
	isMenuOpen: boolean;
	toggleMenu: () => void;
}

const MenuButton = ({ isMenuOpen, toggleMenu }: Props) => (
	<Button
		variant='ghost'
		onClick={toggleMenu}
		aria-expanded={isMenuOpen}
		aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
	>
		<Typography.Text
			level={1}
			color={{ base: isMenuOpen ? 'white' : 'primary', hover: 'primary200' }}
		>
			{isMenuOpen ? 'close.' : 'menu.'}
		</Typography.Text>
	</Button>
);

export default MenuButton;
