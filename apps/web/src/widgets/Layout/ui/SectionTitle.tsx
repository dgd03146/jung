'use client';

import { Link, usePathname } from '@/i18n/routing';
import { getSection } from '../lib/getSection';
import * as styles from './SectionTitle.css';

export function SectionTitle() {
	const pathname = usePathname();
	// next-intl의 usePathname()은 locale 제거된 경로 반환: "/" (홈)
	const isHome = pathname === '/';
	const isLogin = pathname.includes('/login');
	const isBlog = pathname.startsWith('/blog');
	const section =
		isHome || isLogin || isBlog ? undefined : getSection(pathname);

	if (!section) return null;

	const hasSlash = section.includes('/');

	if (hasSlash) {
		return null;
	}

	return (
		<Link href={`/${section.toLowerCase()}`} className={styles.sectionTitle}>
			<span className={styles.sectionText}>{section}</span>
		</Link>
	);
}
