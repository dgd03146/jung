'use client';

import { Tabs } from '@jung/design-system/components';
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
		<Tabs value={getCurrentTab()} variant='secondary'>
			<Tabs.List marginBottom='6'>
				{TABS.map(({ value, label, path }) => (
					<Tabs.Trigger key={value} value={value}>
						<Link href={path} scroll={false} style={{ color: 'inherit' }}>
							{label}
						</Link>
					</Tabs.Trigger>
				))}
			</Tabs.List>
		</Tabs>
	);
};

export default PhotoNavigation;
