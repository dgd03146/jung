'use client';

import { AppLogo } from '@/fsd/shared';
import { Box, Flex } from '@jung/design-system/components';
import Link from 'next/link';
import { useScrollDetection } from '../model/useScrollDetection';
import MenuButton from './MenuButton';
import * as styles from './Navbar.css';

type Props = {
	isMenuOpen: boolean;
	toggleMenu: () => void;
};

const SCROLL_THRESHOLD = 50;

const Navbar = ({ isMenuOpen, toggleMenu }: Props) => {
	const isScrolled = useScrollDetection(SCROLL_THRESHOLD);

	return (
		<Box
			as='header'
			position='sticky'
			width='full'
			top={0}
			zIndex={isMenuOpen ? '20' : '10'}
			className={styles.headerContainer({
				isScrolled,
				isMenuOpen,
			})}
		>
			<Flex
				justifyContent='space-between'
				alignItems='center'
				marginX='auto'
				maxWidth='11/12'
				className={styles.navContent}
			>
				<Link href='/' className={styles.logoWrapper}>
					<AppLogo width={80} height={80} />
				</Link>

				<Box className={styles.menuButtonWrapper}>
					<MenuButton isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
				</Box>
			</Flex>
		</Box>
	);
};

export default Navbar;
