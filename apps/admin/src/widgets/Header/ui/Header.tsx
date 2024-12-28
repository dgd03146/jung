import { usePathname } from '@/fsd/shared';
import { useSidebarStore } from '@/fsd/shared';
// FIXME: icons들 다 나중에 shared로 빼야할 듯?
import { Box, Flex } from '@jung/design-system/components';
import { useCallback, useEffect, useState } from 'react';
import {
	HiChevronDoubleLeft,
	HiChevronRight,
	HiMenuAlt2,
	HiOutlineBell,
	HiOutlineChatAlt2,
	HiOutlineSearch,
} from 'react-icons/hi';

import * as styles from './Header.css.ts';

const SCROLL_THRESHOLD = 50;

const formatPageTitle = (path: string) => {
	const segments = path.split('/').filter(Boolean);

	if (segments.length === 0) {
		return (
			<div className={styles.titleWrapper}>
				<span className={styles.mainPath}>Dashboard</span>
			</div>
		);
	}

	const mainSection =
		segments[0].charAt(0).toUpperCase() + segments[0].slice(1).toLowerCase();

	const defaultSubSections: Record<string, string> = {
		blog: 'Posts',
		gallery: 'Photos',
		spots: 'Spots',
		dashboard: 'Overview',
	};

	if (segments.length > 1) {
		const subSection = segments[segments.length - 1]
			.split('-')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
			.join(' ');
		return (
			<div className={styles.titleWrapper}>
				<span className={styles.mainPath}>{mainSection}</span>
				<HiChevronRight className={styles.titleSeparator} />
				<span className={styles.subPath}>{subSection}</span>
			</div>
		);
	}

	return (
		<div className={styles.titleWrapper}>
			<span className={styles.mainPath}>{mainSection}</span>
			<HiChevronRight className={styles.titleSeparator} />
			<span className={styles.subPath}>
				{defaultSubSections[mainSection.toLowerCase()] || 'Overview'}
			</span>
		</div>
	);
};

const Header = () => {
	const { pathname } = usePathname();
	const pageTitle = formatPageTitle(pathname);
	const [isScrolled, setIsScrolled] = useState(false);
	const { isOpen, actions } = useSidebarStore();

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
			top={0}
			paddingX={{ mobile: '4', laptop: '8' }}
			display='flex'
			width='full'
			justifyContent='space-between'
			alignItems='center'
			height='16'
			className={styles.header({ isScrolled })}
			zIndex='10'
		>
			<Flex alignItems='center' gap='1'>
				<button
					onClick={actions.toggle}
					className={styles.menuButton}
					aria-label='Toggle sidebar'
				>
					{isOpen ? (
						<HiChevronDoubleLeft size={18} />
					) : (
						<HiMenuAlt2 size={20} />
					)}
				</button>
				<h1 className={styles.pageTitle}>{pageTitle}</h1>
			</Flex>

			<Flex alignItems='center' gap='3'>
				<button className={styles.iconButton}>
					<HiOutlineSearch size={20} />
				</button>
				<button className={styles.iconButton}>
					<HiOutlineChatAlt2 size={20} />
				</button>
				<button className={styles.iconButton}>
					<HiOutlineBell size={20} />
					<span className={styles.notificationBadge}>2</span>
				</button>
			</Flex>
		</Box>
	);
};
export default Header;
