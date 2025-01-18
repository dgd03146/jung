'use client';

import { Box, Button, Typography } from '@jung/design-system/components';
import { useEffect } from 'react';
import * as styles from './ErrorBoundary.css';

interface ErrorBoundaryProps {
	error: Error & { digest?: string };
	reset: () => void;
	title?: string;
	description?: string;
	actionLabel?: string;
}

export function ErrorBoundary({
	error,
	reset,
	title = 'Oops! Something went wrong',
	description = "We're sorry, but there was an error loading the page. Please try again or contact support if the problem persists.",
	actionLabel = 'Try Again',
}: ErrorBoundaryProps) {
	useEffect(() => {
		console.error(error);
		// TODO: Implement error logging service call (Sentry, LogRocket)
	}, [error]);

	return (
		<Box className={styles.errorContainer}>
			<Typography.Heading level={1} className={styles.errorHeading}>
				{title}
			</Typography.Heading>
			<Typography.Text className={styles.errorText}>
				{description}
			</Typography.Text>
			<Button className={styles.tryAgainButton} onClick={() => reset()}>
				{actionLabel}
			</Button>
			{process.env.NODE_ENV === 'development' && (
				<Box as='details' className={styles.errorDetails}>
					<Box as='summary' className={styles.errorDetailsSummary}>
						Error details
					</Box>
					{error.stack && (
						<pre className={styles.errorStackTrace}>{error.stack}</pre>
					)}
				</Box>
			)}
		</Box>
	);
}
