import { useToast } from '@jung/design-system/components';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { ThemeToggle } from '../components/ThemeToggle';
import { SITE_CONFIG } from '../config/site';
import { subscribe } from '../server/subscribers';
import * as styles from '../styles/home.css';

const CATEGORY_OPTIONS = [
	{ value: 'frontend', label: 'Frontend', activeColor: 'var(--color-primary)' },
	{ value: 'ai', label: 'AI', activeColor: 'var(--color-primary-alt)' },
	{ value: 'both', label: 'Both', activeColor: 'var(--color-primary)' },
] as const;

export const Route = createFileRoute('/')({
	head: () => ({
		meta: [
			{ title: `${SITE_CONFIG.name} - ${SITE_CONFIG.description}` },
			{
				name: 'description',
				content:
					'Hand-picked reads for developers who want to grow. Subscribe to get curated Frontend & AI articles weekly.',
			},
			{ property: 'og:title', content: SITE_CONFIG.name },
			{
				property: 'og:description',
				content: 'Hand-picked reads for developers who want to grow.',
			},
			{ property: 'og:url', content: SITE_CONFIG.url },
			{ property: 'og:image', content: `${SITE_CONFIG.url}/api/og` },
			{ name: 'twitter:card', content: 'summary_large_image' },
			{ name: 'twitter:title', content: SITE_CONFIG.name },
			{
				name: 'twitter:description',
				content: 'Hand-picked reads for developers who want to grow.',
			},
			{ name: 'twitter:image', content: `${SITE_CONFIG.url}/api/og` },
		],
	}),
	component: HomePage,
});

function HomePage() {
	const [email, setEmail] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [category, setCategory] = useState<'frontend' | 'ai' | 'both'>('both');
	const showToast = useToast();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		try {
			const result = await subscribe({ data: { email, category } });
			if (result.success) {
				showToast(result.message, 'success');
				setEmail('');
			} else {
				showToast(result.message, 'error');
			}
		} catch {
			showToast('Something went wrong. Please try again.', 'error');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className={styles.page}>
			<div className={styles.gridOverlay} />
			<div className={styles.orbTopRight} />
			<div className={styles.orbBottomLeft} />

			<div className={styles.content}>
				<header className={styles.header}>
					<nav className={styles.nav}>
						<ThemeToggle />
						<Link
							to='/articles'
							search={{ category: 'all', q: '', page: 1 }}
							className={styles.navLink}
						>
							Articles
						</Link>
					</nav>
				</header>

				<main className={styles.main}>
					<div className={styles.heroSection}>
						<p className={styles.heroLabel}>Level Up Weekly</p>
						<h1 className={styles.heroTitle}>
							Articles That
							<br />
							<span className={styles.heroGradientText}>Actually Help</span>
						</h1>
						<p className={styles.heroSubtitle}>
							Hand-picked reads for developers who want to grow.
						</p>
					</div>

					<div id='subscribe' className={styles.subscribeSection}>
						<div className={styles.subscribeForm}>
							<div className={styles.filterToggleContainer}>
								{CATEGORY_OPTIONS.map((opt) => (
									<button
										key={opt.value}
										type='button'
										onClick={() => setCategory(opt.value)}
										aria-pressed={category === opt.value}
										className={`${styles.filterToggleButton} ${
											category === opt.value
												? styles.filterToggleButtonActive
												: ''
										}`}
										style={
											category === opt.value
												? { color: opt.activeColor }
												: undefined
										}
									>
										{opt.label}
									</button>
								))}
							</div>

							<form onSubmit={handleSubmit}>
								<div className={styles.emailFormWrapper}>
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
										{isSubmitting ? 'Subscribing...' : 'Subscribe'}
									</button>
								</div>
							</form>

							<p className={styles.formHint}>No spam · Unsubscribe anytime</p>
						</div>
					</div>
				</main>

				<footer className={styles.footer}>
					<p className={styles.footerText}>© 2026 Curated by Jung</p>
					<Link to='/unsubscribe' className={styles.footerLink}>
						Unsubscribe
					</Link>
				</footer>
			</div>
		</div>
	);
}
