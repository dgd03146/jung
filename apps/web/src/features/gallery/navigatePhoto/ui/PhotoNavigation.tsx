'use client';

import { Fragment } from 'react';
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
			{TABS.map(({ value, label, path }, index) => (
				<Fragment key={value}>
					{index > 0 && <span className={styles.separator}>/</span>}
					<Link
						href={path}
						scroll={false}
						className={`${styles.link} ${currentTab === value ? styles.linkActive : ''}`}
						{...(currentTab === value && { 'aria-current': 'page' as const })}
					>
						{label}
					</Link>
				</Fragment>
			))}
		</nav>
	);
};

export default PhotoNavigation;
