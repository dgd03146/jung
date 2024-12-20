'use client';

import { Flex, Typography } from '@jung/design-system/components';
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
		return (
			<Flex
				alignItems='center'
				gap='2'
				marginBottom='6'
				className={styles.sectionTitle}
			>
				<Link
					href={`/${mainSection?.toLowerCase()}`}
					style={{ display: 'flex', alignItems: 'center' }}
				>
					<Typography.FootNote color='primary'>
						{mainSection}
					</Typography.FootNote>
				</Link>
				<Typography.FootNote color='primary'>/</Typography.FootNote>
				<Link
					href={`/${mainSection?.toLowerCase()}/${subSection?.toLowerCase()}`}
					style={{ display: 'flex', alignItems: 'center' }}
				>
					<Typography.FootNote color='primary'>
						{subSection}
					</Typography.FootNote>
				</Link>
			</Flex>
		);
	}

	return (
		<Link href={`/${section?.toLowerCase()}`} className={styles.sectionTitle}>
			<Typography.Heading level={1} color='primary' marginBottom='6'>
				{section}.
			</Typography.Heading>
		</Link>
	);
}
