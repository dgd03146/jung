'use client';

import {
	Box,
	Button,
	Container,
	Typography,
} from '@jung/design-system/components';
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
		// TODO: Sentry로 에러 전송
		console.error(error);
		// TODO: 에러 로깅 서비스 호출 코드 추가 (Sentry, LogRocket)
	}, [error]);

	return (
		<Container className={styles.errorContainer}>
			<Typography.Heading color='primary300'>
				{error.message}
			</Typography.Heading>
			<Typography.Text color='primary200'>
				We're sorry, but there was an error loading the blog page. Please try
				again.
			</Typography.Text>
			<Button variant='secondary' onClick={() => reset()}>
				Try Again
			</Button>
			{process.env.NODE_ENV === 'development' && (
				<Box as='details'>
					<summary>Error details</summary>
					<pre>{error.message}</pre>
					{error.stack && <pre>{error.stack}</pre>}
				</Box>
			)}
		</Container>
	);
}
