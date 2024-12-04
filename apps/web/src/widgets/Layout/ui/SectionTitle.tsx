'use client';

import { Typography } from '@jung/design-system/components';
import { usePathname } from 'next/navigation';
import { getSection } from '../lib/getSection';

export function SectionTitle() {
	const pathname = usePathname();
	const isHome = pathname.length === 3;
	const isLogin = pathname.includes('/login');
	const section = isHome || isLogin ? undefined : getSection(pathname);

	if (!section) return null;

	return (
		<Typography.Heading level={4} color='primary' marginY='6'>
			{section}.
		</Typography.Heading>
	);
}
