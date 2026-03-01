'use client';

import { Link, usePathname } from '@/i18n/routing';
import { TABS } from '../config/tabs';
import * as styles from './PhotoNavigation.css';

export const PhotoNavigation = () => {
	const pathname = usePathname();

	const getCurrentTab = () => {
		if (pathname.includes('/collections')) return 'collections';
		if (pathname.includes('/trending')) return 'trending';
		return 'recent';
	};

	const currentTab = getCurrentTab();

	return (
		<nav className={styles.nav} aria-label='Gallery navigation'>
			{TABS.map(({ value, label, path }) => (
				<Link
					key={value}
					href={path}
					scroll={false}
					className={currentTab === value ? styles.tabActive : styles.tab}
					{...(currentTab === value && { 'aria-current': 'page' as const })}
				>
					{label}
				</Link>
			))}
		</nav>
	);
};

export default PhotoNavigation;
