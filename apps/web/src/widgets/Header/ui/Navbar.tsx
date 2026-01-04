'use client';

import { Box, Flex, Typography } from '@jung/design-system/components';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PRIMARY_NAV_LIST } from '@/fsd/shared/config';
import { extractFirstMeaningfulSegment } from '@/fsd/shared/lib';
import { useScrollDetection } from '../model/useScrollDetection';
import MenuButton from './MenuButton';
import * as styles from './Navbar.css';

type Props = {
	isMenuOpen: boolean;
	toggleMenu: () => void;
};

const SCROLL_THRESHOLD = 50;

const Navbar = ({ isMenuOpen, toggleMenu }: Props) => {
	const isScrolled = useScrollDetection({ threshold: SCROLL_THRESHOLD });
	const pathname = usePathname();
	const currentSegment = extractFirstMeaningfulSegment(pathname);

	return (
		<Box
			as='header'
			position='sticky'
			width='full'
			// marginX='auto'
			className={styles.headerContainer({
				isScrolled,
				isMenuOpen,
			})}
		>
			<Flex
				justifyContent='space-between'
				alignItems='center'
				width={{
					base: 'tablet',
					tablet: 'tablet',
					laptop: 'laptop',
				}}
				marginX='auto'
				className={styles.navContent}
			>
				<Link href='/' className={styles.logoWrapper}>
					<Typography.Heading level={4}>JUNG</Typography.Heading>
				</Link>

				<Flex
					align='center'
					gap='2'
					display={{ base: 'none', tablet: 'flex' }}
					alignItems='center'
				>
					{PRIMARY_NAV_LIST.map((item) => {
						const isActive = `/${currentSegment}` === item.path;
						return (
							<Link
								href={item.path}
								key={item.id}
								className={styles.desktopNavLinkItem}
								data-active={isActive ? 'true' : undefined}
							>
								<Typography.Text level={1} className={styles.navLinkText}>
									{item.label}
								</Typography.Text>
							</Link>
						);
					})}
				</Flex>

				<Box className={styles.menuButtonWrapper}>
					<MenuButton isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
				</Box>
			</Flex>
		</Box>
	);
};

export default Navbar;
