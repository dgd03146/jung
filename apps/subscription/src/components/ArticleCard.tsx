import { Link } from '@tanstack/react-router';

interface Article {
	id: string;
	title: string;
	summary: string;
	category: string;
	published_at: string;
	original_url: string;
}

interface ArticleCardProps {
	article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
	return (
		<Link
			to='/articles/$id'
			params={{ id: article.id }}
			style={{ textDecoration: 'none' }}
		>
			<article
				style={{
					background: 'rgba(255, 255, 255, 0.6)',
					backdropFilter: 'blur(10px)',
					borderRadius: '12px',
					padding: '1.25rem 1.5rem',
					transition: 'all 0.2s',
					cursor: 'pointer',
					border: '1px solid rgba(26, 79, 216, 0.08)',
				}}
				onMouseEnter={(e) => {
					e.currentTarget.style.transform = 'translateY(-2px)';
					e.currentTarget.style.boxShadow = '0 8px 30px rgba(26, 79, 216, 0.1)';
					e.currentTarget.style.borderColor = 'rgba(26, 79, 216, 0.15)';
				}}
				onMouseLeave={(e) => {
					e.currentTarget.style.transform = 'translateY(0)';
					e.currentTarget.style.boxShadow = 'none';
					e.currentTarget.style.borderColor = 'rgba(26, 79, 216, 0.08)';
				}}
			>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						marginBottom: '0.5rem',
					}}
				>
					<span
						style={{
							padding: '0.2rem 0.6rem',
							background: 'rgba(26, 79, 216, 0.08)',
							color: '#1a4fd8',
							borderRadius: '4px',
							fontSize: '0.7rem',
							fontWeight: 500,
						}}
					>
						{article.category}
					</span>
					<time style={{ color: '#8fa8d6', fontSize: '0.7rem' }}>
						{article.published_at}
					</time>
				</div>

				<h3
					style={{
						fontSize: '1.1rem',
						fontWeight: 600,
						color: '#1a3a6e',
						marginBottom: '0.4rem',
						lineHeight: 1.3,
					}}
				>
					{article.title}
				</h3>

				<p
					style={{
						color: '#5a7aa8',
						fontSize: '0.8rem',
						lineHeight: 1.5,
						display: '-webkit-box',
						WebkitLineClamp: 2,
						WebkitBoxOrient: 'vertical',
						overflow: 'hidden',
					}}
				>
					{article.summary}
				</p>
			</article>
		</Link>
	);
}
