'use client';

import { ErrorBoundary } from '@/fsd/shared';

export default function BlogError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return <ErrorBoundary error={error} reset={reset} />;
}
