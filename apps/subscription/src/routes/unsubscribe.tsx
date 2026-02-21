import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { unsubscribe } from '../server/subscribers';
import * as styles from '../styles/unsubscribe.css';

export const Route = createFileRoute('/unsubscribe')({
	component: UnsubscribePage,
});

function UnsubscribePage() {
	const [isUnsubscribed, setIsUnsubscribed] = useState(false);
	const [email, setEmail] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleUnsubscribe = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setError(null);
		try {
			const result = await unsubscribe({ data: { email } });
			if (result.success) {
				setIsUnsubscribed(true);
			} else {
				setError(result.message);
			}
		} catch (err) {
			console.error('Unsubscribe error:', err);
			setError('Something went wrong. Please try again.');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className={styles.page}>
			<div className={styles.gridOverlay} />
			<div className={styles.orb} />

			<div className={styles.content}>
				<div className={styles.card}>
					{isUnsubscribed ? (
						<>
							<div className={styles.successIcon}>
								<span aria-hidden='true'>✓</span>
							</div>
							<h1 className={`${styles.heading} ${styles.headingSuccess}`}>
								Unsubscribed
							</h1>
							<p className={styles.description}>
								You've been unsubscribed.
								<br />
								Hope to see you again!
							</p>
							<Link to='/' className={styles.backLink}>
								← Back to Home
							</Link>
						</>
					) : (
						<>
							<h1 className={styles.heading}>Unsubscribe</h1>
							<p className={styles.description}>
								Are you sure you want to unsubscribe?
							</p>

							<form onSubmit={handleUnsubscribe}>
								<div className={styles.formCard}>
									<input
										type='email'
										placeholder='your@email.com'
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required
										className={styles.emailInput}
									/>
									<button
										type='submit'
										disabled={isSubmitting}
										className={styles.submitButton}
									>
										{isSubmitting ? 'Processing...' : 'Unsubscribe'}
									</button>
								</div>
								{error && <p className={styles.errorText}>{error}</p>}
							</form>

							<Link to='/' className={styles.cancelLink}>
								Cancel and go back
							</Link>
						</>
					)}
				</div>
			</div>
		</div>
	);
}
