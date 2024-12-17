'use client';

import { ErrorBoundary } from '@/fsd/shared';

export default function SpotError({
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
			title='Spot Not Found'
			description="The spot you're looking for might have been removed or is temporarily unavailable."
			actionLabel='Try Again'
		/>
	);
}
