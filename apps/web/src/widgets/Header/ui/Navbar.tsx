'use client';

import { Box, Flex, Typography } from '@jung/design-system/components';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import MenuButton from './MenuButton';

type Props = {
	isMenuOpen: boolean;
	toggleMenu: () => void;
};

const SCROLL_THRESHOLD = 50;

const Navbar = ({ isMenuOpen, toggleMenu }: Props) => {
	const [isScrolled, setIsScrolled] = useState(false);

	// FIXME: SHARED WORKSPACE 훅으로 빼도 될듯?
	const handleScroll = useCallback(() => {
		if (!isScrolled && window.scrollY > SCROLL_THRESHOLD) {
			setIsScrolled(true);
		} else if (isScrolled && window.scrollY <= SCROLL_THRESHOLD) {
			setIsScrolled(false);
		}
	}, [isScrolled]);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [handleScroll]);

	return (
		<Box
			as='header'
			position='sticky'
			paddingY='4'
			height='18'
			width='full'
			background='white'
			opacity={isScrolled ? 70 : 100}
			top={0}
			zIndex={isMenuOpen ? '20' : '10'}
		>
			<Flex
				justifyContent={isMenuOpen ? 'flex-end' : 'space-between'}
				alignItems='center'
				marginX='auto'
				maxWidth='11/12'
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
