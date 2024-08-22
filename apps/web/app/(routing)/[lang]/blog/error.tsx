'use client';

import { Button, Container, Typography } from '@jung/design-system/components';
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
	}, [error]);

	return (
		<Container className={styles.errorContainer}>
			<Typography.Heading color='primary300'>
				Oops! Something went wrong
			</Typography.Heading>
			<Typography.Text color='primary200'>
				We're sorry, but there was an error loading the blog page. Please try
				again.
			</Typography.Text>
			<Button variant='secondary' onClick={() => reset()}>
				<Typography.Text>Try Again</Typography.Text>
			</Button>
		</Container>
	);
}
