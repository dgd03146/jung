'use client';

import { useEffect } from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import * as styles from './MessageWallError.css';

interface MessageWallErrorProps {
	error: Error;
	onReset?: () => void;
}

export const MessageWallError = ({ error, onReset }: MessageWallErrorProps) => {
	useEffect(() => {
		if (process.env.NODE_ENV === 'development') {
			console.error('[MessageWallError]', error.message);
		}
	}, [error]);

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<div className={styles.iconWrapper}>
					<FiAlertCircle size={22} />
				</div>
				<h3 className={styles.title}>Unable to load messages</h3>
				<p className={styles.description}>
					Something went wrong. Please try again.
				</p>
				{process.env.NODE_ENV === 'development' && (
					<p className={styles.errorMessage}>{error.message}</p>
				)}
				{onReset && (
					<button
						type='button'
						onClick={onReset}
						className={styles.refreshButton}
					>
						Try again
					</button>
				)}
			</div>
		</div>
	);
};
