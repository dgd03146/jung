'use client';

import { Typography } from '@jung/design-system/components';
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
		const [mainSection, subSection] = section.split('/');
		return null;
	}

	return (
		<Link href={`/${section.toLowerCase()}`} className={styles.sectionTitle}>
			<Typography.Heading level={3} color='primary' width='fit'>
				{section}.
			</Typography.Heading>
		</Link>
	);
}
