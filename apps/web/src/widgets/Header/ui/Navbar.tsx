'use client';

import { Box, Flex } from '@jung/design-system/components';
import { IoSearchOutline } from 'react-icons/io5';
import { PRIMARY_NAV_LIST } from '@/fsd/shared/config';
import { extractFirstMeaningfulSegment } from '@/fsd/shared/lib';
import { LanguageSwitcher } from '@/fsd/shared/ui';
import { Link, usePathname } from '@/i18n/routing';
import { useScrollDetection } from '../model/useScrollDetection';
import MenuButton from './MenuButton';
import * as styles from './Navbar.css';

type Props = {
	isMenuOpen: boolean;
	toggleMenu: () => void;
	onSearchClick?: () => void;
	variant?: 'light' | 'dark';
};

const SCROLL_THRESHOLD = 50;

const Navbar = ({
	isMenuOpen,
	toggleMenu,
	onSearchClick,
	variant = 'light',
}: Props) => {
	const isScrolled = useScrollDetection({ threshold: SCROLL_THRESHOLD });
	const pathname = usePathname();
	const currentSegment = extractFirstMeaningfulSegment(pathname);

	return (
		<Box
			as='header'
			position='sticky'
			width='full'
			className={styles.headerContainer({
				isScrolled,
				isMenuOpen,
				variant,
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
				<Link href='/' className={styles.logoWrapper({ variant })}>
					JUNG.
				</Link>

				<Flex
					align='center'
					display={{ base: 'none', tablet: 'flex' }}
					alignItems='center'
					gap='2'
				>
					{PRIMARY_NAV_LIST.map((item) => {
						const isActive = `/${currentSegment}` === item.path;
						return (
							<Link
								href={item.path}
								key={item.id}
								className={styles.desktopNavLinkItem({ variant })}
								data-active={isActive ? 'true' : undefined}
							>
								<span className={styles.navLinkText({ variant })}>
									{item.label}
								</span>
							</Link>
						);
					})}
					<button
						type='button'
						className={styles.searchButton({ variant })}
						onClick={onSearchClick}
						aria-label='Search (⌘K)'
					>
						<IoSearchOutline />
					</button>
					<LanguageSwitcher variant={variant} />
				</Flex>

				<Box className={styles.menuButtonWrapper}>
					<MenuButton
						isMenuOpen={isMenuOpen}
						toggleMenu={toggleMenu}
						variant={variant}
					/>
				</Box>
			</Flex>
		</Box>
	);
};

export default Navbar;
