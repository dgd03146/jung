'use client';

import { Tabs, Typography } from '@jung/design-system/components';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TABS } from '../config/tabs';

export const PhotoNavigation = () => {
	const pathname = usePathname();

	const getCurrentTab = () => {
		if (pathname.includes('/collections')) return 'collections';
		if (pathname.includes('/trending')) return 'trending';
		return 'recent';
	};

	return (
		<Tabs
			value={getCurrentTab()}
			variant='secondary'
			marginTop='2.5'
			marginBottom='6'
		>
			<Tabs.List>
				{TABS.map(({ value, label, path }) => (
					<Tabs.Trigger key={value} value={value}>
						<Link href={path} scroll={false} style={{ color: 'inherit' }}>
							<Typography.Heading level={5}>{label}</Typography.Heading>
						</Link>
					</Tabs.Trigger>
				))}
			</Tabs.List>
		</Tabs>
	);
};

export default PhotoNavigation;
