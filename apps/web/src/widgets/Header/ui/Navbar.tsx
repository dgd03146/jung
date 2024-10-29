'use client';

import { Box, Flex, Typography } from '@jung/design-system/components';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import MenuButton from './MenuButton';
import * as styles from './Navbar.css';

type Props = {
	isMenuOpen: boolean;
	toggleMenu: () => void;
};

const SCROLL_THRESHOLD = 50;

const Navbar = ({ isMenuOpen, toggleMenu }: Props) => {
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
		return () => window.removeEventListener('scroll', handleScroll);
	}, [handleScroll]);

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
				justifyContent={isMenuOpen ? 'flex-end' : 'space-between'}
				alignItems='center'
				marginX='auto'
				maxWidth='11/12'
				className={styles.navContent}
			>
				{!isMenuOpen && (
					<Link href='/' className={styles.logoWrapper({ isScrolled })}>
						<Typography.Text
							level={1}
							color='primary'
							className={styles.logo({
								isMenuOpen,
								isScrolled,
							})}
						>
							jung.
						</Typography.Text>
					</Link>
				)}
				<Box className={styles.menuButtonWrapper}>
					<MenuButton isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
				</Box>
			</Flex>
		</Box>
	);
};

export default Navbar;
