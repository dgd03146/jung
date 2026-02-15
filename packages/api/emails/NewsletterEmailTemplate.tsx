import type React from 'react';

interface NewsletterEmailTemplateProps {
	article: {
		title: string;
		summary: string;
		my_thoughts: string | null;
		category: string;
		original_url: string;
	};
	unsubscribeUrl: string;
}

const styles = {
	wrapper: {
		backgroundColor: '#f6f8fa',
		padding: '32px',
		margin: '0',
		fontFamily:
			'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
		WebkitFontSmoothing: 'antialiased',
		MozOsxFontSmoothing: 'grayscale',
	} as React.CSSProperties,
	container: {
		maxWidth: '600px',
		margin: '0 auto',
		backgroundColor: '#ffffff',
		border: '1px solid #e1e4e8',
		borderRadius: '8px',
		overflow: 'hidden',
		boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
	} as React.CSSProperties,
	header: {
		backgroundColor: '#0142C0',
		padding: '24px 28px',
		borderBottom: '1px solid #003399',
	} as React.CSSProperties,
	headerTitle: {
		fontSize: '22px',
		fontWeight: 600,
		color: '#ffffff',
		margin: '0',
		lineHeight: '1.3',
	} as React.CSSProperties,
	badge: {
		display: 'inline-block',
		padding: '4px 12px',
		borderRadius: '12px',
		fontSize: '12px',
		fontWeight: 600,
		marginTop: '8px',
	} as React.CSSProperties,
	frontendBadge: {
		backgroundColor: 'rgba(255,255,255,0.2)',
		color: '#ffffff',
	} as React.CSSProperties,
	aiBadge: {
		backgroundColor: 'rgba(255,255,255,0.2)',
		color: '#ffffff',
	} as React.CSSProperties,
	content: {
		padding: '28px',
	} as React.CSSProperties,
	title: {
		fontSize: '20px',
		fontWeight: 600,
		color: '#24292e',
		margin: '0 0 16px',
		lineHeight: 1.4,
	} as React.CSSProperties,
	summary: {
		fontSize: '15px',
		color: '#586069',
		lineHeight: 1.6,
		margin: '0 0 20px',
	} as React.CSSProperties,
	thoughtsLabel: {
		fontSize: '14px',
		fontWeight: 600,
		color: '#24292e',
		margin: '0 0 8px',
	} as React.CSSProperties,
	thoughts: {
		fontSize: '14px',
		color: '#586069',
		lineHeight: 1.6,
		padding: '12px 16px',
		backgroundColor: '#f6f8fa',
		borderLeft: '3px solid #0142C0',
		borderRadius: '4px',
		margin: '0 0 24px',
	} as React.CSSProperties,
	buttonWrapper: {
		textAlign: 'center' as const,
		paddingTop: '12px',
	} as React.CSSProperties,
	button: {
		display: 'inline-block',
		backgroundColor: '#0142C0',
		color: '#ffffff',
		padding: '12px 32px',
		borderRadius: '99px',
		textDecoration: 'none',
		fontSize: '15px',
		fontWeight: 600,
		minWidth: '130px',
		border: 'none',
	} as React.CSSProperties,
	footer: {
		backgroundColor: '#f6f8fa',
		padding: '18px 28px',
		borderTop: '1px solid #e1e4e8',
	} as React.CSSProperties,
	footerText: {
		margin: '0 0 8px',
		fontSize: '12px',
		color: '#657786',
		textAlign: 'center' as const,
		lineHeight: 1.5,
	} as React.CSSProperties,
	unsubscribeLink: {
		color: '#0366d6',
		textDecoration: 'underline',
	} as React.CSSProperties,
};

export function NewsletterEmailTemplate({
	article,
	unsubscribeUrl,
}: NewsletterEmailTemplateProps) {
	const getCategoryBadgeStyle = () => {
		if (article.category === 'frontend') return styles.frontendBadge;
		if (article.category === 'ai') return styles.aiBadge;
		return styles.frontendBadge;
	};

	const getCategoryLabel = () => {
		if (article.category === 'frontend') return 'FRONTEND';
		if (article.category === 'ai') return 'AI';
		return 'FRONTEND & AI';
	};

	const badgeStyle = {
		...styles.badge,
		...getCategoryBadgeStyle(),
	};

	return (
		<div style={styles.wrapper}>
			<div style={styles.container}>
				<div style={styles.header}>
					<p style={styles.headerTitle}>Jung Archive Newsletter</p>
					<span style={badgeStyle}>{getCategoryLabel()}</span>
				</div>

				<div style={styles.content}>
					<h2 style={styles.title}>{article.title}</h2>

					<p style={styles.summary}>{article.summary}</p>

					{article.my_thoughts && (
						<div>
							<p style={styles.thoughtsLabel}>My Thoughts</p>
							<div style={styles.thoughts}>{article.my_thoughts}</div>
						</div>
					)}

					<div style={styles.buttonWrapper}>
						<a
							href={article.original_url}
							target='_blank'
							rel='noopener noreferrer'
							style={styles.button}
						>
							Read Full Article
						</a>
					</div>
				</div>

				<div style={styles.footer}>
					<p style={styles.footerText}>
						You received this email because you subscribed to Jung Archive
						newsletters.
					</p>
					<p
						style={{
							...styles.footerText,
							margin: '0',
						}}
					>
						<a href={unsubscribeUrl} style={styles.unsubscribeLink}>
							Unsubscribe
						</a>
					</p>
				</div>
			</div>
		</div>
	);
}
