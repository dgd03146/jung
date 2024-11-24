'use client';

import { ErrorBoundary } from '@/fsd/shared';

export default function PhotoError({
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
			title='Photo Not Found'
			description="The photo you're looking for might have been removed or is temporarily unavailable."
			actionLabel='Try Again'
		/>
	);
}
