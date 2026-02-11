'use client';

import { AnimatePresence } from 'motion/react';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { GlobalSearchModal } from '@/fsd/features/globalSearch';
import { useScrollLock } from '@/fsd/shared';
import { Menu } from '../../Menu/ui';
import Navbar from './Navbar';

type Props = {
	variant?: 'light' | 'dark';
};

const Header = ({ variant = 'light' }: Props) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isSearchOpen, setIsSearchOpen] = useState(false);

	const toggleMenu = useCallback(() => {
		setIsMenuOpen((prev) => !prev);
	}, []);

	const openSearch = useCallback(() => setIsSearchOpen(true), []);
	const closeSearch = useCallback(() => setIsSearchOpen(false), []);
	const toggleSearch = useCallback(() => setIsSearchOpen((prev) => !prev), []);

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
				onSearchClick={openSearch}
				variant={variant}
			/>
			<AnimatePresence mode='wait'>
				{isMenuOpen && <Menu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />}
			</AnimatePresence>
			<GlobalSearchModal
				isOpen={isSearchOpen}
				onClose={closeSearch}
				onToggle={toggleSearch}
			/>
		</>
	);
};

export default Header;
