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
					<Typography.Text level={1} className={styles.sectionText}>
						{mainSection}
					</Typography.Text>
				</Link>
				<Typography.Text level={1} color='primary'>
					/
				</Typography.Text>
				{subSection === 'PHOTO' ? (
					<Typography.Text level={1} color='primary'>
						{subSection}
					</Typography.Text>
				) : (
					<Link
						href={`/${mainSection?.toLowerCase()}/${subSection?.toLowerCase()}`}
						style={{ display: 'flex', alignItems: 'center' }}
					>
						<Typography.Text level={1} className={styles.sectionText}>
							{subSection}
						</Typography.Text>
					</Link>
				)}
			</Flex>
		);
	}

	return (
		<Typography.Heading
			level={2}
			color='primary'
			marginBottom={{ mobile: '3', desktop: '5' }}
			width='fit'
		>
			<Link href={`/${section.toLowerCase()}`} className={styles.sectionTitle}>
				{section}.
			</Link>
		</Typography.Heading>
	);
}
