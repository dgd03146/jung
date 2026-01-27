'use client';

import { Box, Button, Typography } from '@jung/design-system/components';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import * as styles from './ErrorBoundary.css';

interface ErrorBoundaryProps {
	error: Error & { digest?: string };
	reset: () => void;
}

export function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
	const t = useTranslations('error');
	useEffect(() => {
		console.error(error);
		// TODO: Implement error logging service call (Sentry, LogRocket)
	}, [error]);

	return (
		<Box className={styles.errorContainer}>
			<Typography.Heading level={1} className={styles.errorHeading}>
				{t('generic')}
			</Typography.Heading>
			<Typography.Text className={styles.errorText}>
				{t('genericDesc')}
			</Typography.Text>
			<Button className={styles.tryAgainButton} onClick={() => reset()}>
				{t('tryAgain')}
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
