import { createFileRoute, Link, useRouter } from '@tanstack/react-router';
import { fetchArticles } from '../../server/articles';
import * as styles from '../../styles/articles.css';

export const Route = createFileRoute('/articles/')({
	loader: () => fetchArticles(),
	component: ArticlesPage,
	pendingComponent: ArticlesLoading,
	errorComponent: ArticlesError,
});

function ArticlesLoading() {
	return (
		<div className={styles.centeredPage}>
			<div className={styles.centeredContent}>
				<p style={{ color: '#64748b', fontSize: '0.95rem' }}>
					Loading articles...
				</p>
			</div>
		</div>
	);
}

function ArticlesError() {
	const router = useRouter();

	return (
		<div className={styles.centeredPage}>
			<div className={styles.centeredContent}>
				<span className={styles.emptyStateIcon}>⚠️</span>
				<h3 className={styles.emptyStateHeading}>Failed to load articles</h3>
				<p className={styles.emptyStateText}>
					Something went wrong while fetching articles.
					<br />
					Please try again later.
				</p>
				<button
					type='button'
					onClick={() => router.invalidate()}
					className={styles.backLink}
				>
					Retry
				</button>
			</div>
		</div>
	);
}

function ArticlesPage() {
	const articles = Route.useLoaderData();

	const formatDate = (dateString: string | null) => {
		if (!dateString) return '';
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		});
	};

	return (
		<div className={styles.page}>
			<div className={styles.gridOverlay} />
			<div className={styles.orb} />

			<div className={styles.contentContainer}>
				<header className={styles.header}>
					<Link to='/' className={styles.backLink}>
						← Home
					</Link>
					<span className={styles.headerMeta}>{articles.length} articles</span>
				</header>

				<main>
					<div className={styles.titleSection}>
						<p className={styles.label}>Archive</p>
						<h1 className={styles.title}>All Articles</h1>
						<p className={styles.subtitle}>
							A collection of articles I've read and recommend
						</p>
					</div>

					<div className={styles.articleList}>
						{articles.length === 0 ? (
							<div className={styles.loadingContainer}>
								<span className={styles.emptyStateIcon}>📭</span>
								<h3 className={styles.emptyStateHeading}>No articles yet</h3>
								<p className={styles.emptyStateText}>
									New articles will appear here soon.
									<br />
									Check back later!
								</p>
							</div>
						) : (
							articles.map((article, index) => (
								<Link
									key={article.id}
									to='/articles/$id'
									params={{ id: article.id }}
									className={styles.linkUnstyled}
								>
									<article className={styles.articleCard}>
										<span className={styles.articleNumber}>
											{String(index + 1).padStart(2, '0')}
										</span>

										<div>
											<div className={styles.articleMeta}>
												<span
													className={`${styles.categoryBadge} ${
														article.category === 'ai'
															? styles.categoryAi
															: styles.categoryFrontend
													}`}
												>
													{article.category}
												</span>
												<span className={styles.articleDate}>
													{formatDate(article.published_at)}
												</span>
											</div>
											<h3 className={styles.articleTitle}>{article.title}</h3>
											<p className={styles.articleSummary}>{article.summary}</p>
										</div>

										<span className={styles.articleArrow}>→</span>
									</article>
								</Link>
							))
						)}
					</div>
				</main>

				<footer className={styles.footer}>
					<p className={styles.footerText}>© 2026 Curated by Jung</p>
				</footer>
			</div>
		</div>
	);
}
