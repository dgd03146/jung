'use client';

import { Box, Button, Typography } from '@jung/design-system/components';
import { useEffect } from 'react';
import * as styles from './error.css';

// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
		// TODO: Implement error logging service call (Sentry, LogRocket)
	}, [error]);

	return (
		<div className={styles.errorContainer}>
			<Typography.Heading level={1} className={styles.errorHeading}>
				Oops! Something went wrong
			</Typography.Heading>
			<Typography.Text className={styles.errorText}>
				We're sorry, but there was an error loading the page. Please try again
				or contact support if the problem persists.
			</Typography.Text>
			<Button className={styles.tryAgainButton} onClick={() => reset()}>
				Try Again
			</Button>
			{process.env.NODE_ENV === 'development' && (
				<Box as='details' className={styles.errorDetails}>
					<summary className={styles.errorDetailsSummary}>
						Error details
					</summary>

					{error.stack && (
						<pre className={styles.errorStackTrace}>{error.stack}</pre>
					)}
				</Box>
			)}
		</div>
	);
}
