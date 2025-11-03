'use client';

import { MessageWallError } from '@/fsd/entities/guestbook';

export default function GuestBookError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return <MessageWallError error={error} onReset={reset} />;
}
