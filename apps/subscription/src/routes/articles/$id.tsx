import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { type Article, getArticleById } from '../../lib';

export const Route = createFileRoute('/articles/$id')({
	component: ArticleDetailPage,
});

function ArticleDetailPage() {
	const { id } = Route.useParams();
	const [article, setArticle] = useState<Article | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchArticle = async () => {
			setIsLoading(true);
			const data = await getArticleById(id);
			setArticle(data);
			setIsLoading(false);
		};
		fetchArticle();
	}, [id]);

	const formatDate = (dateString: string | null) => {
		if (!dateString) return '';
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	};

	if (isLoading) {
		return (
			<div
				style={{
					minHeight: '100vh',
					background:
						'linear-gradient(135deg, #e8efff 0%, #f0e8ff 50%, #e8f4ff 100%)',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					fontFamily: "'Poppins', sans-serif",
				}}
			>
				<span style={{ color: '#64748b' }}>Loading...</span>
			</div>
		);
	}

	if (!article) {
		return (
			<div
				style={{
					minHeight: '100vh',
					background:
						'linear-gradient(135deg, #e8efff 0%, #f0e8ff 50%, #e8f4ff 100%)',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					fontFamily: "'Poppins', sans-serif",
				}}
			>
				<div style={{ textAlign: 'center' }}>
					<h1
						style={{
							fontSize: '1.5rem',
							fontWeight: 600,
							color: '#1e293b',
							marginBottom: '1rem',
						}}
					>
						Article not found
					</h1>
					<Link
						to='/articles'
						style={{
							color: '#6366f1',
							fontWeight: 500,
							textDecoration: 'none',
						}}
					>
						← Back to Articles
					</Link>
				</div>
			</div>
		);
	}

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

			{/* Soft gradient orb */}
			<div
				style={{
					position: 'absolute',
					top: '20%',
					right: '-15%',
					width: '40vw',
					height: '40vw',
					maxWidth: '500px',
					maxHeight: '500px',
					background:
						'radial-gradient(circle, rgba(147, 112, 219, 0.1) 0%, transparent 70%)',
					filter: 'blur(60px)',
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
					maxWidth: '750px',
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
						to='/articles'
						style={{
							fontSize: '0.85rem',
							color: '#6366f1',
							fontWeight: 500,
							textDecoration: 'none',
							display: 'flex',
							alignItems: 'center',
							gap: '0.5rem',
						}}
					>
						← Back
					</Link>
					<span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
						{formatDate(article.published_at)}
					</span>
				</header>

				{/* Main Content */}
				<main>
					{/* Category & Title */}
					<div style={{ marginBottom: '2.5rem' }}>
						<span
							style={{
								display: 'inline-block',
								fontSize: '0.75rem',
								fontWeight: 600,
								color: article.category === 'ai' ? '#8b5cf6' : '#6366f1',
								textTransform: 'uppercase',
								letterSpacing: '0.1em',
								marginBottom: '1rem',
							}}
						>
							{article.category}
						</span>
						<h1
							style={{
								fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
								fontWeight: 700,
								color: '#1e293b',
								lineHeight: 1.2,
								margin: 0,
								letterSpacing: '-0.02em',
							}}
						>
							{article.title}
						</h1>
					</div>

					{/* Summary Card */}
					<div
						style={{
							padding: '1.5rem',
							background: 'rgba(255, 255, 255, 0.7)',
							backdropFilter: 'blur(20px)',
							borderRadius: '16px',
							borderLeft: '3px solid #6366f1',
							marginBottom: '1.5rem',
						}}
					>
						<h2
							style={{
								fontSize: '0.75rem',
								color: '#6366f1',
								fontWeight: 600,
								textTransform: 'uppercase',
								letterSpacing: '0.1em',
								margin: 0,
								marginBottom: '0.75rem',
							}}
						>
							Summary
						</h2>
						<p
							style={{
								fontSize: '1rem',
								color: '#475569',
								lineHeight: 1.7,
								margin: 0,
							}}
						>
							{article.summary}
						</p>
					</div>

					{/* My Thoughts Card */}
					{article.my_thoughts && (
						<div
							style={{
								padding: '1.5rem',
								background: 'rgba(255, 255, 255, 0.5)',
								backdropFilter: 'blur(20px)',
								borderRadius: '16px',
								marginBottom: '2.5rem',
							}}
						>
							<h2
								style={{
									fontSize: '0.75rem',
									color: '#8b5cf6',
									fontWeight: 600,
									textTransform: 'uppercase',
									letterSpacing: '0.1em',
									margin: 0,
									marginBottom: '0.75rem',
								}}
							>
								My Thoughts
							</h2>
							<p
								style={{
									fontSize: '1rem',
									color: '#1e293b',
									lineHeight: 1.7,
									margin: 0,
								}}
							>
								{article.my_thoughts}
							</p>
						</div>
					)}

					{/* Read Original Button */}
					<a
						href={article.original_url}
						target='_blank'
						rel='noopener noreferrer'
						style={{
							display: 'inline-flex',
							alignItems: 'center',
							gap: '0.5rem',
							padding: '0.875rem 1.5rem',
							background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
							borderRadius: '12px',
							color: 'white',
							fontWeight: 600,
							fontSize: '0.9rem',
							textDecoration: 'none',
							fontFamily: "'Poppins', sans-serif",
							transition: 'all 0.2s',
							boxShadow: '0 4px 14px rgba(99, 102, 241, 0.25)',
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.transform = 'translateY(-1px)';
							e.currentTarget.style.boxShadow =
								'0 6px 20px rgba(99, 102, 241, 0.35)';
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.transform = 'translateY(0)';
							e.currentTarget.style.boxShadow =
								'0 4px 14px rgba(99, 102, 241, 0.25)';
						}}
					>
						Read Original Article
						<span>→</span>
					</a>
				</main>

				{/* Footer */}
				<footer
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						paddingTop: '3rem',
						marginTop: '3rem',
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
