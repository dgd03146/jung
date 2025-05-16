'use client';

import { useScrollLock } from '@/fsd/shared';
import { AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { Menu } from '../../Menu/ui';
import Navbar from './Navbar';

const Header = () => {
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
			<Navbar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
			<AnimatePresence mode='wait'>
				{isMenuOpen && <Menu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />}
			</AnimatePresence>
		</>
	);
};

export default Header;
