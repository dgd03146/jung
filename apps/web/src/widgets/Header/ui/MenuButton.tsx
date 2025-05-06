import { Button, Typography } from '@jung/design-system/components';

import * as styles from './MenuButton.css';

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
		display={{ base: 'block', tablet: 'none' }}
	>
		<Typography.Heading
			level={4}
			className={styles.menuButtonText({ isMenuOpen })}
		>
			{isMenuOpen ? 'CLOSE' : 'MENU'}
		</Typography.Heading>
	</Button>
);

export default MenuButton;
