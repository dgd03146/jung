'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { pageview } from '@/fsd/shared';

function AnalyticsTracker() {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	useEffect(() => {
		const search = searchParams?.toString();
		const url = pathname + (search ? `?${search}` : '');
		pageview(url);
	}, [pathname, searchParams]);

	return null;
}

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Suspense fallback={null}>
				<AnalyticsTracker />
			</Suspense>
			{children}
		</>
	);
}
