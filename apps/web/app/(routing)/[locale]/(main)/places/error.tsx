'use client';

import { ErrorBoundary } from '@/fsd/shared';

export default function PlaceError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return <ErrorBoundary error={error} reset={reset} />;
}
