'use client';

import { ErrorBoundary } from '@/fsd/shared';

export default function PlaceError({
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
			title='Place Not Found'
			description="The place you're looking for might have been removed or is temporarily unavailable."
			actionLabel='Try Again'
		/>
	);
}
