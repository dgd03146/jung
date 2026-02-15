import { getImageUrl } from '@jung/shared/lib/getImageUrl';
import { createFileRoute, Link, useRouter } from '@tanstack/react-router';
import { ShareButtons } from '../../components/ShareButtons';
import { SITE_CONFIG } from '../../config/site';
import { estimateReadingTime } from '../../lib/readingTime';
import {
	generateArticleJsonLd,
	generateBreadcrumbJsonLd,
} from '../../lib/structuredData';
import {
	type Article,
	fetchArticleById,
	fetchRelatedArticles,
} from '../../server/articles';
import * as styles from '../../styles/articles.css';

export const Route = createFileRoute('/articles/$id')({
	loader: async ({ params }) => {
		const article = await fetchArticleById({ data: params.id });
		const relatedArticles = article
			? await fetchRelatedArticles({
					data: { articleId: article.id, category: article.category },
				})
			: [];
		return { article, relatedArticles };
	},
	head: ({ loaderData }) => {
		const article = loaderData?.article;
		if (!article) return {};
		const articleUrl = `${SITE_CONFIG.url}/articles/${article.id}`;
		const ogImageUrl = `${SITE_CONFIG.url}/api/og?title=${encodeURIComponent(article.title)}&category=${encodeURIComponent(article.category)}`;
		const firstImage = article.images?.[0]
			? getImageUrl(article.images[0])
			: ogImageUrl;

		return {
			meta: [
				{ title: `${article.title} - ${SITE_CONFIG.name}` },
				{ name: 'description', content: article.summary },
				{ property: 'og:title', content: article.title },
				{ property: 'og:description', content: article.summary },
				{ property: 'og:url', content: articleUrl },
				{ property: 'og:image', content: firstImage },
				{ property: 'og:type', content: 'article' },
				{
					property: 'article:published_time',
					content: article.published_at ?? '',
				},
				{ property: 'article:section', content: article.category },
				{ name: 'twitter:card', content: 'summary_large_image' },
				{ name: 'twitter:title', content: article.title },
				{ name: 'twitter:description', content: article.summary },
				{ name: 'twitter:image', content: firstImage },
			],
			scripts: [
				{
					type: 'application/ld+json',
					children: JSON.stringify(
						generateArticleJsonLd({
							title: article.title,
							summary: article.summary,
							url: articleUrl,
							publishedAt: article.published_at,
							category: article.category,
							imageUrl: firstImage,
						}),
					),
				},
				{
					type: 'application/ld+json',
					children: JSON.stringify(
						generateBreadcrumbJsonLd([
							{ name: 'Home', url: SITE_CONFIG.url },
							{ name: 'Articles', url: `${SITE_CONFIG.url}/articles` },
							{ name: article.title, url: articleUrl },
						]),
					),
				},
			],
		};
	},
	component: ArticleDetailPage,
	pendingComponent: ArticleLoading,
	errorComponent: ArticleError,
});

function ArticleLoading() {
	return (
		<div className={styles.centeredPage}>
			<div className={styles.centeredContent}>
				<p style={{ color: '#64748b', fontSize: '0.95rem' }}>
					Loading article...
				</p>
			</div>
		</div>
	);
}

function ArticleError() {
	const router = useRouter();

	return (
		<div className={styles.centeredPage}>
			<div className={styles.centeredContent}>
				<span className={styles.emptyStateIcon}>⚠️</span>
				<h3 className={styles.emptyStateHeading}>Failed to load article</h3>
				<p className={styles.emptyStateText}>
					This article could not be loaded.
					<br />
					It may have been removed or the link is incorrect.
				</p>
				<div
					style={{
						display: 'flex',
						gap: '1rem',
						justifyContent: 'center',
					}}
				>
					<button
						type='button'
						onClick={() => router.invalidate()}
						className={styles.backLink}
					>
						Retry
					</button>
					<Link to='/articles' search={{}} className={styles.backLink}>
						← Back to Articles
					</Link>
				</div>
			</div>
		</div>
	);
}

function ArticleDetailPage() {
	const { article, relatedArticles } = Route.useLoaderData();

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
					<Link to='/articles' search={{}} className={styles.backLink}>
						← Back to Articles
					</Link>
				</div>
			</div>
		);
	}

	const images = article.images ?? [];

	return (
		<div className={styles.page}>
			<div className={styles.gridOverlay} />
			<div className={styles.orbSmall} />

			<div className={styles.contentContainerNarrow}>
				<header className={styles.header}>
					<Link to='/articles' search={{}} className={styles.backLink}>
						← Back
					</Link>
					<span className={styles.headerMeta}>
						{formatDate(article.published_at)}
						{article.summary && (
							<>
								{' · '}
								<span className={styles.readingTime}>
									{estimateReadingTime(article.summary)} min read
								</span>
							</>
						)}
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

					{images.length > 0 && (
						<div className={styles.imageGallery}>
							{images.map((key: string, index: number) => (
								<img
									key={key}
									src={getImageUrl(key)}
									alt={`${article.title} - ${index + 1}`}
									className={styles.galleryImage}
								/>
							))}
						</div>
					)}

					<div className={styles.card}>
						<h2 className={`${styles.cardLabel} ${styles.cardLabelPrimary}`}>
							Summary
						</h2>
						<p className={styles.cardText}>{article.summary}</p>
					</div>

					{article.my_thoughts && (
						<div className={styles.cardAlt}>
							<h2 className={`${styles.cardLabel} ${styles.cardLabelAlt}`}>
								Why This Article
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

					<ShareButtons
						title={article.title}
						url={`${SITE_CONFIG.url}/articles/${article.id}`}
					/>

					{relatedArticles.length > 0 && (
						<div className={styles.relatedSection}>
							<h2 className={styles.relatedHeading}>Related Articles</h2>
							<div className={styles.relatedGrid}>
								{relatedArticles.map((related: Article) => (
									<Link
										key={related.id}
										to='/articles/$id'
										params={{ id: related.id }}
										className={styles.linkUnstyled}
									>
										<div className={styles.relatedCard}>
											<span
												className={`${styles.relatedCardCategory} ${
													related.category === 'ai'
														? styles.categoryAi
														: styles.categoryFrontend
												}`}
											>
												{related.category}
											</span>
											<h3 className={styles.relatedCardTitle}>
												{related.title}
											</h3>
										</div>
									</Link>
								))}
							</div>
						</div>
					)}
				</main>

				<footer className={styles.footerNoBorder}>
					<p className={styles.footerText}>© 2026 Curated by Jung</p>
				</footer>
			</div>
		</div>
	);
}
