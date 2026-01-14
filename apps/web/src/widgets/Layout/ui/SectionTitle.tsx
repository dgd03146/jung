'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getSection } from '../lib/getSection';
import * as styles from './SectionTitle.css';

export function SectionTitle() {
	const pathname = usePathname();
	const isHome = pathname.length === 3;
	const isLogin = pathname.includes('/login');
	const section = isHome || isLogin ? undefined : getSection(pathname);

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
