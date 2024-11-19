'use client';

import { Typography } from '@jung/design-system/components';
import { usePathname } from 'next/navigation';
import { getSection } from '../lib/getSection';

export function SectionTitle() {
	const pathname = usePathname();
	const isHome = pathname.length === 3;
	const section = isHome ? undefined : getSection(pathname);

	if (!section) return null;

	return (
		<Typography.Heading level={3} color='primary' marginBottom='10'>
			{section}.
		</Typography.Heading>
	);
}
