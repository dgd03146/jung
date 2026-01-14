'use client';

import { AnimatePresence } from 'motion/react';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useScrollLock } from '@/fsd/shared';
import { Menu } from '../../Menu/ui';
import Navbar from './Navbar';

type Props = {
	variant?: 'light' | 'dark';
};

const Header = ({ variant = 'light' }: Props) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = useCallback(() => {
		setIsMenuOpen((prev) => !prev);
	}, []);

	const pathname = usePathname();

	useEffect(() => {
		if (pathname) {
			setIsMenuOpen(false);
		}
	}, [pathname]);

	useScrollLock(isMenuOpen);

	return (
		<>
			<Navbar
				isMenuOpen={isMenuOpen}
				toggleMenu={toggleMenu}
				variant={variant}
			/>
			<AnimatePresence mode='wait'>
				{isMenuOpen && <Menu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />}
			</AnimatePresence>
		</>
	);
};

export default Header;
