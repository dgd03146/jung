'use client';

import { ErrorBoundary } from '@/fsd/shared';

export default function GuestBookError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<ErrorBoundary
			error={error}
			reset={reset}
			title='Guestbook Error'
			description='Unable to load Guestbook content. Please try again later.'
			actionLabel='Refresh'
		/>
	);
}
