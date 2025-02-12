'use client';

import { Box, Flex } from '@jung/design-system/components';
import Image from 'next/image';
import Link from 'next/link';
import logo from '/public/images/og/default.png';
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
				justifyContent={isMenuOpen ? 'flex-end' : 'space-between'}
				alignItems='center'
				marginX='auto'
				maxWidth='11/12'
				className={styles.navContent}
			>
				{!isMenuOpen && (
					<Link href='/' className={styles.logoWrapper({ isScrolled })}>
						<Image
							src={logo}
							alt='logo'
							width={80}
							height={80}
							quality={100}
							priority
						/>
						{/* <Typography.Heading
							level={5}
							color={{ base: 'primary', hover: 'primary200' }}
							transition='slow'
							className={styles.logo}
						>
							JUNG
						</Typography.Heading> */}
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
