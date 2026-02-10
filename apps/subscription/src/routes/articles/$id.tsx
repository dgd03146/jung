import { createFileRoute, Link } from '@tanstack/react-router';
import { fetchArticleById } from '../../server/articles';
import * as styles from '../../styles/articles.css';

export const Route = createFileRoute('/articles/$id')({
	loader: ({ params }) => fetchArticleById({ data: params.id }),
	component: ArticleDetailPage,
});

function ArticleDetailPage() {
	const article = Route.useLoaderData();

	const formatDate = (dateString: string | null) => {
		if (!dateString) return '';
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	};

	if (!article) {
		return (
			<div className={styles.centeredPage}>
				<div className={styles.centeredContent}>
					<span className={styles.emptyStateIcon}>🔍</span>
					<h1 className={styles.emptyStateHeading}>Article not found</h1>
					<p className={styles.emptyStateText}>
						This article may have been removed or the link is incorrect.
					</p>
					<Link to='/articles' className={styles.backLink}>
						← Back to Articles
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className={styles.page}>
			<div className={styles.gridOverlay} />
			<div className={styles.orbSmall} />

			<div className={styles.contentContainerNarrow}>
				<header className={styles.header}>
					<Link to='/articles' className={styles.backLink}>
						← Back
					</Link>
					<span className={styles.headerMeta}>
						{formatDate(article.published_at)}
					</span>
				</header>

				<main>
					<div className={styles.titleSectionDetail}>
						<span
							className={`${styles.labelSmall} ${
								article.category === 'ai'
									? styles.categoryAi
									: styles.categoryFrontend
							}`}
						>
							{article.category}
						</span>
						<h1 className={styles.titleDetail}>{article.title}</h1>
					</div>

					<div className={styles.card}>
						<h2 className={`${styles.cardLabel} ${styles.cardLabelPrimary}`}>
							Summary
						</h2>
						<p className={styles.cardText}>{article.summary}</p>
					</div>

					{article.my_thoughts && (
						<div className={styles.cardAlt}>
							<h2 className={`${styles.cardLabel} ${styles.cardLabelAlt}`}>
								My Thoughts
							</h2>
							<p className={styles.cardTextDark}>{article.my_thoughts}</p>
						</div>
					)}

					<a
						href={article.original_url}
						target='_blank'
						rel='noopener noreferrer'
						className={styles.primaryButton}
					>
						Read Original Article
						<span>→</span>
					</a>
				</main>

				<footer className={styles.footerNoBorder}>
					<p className={styles.footerText}>© 2026 Curated by Jung</p>
				</footer>
			</div>
		</div>
	);
}
