import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { type Article, getArticles } from '../../lib';
import * as styles from '../../styles/articles.css';

export const Route = createFileRoute('/articles/')({
	component: ArticlesPage,
});

function ArticlesPage() {
	const [filter, setFilter] = useState<'all' | 'frontend' | 'ai'>('all');
	const [articles, setArticles] = useState<Article[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		let isActive = true;

		const fetchArticles = async () => {
			setIsLoading(true);
			const data = await getArticles(filter === 'all' ? undefined : filter);
			if (isActive) {
				setArticles(data);
				setIsLoading(false);
			}
		};
		fetchArticles();

		return () => {
			isActive = false;
		};
	}, [filter]);

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

						<div className={styles.filterContainer}>
							<button
								type='button'
								onClick={() => setFilter('all')}
								className={`${styles.filterButton} ${filter === 'all' ? styles.filterButtonActive : ''}`}
							>
								All
							</button>
							<button
								type='button'
								onClick={() => setFilter('frontend')}
								className={`${styles.filterButton} ${filter === 'frontend' ? styles.filterButtonActive : ''}`}
							>
								Frontend
							</button>
							<button
								type='button'
								onClick={() => setFilter('ai')}
								className={`${styles.filterButton} ${filter === 'ai' ? styles.filterButtonActiveAi : ''}`}
							>
								AI
							</button>
						</div>
					</div>

					<div className={styles.articleList}>
						{isLoading ? (
							<div className={styles.loadingContainer}>
								<span className={styles.loadingText}>Loading articles...</span>
							</div>
						) : articles.length === 0 ? (
							<div className={styles.loadingContainer}>
								<span className={styles.loadingText}>No articles found.</span>
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
