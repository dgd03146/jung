'use client';

import { AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu } from '../../Menu/ui';
import Navbar from './Navbar';

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen((prev) => !prev);
	};

	const pathname = usePathname();

	useEffect(() => {
		pathname && setIsMenuOpen(false);
	}, [pathname]);

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
