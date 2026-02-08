import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { type Article, getArticles } from '../../lib';

export const Route = createFileRoute('/articles/')({
	component: ArticlesPage,
});

function ArticlesPage() {
	const [filter, setFilter] = useState<'all' | 'frontend' | 'ai'>('all');
	const [articles, setArticles] = useState<Article[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchArticles = async () => {
			setIsLoading(true);
			const data = await getArticles(filter === 'all' ? undefined : filter);
			setArticles(data);
			setIsLoading(false);
		};
		fetchArticles();
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
		<div
			style={{
				minHeight: '100vh',
				background:
					'linear-gradient(135deg, #e8efff 0%, #f0e8ff 50%, #e8f4ff 100%)',
				position: 'relative',
				overflow: 'hidden',
				fontFamily: "'Poppins', sans-serif",
			}}
		>
			{/* Grid texture overlay */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					backgroundImage: `
            linear-gradient(rgba(120, 120, 180, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(120, 120, 180, 0.03) 1px, transparent 1px)
          `,
					backgroundSize: '60px 60px',
					pointerEvents: 'none',
				}}
			/>

			{/* Soft gradient orbs */}
			<div
				style={{
					position: 'absolute',
					top: '10%',
					right: '-20%',
					width: '50vw',
					height: '50vw',
					maxWidth: '600px',
					maxHeight: '600px',
					background:
						'radial-gradient(circle, rgba(147, 112, 219, 0.12) 0%, transparent 70%)',
					filter: 'blur(80px)',
					borderRadius: '50%',
				}}
			/>

			{/* Content */}
			<div
				style={{
					position: 'relative',
					zIndex: 1,
					minHeight: '100vh',
					display: 'grid',
					gridTemplateRows: 'auto 1fr auto',
					padding: 'clamp(1.5rem, 5vw, 3rem)',
					maxWidth: '900px',
					margin: '0 auto',
				}}
			>
				{/* Header */}
				<header
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						paddingBottom: '3rem',
					}}
				>
					<Link
						to='/'
						style={{
							fontSize: '0.85rem',
							color: '#6366f1',
							textDecoration: 'none',
							fontWeight: 500,
						}}
					>
						← Home
					</Link>
					<span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
						{articles.length} articles
					</span>
				</header>

				{/* Main Content */}
				<main>
					{/* Page Title */}
					<div style={{ marginBottom: '3rem' }}>
						<p
							style={{
								fontSize: '0.85rem',
								fontWeight: 500,
								color: '#8b5cf6',
								letterSpacing: '0.1em',
								textTransform: 'uppercase',
								marginBottom: '1rem',
							}}
						>
							Archive
						</p>
						<h1
							style={{
								fontSize: 'clamp(2rem, 6vw, 3.5rem)',
								fontWeight: 700,
								color: '#1e293b',
								lineHeight: 1.1,
								margin: 0,
								letterSpacing: '-0.02em',
							}}
						>
							All Articles
						</h1>
						<p
							style={{
								fontSize: '1rem',
								color: '#64748b',
								marginTop: '1rem',
								maxWidth: '400px',
							}}
						>
							A collection of articles I've read and recommend
						</p>

						{/* Category Filter */}
						<div
							style={{
								display: 'flex',
								gap: '0.5rem',
								marginTop: '1.5rem',
								padding: '0.25rem',
								background: 'rgba(255, 255, 255, 0.5)',
								backdropFilter: 'blur(10px)',
								borderRadius: '12px',
								width: 'fit-content',
							}}
						>
							<button
								type='button'
								onClick={() => setFilter('all')}
								style={{
									padding: '0.5rem 1rem',
									background: filter === 'all' ? 'white' : 'transparent',
									border: 'none',
									borderRadius: '8px',
									fontSize: '0.8rem',
									fontWeight: 500,
									fontFamily: "'Poppins', sans-serif",
									color: filter === 'all' ? '#6366f1' : '#64748b',
									cursor: 'pointer',
									transition: 'all 0.2s',
									boxShadow:
										filter === 'all' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
								}}
							>
								All
							</button>
							<button
								type='button'
								onClick={() => setFilter('frontend')}
								style={{
									padding: '0.5rem 1rem',
									background: filter === 'frontend' ? 'white' : 'transparent',
									border: 'none',
									borderRadius: '8px',
									fontSize: '0.8rem',
									fontWeight: 500,
									fontFamily: "'Poppins', sans-serif",
									color: filter === 'frontend' ? '#6366f1' : '#64748b',
									cursor: 'pointer',
									transition: 'all 0.2s',
									boxShadow:
										filter === 'frontend'
											? '0 2px 8px rgba(0,0,0,0.08)'
											: 'none',
								}}
							>
								Frontend
							</button>
							<button
								type='button'
								onClick={() => setFilter('ai')}
								style={{
									padding: '0.5rem 1rem',
									background: filter === 'ai' ? 'white' : 'transparent',
									border: 'none',
									borderRadius: '8px',
									fontSize: '0.8rem',
									fontWeight: 500,
									fontFamily: "'Poppins', sans-serif",
									color: filter === 'ai' ? '#8b5cf6' : '#64748b',
									cursor: 'pointer',
									transition: 'all 0.2s',
									boxShadow:
										filter === 'ai' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
								}}
							>
								AI
							</button>
						</div>
					</div>

					{/* Article List */}
					<div
						style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
					>
						{isLoading ? (
							<div style={{ textAlign: 'center', padding: '2rem' }}>
								<span style={{ color: '#64748b' }}>Loading articles...</span>
							</div>
						) : articles.length === 0 ? (
							<div style={{ textAlign: 'center', padding: '2rem' }}>
								<span style={{ color: '#64748b' }}>No articles found.</span>
							</div>
						) : (
							articles.map((article, index) => (
								<Link
									key={article.id}
									to='/articles/$id'
									params={{ id: article.id }}
									style={{ textDecoration: 'none' }}
								>
									<article
										style={{
											padding: '1.5rem',
											background: 'rgba(255, 255, 255, 0.6)',
											backdropFilter: 'blur(20px)',
											borderRadius: '16px',
											border: '1px solid rgba(139, 92, 246, 0.08)',
											transition: 'all 0.3s ease',
											cursor: 'pointer',
											display: 'grid',
											gridTemplateColumns: 'auto 1fr auto',
											gap: '1.5rem',
											alignItems: 'center',
										}}
										onMouseEnter={(e) => {
											e.currentTarget.style.background =
												'rgba(255, 255, 255, 0.85)';
											e.currentTarget.style.transform = 'translateY(-2px)';
											e.currentTarget.style.boxShadow =
												'0 12px 40px rgba(99, 102, 241, 0.1)';
											e.currentTarget.style.borderColor =
												'rgba(139, 92, 246, 0.15)';
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.background =
												'rgba(255, 255, 255, 0.6)';
											e.currentTarget.style.transform = 'translateY(0)';
											e.currentTarget.style.boxShadow = 'none';
											e.currentTarget.style.borderColor =
												'rgba(139, 92, 246, 0.08)';
										}}
									>
										{/* Number */}
										<span
											style={{
												fontSize: '0.8rem',
												fontWeight: 600,
												color: '#94a3b8',
												fontVariantNumeric: 'tabular-nums',
											}}
										>
											{String(index + 1).padStart(2, '0')}
										</span>

										{/* Content */}
										<div>
											<div
												style={{
													display: 'flex',
													alignItems: 'center',
													gap: '0.75rem',
													marginBottom: '0.5rem',
												}}
											>
												<span
													style={{
														fontSize: '0.7rem',
														fontWeight: 600,
														color:
															article.category === 'ai' ? '#8b5cf6' : '#6366f1',
														textTransform: 'uppercase',
														letterSpacing: '0.05em',
													}}
												>
													{article.category}
												</span>
												<span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
													{formatDate(article.published_at)}
												</span>
											</div>
											<h3
												style={{
													fontSize: '1.1rem',
													fontWeight: 600,
													color: '#1e293b',
													margin: 0,
													marginBottom: '0.25rem',
												}}
											>
												{article.title}
											</h3>
											<p
												style={{
													fontSize: '0.85rem',
													color: '#64748b',
													margin: 0,
												}}
											>
												{article.summary}
											</p>
										</div>

										{/* Arrow */}
										<span
											style={{
												fontSize: '1.25rem',
												color: '#94a3b8',
												transition: 'transform 0.2s, color 0.2s',
											}}
										>
											→
										</span>
									</article>
								</Link>
							))
						)}
					</div>
				</main>

				{/* Footer */}
				<footer
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						paddingTop: '3rem',
						marginTop: '3rem',
						borderTop: '1px solid rgba(148, 163, 184, 0.1)',
					}}
				>
					<p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
						© 2026 Curated by Jung
					</p>
				</footer>
			</div>
		</div>
	);
}
