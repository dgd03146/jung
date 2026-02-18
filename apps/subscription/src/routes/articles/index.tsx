import { getImageUrl } from '@jung/shared/lib/getImageUrl';
import {
	createFileRoute,
	Link,
	useNavigate,
	useRouter,
} from '@tanstack/react-router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { z } from 'zod';
import { SITE_CONFIG } from '../../config/site';
import { generateCollectionPageJsonLd } from '../../lib/structuredData';
import { type Article, fetchArticles } from '../../server/articles';
import * as styles from '../../styles/articles.css';

const ARTICLE_CATEGORIES = ['all', 'frontend', 'ai'] as const;

const articlesSearchSchema = z.object({
	category: z.enum(ARTICLE_CATEGORIES).optional().default('all'),
	q: z.string().optional().default(''),
	page: z.coerce.number().int().min(1).optional().default(1),
});

export const Route = createFileRoute('/articles/')({
	validateSearch: (search) => articlesSearchSchema.parse(search),
	loaderDeps: ({ search: { category, page } }) => ({ category, page }),
	loader: ({ deps: { category, page } }) =>
		fetchArticles({ data: { category, page, pageSize: 10 } }),
	head: ({ loaderData }) => ({
		meta: [
			{ title: `Articles - ${SITE_CONFIG.name}` },
			{
				name: 'description',
				content: `Browse ${loaderData?.totalCount ?? 0} curated Frontend & AI articles.`,
			},
			{ property: 'og:title', content: `Articles - ${SITE_CONFIG.name}` },
			{
				property: 'og:description',
				content: 'Curated Frontend & AI articles I actually read.',
			},
			{ property: 'og:url', content: `${SITE_CONFIG.url}/articles` },
			{
				property: 'og:image',
				content: `${SITE_CONFIG.url}/api/og?title=All%20Articles`,
			},
		],
		scripts: [
			{
				type: 'application/ld+json',
				children: JSON.stringify(
					generateCollectionPageJsonLd(loaderData?.totalCount ?? 0),
				),
			},
		],
	}),
	component: ArticlesPage,
	pendingComponent: ArticlesLoading,
	errorComponent: ArticlesError,
});

const CATEGORY_LABELS: Record<(typeof ARTICLE_CATEGORIES)[number], string> = {
	all: 'All',
	frontend: 'Frontend',
	ai: 'AI',
};

const FILTER_OPTIONS = ARTICLE_CATEGORIES.map((value) => ({
	value,
	label: CATEGORY_LABELS[value],
}));

function ArticlesLoading() {
	return (
		<div className={styles.centeredPage}>
			<div className={styles.centeredContent}>
				<p className={styles.loadingText}>Loading articles...</p>
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
	const { articles, totalCount, page, pageSize } = Route.useLoaderData();
	const { category, q } = Route.useSearch();
	const navigate = useNavigate({ from: '/articles/' });

	const [searchInput, setSearchInput] = useState(q);
	const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);

	useEffect(() => {
		setSearchInput(q);
	}, [q]);

	useEffect(() => {
		return () => {
			if (debounceRef.current) clearTimeout(debounceRef.current);
		};
	}, []);

	const handleSearchChange = useCallback(
		(value: string) => {
			setSearchInput(value);
			if (debounceRef.current) clearTimeout(debounceRef.current);
			debounceRef.current = setTimeout(() => {
				navigate({
					search: (prev) => ({ ...prev, q: value, page: 1 }),
				});
			}, 300);
		},
		[navigate],
	);

	const filteredArticles = useMemo(() => {
		if (!q) return articles;
		const lower = q.toLowerCase();
		return articles.filter(
			(a: Article) =>
				a.title.toLowerCase().includes(lower) ||
				a.summary?.toLowerCase().includes(lower),
		);
	}, [articles, q]);

	const totalPages = Math.ceil(totalCount / pageSize);

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
					<span className={styles.headerMeta}>
						{totalCount} article{totalCount !== 1 ? 's' : ''}
					</span>
				</header>

				<main>
					<div className={styles.titleSection}>
						<p className={styles.label}>Archive</p>
						<h1 className={styles.title}>All Articles</h1>
						<p className={styles.subtitle}>
							A collection of articles I've read and recommend
						</p>

						{/* Category Filter */}
						<div className={styles.filterContainer}>
							{FILTER_OPTIONS.map((opt) => (
								<button
									key={opt.value}
									type='button'
									onClick={() =>
										navigate({
											search: (prev) => ({
												...prev,
												category: opt.value,
												page: 1,
											}),
										})
									}
									className={`${styles.filterButton} ${
										(category ?? 'all') === opt.value
											? opt.value === 'ai'
												? styles.filterButtonActiveAi
												: styles.filterButtonActive
											: ''
									}`}
								>
									{opt.label}
								</button>
							))}
						</div>
					</div>

					{/* Search */}
					<div className={styles.searchContainer}>
						<svg
							className={styles.searchIcon}
							width='16'
							height='16'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
							aria-hidden='true'
						>
							<circle cx='11' cy='11' r='8' />
							<path d='m21 21-4.35-4.35' />
						</svg>
						<input
							type='text'
							placeholder='Search articles...'
							value={searchInput}
							onChange={(e) => handleSearchChange(e.target.value)}
							className={styles.searchInput}
							aria-label='Search articles'
						/>
					</div>

					<div className={styles.articleList}>
						{filteredArticles.length === 0 ? (
							<div className={styles.loadingContainer}>
								<span className={styles.emptyStateIcon}>{q ? '🔍' : '📭'}</span>
								<h3 className={styles.emptyStateHeading}>
									{q ? 'No results found' : 'No articles yet'}
								</h3>
								<p className={styles.emptyStateText}>
									{q ? (
										<>
											No articles match "{q}".
											<br />
											Try a different search term.
										</>
									) : (
										<>
											New articles will appear here soon.
											<br />
											Check back later!
										</>
									)}
								</p>
							</div>
						) : (
							filteredArticles.map((article: Article, index: number) => {
								const thumbnail = article.images?.[0];
								const globalIndex = (page - 1) * pageSize + index + 1;

								return (
									<Link
										key={article.id}
										to='/articles/$id'
										params={{ id: article.id }}
										className={styles.linkUnstyled}
									>
										<article className={styles.articleCard}>
											<span className={styles.articleNumber}>
												{String(globalIndex).padStart(2, '0')}
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
												<p className={styles.articleSummary}>
													{article.summary}
												</p>
											</div>

											{thumbnail ? (
												<img
													src={getImageUrl(thumbnail)}
													alt={article.title}
													className={styles.articleThumbnail}
												/>
											) : (
												<span className={styles.articleArrow}>→</span>
											)}
										</article>
									</Link>
								);
							})
						)}
					</div>

					{/* Pagination */}
					{totalPages > 1 && (
						<nav aria-label='Pagination' className={styles.paginationContainer}>
							<button
								type='button'
								disabled={page <= 1}
								onClick={() =>
									navigate({
										search: (prev) => ({ ...prev, page: page - 1 }),
									})
								}
								className={styles.paginationButton}
							>
								← Previous
							</button>
							<span className={styles.paginationInfo}>
								Page {page} of {totalPages}
							</span>
							<button
								type='button'
								disabled={page >= totalPages}
								onClick={() =>
									navigate({
										search: (prev) => ({ ...prev, page: page + 1 }),
									})
								}
								className={styles.paginationButton}
							>
								Next →
							</button>
						</nav>
					)}
				</main>

				<footer className={styles.footer}>
					<p className={styles.footerText}>© 2026 Curated by Jung</p>
				</footer>
			</div>
		</div>
	);
}
