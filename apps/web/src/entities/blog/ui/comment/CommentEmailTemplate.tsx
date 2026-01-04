import type React from 'react';

interface CommentNotificationEmailTemplateProps {
	emailTitle: string;
	mainText: string;
	postUrl: string;
	commentContent?: string;
	commenterName: string;
	createdAt: string;
	buttonText: string;
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
	contentBox: {
		padding: '28px',
	} as React.CSSProperties,
	header: {
		backgroundColor: '#0142C0',
		padding: '20px 28px',
		borderBottom: '1px solid #003399',
	} as React.CSSProperties,
	headerTitle: {
		fontSize: '22px',
		fontWeight: 600,
		color: '#ffffff',
		margin: '0',
		lineHeight: '1.3',
	} as React.CSSProperties,
	authorRow: {
		marginBottom: '12px',
	} as React.CSSProperties,
	authorName: {
		margin: '0',
		fontSize: '16px',
		fontWeight: 600,
		color: '#14171a',
		lineHeight: '1.4',
		display: 'inline-block',
		marginRight: '8px',
	} as React.CSSProperties,
	timestamp: {
		fontSize: '13px',
		color: '#657786',
		lineHeight: '1.4',
		display: 'inline-block',
	} as React.CSSProperties,
	mainText: {
		margin: '0 0 18px',
		fontSize: '15px',
		color: '#292f33',
		lineHeight: '1.5',
	} as React.CSSProperties,
	commentBodyWrapper: {
		marginBottom: '28px',
		borderLeft: '3px solid #e1e4e8',
		paddingLeft: '15px',
		paddingTop: '8px',
		paddingBottom: '8px',
	} as React.CSSProperties,
	commentBody: {
		margin: '0',
		fontSize: '15px',
		color: '#333f4a',
		lineHeight: '1.65',
		whiteSpace: 'pre-wrap',
		wordBreak: 'break-word',
	} as React.CSSProperties,
	buttonWrapper: {
		textAlign: 'center' as const,
		paddingTop: '12px',
	} as React.CSSProperties,
	button: {
		display: 'inline-block',
		backgroundColor: '#0142C0',
		color: '#ffffff',
		padding: '12px 24px',
		borderRadius: '99px',
		textDecoration: 'none',
		fontSize: '15px',
		fontWeight: 600,
		minWidth: '130px',
		border: 'none',
		transition: 'opacity 0.2s ease',
	} as React.CSSProperties,
	footer: {
		backgroundColor: '#f6f8fa',
		padding: '18px 28px',
		borderTop: '1px solid #e1e4e8',
	} as React.CSSProperties,
	footerText: {
		margin: '0',
		fontSize: '12px',
		color: '#657786',
		textAlign: 'center' as const,
		lineHeight: 1.5,
	} as React.CSSProperties,
};

export function CommentNotificationEmailTemplateInline({
	emailTitle,
	mainText,
	postUrl,
	commentContent,
	commenterName,
	createdAt,
	buttonText,
}: CommentNotificationEmailTemplateProps) {
	const commentContentHtml = commentContent
		? commentContent.replace(/\n/g, '<br />')
		: '';

	return (
		<div style={styles.wrapper}>
			<div style={styles.container}>
				<div style={styles.header}>
					<p style={styles.headerTitle}>{emailTitle}</p>
				</div>

				<div style={styles.contentBox}>
					<div style={styles.authorRow}>
						<p style={{ margin: 0 }}>
							<span style={styles.authorName}>{commenterName}</span>
							<span style={styles.timestamp}>{createdAt}</span>
						</p>
					</div>

					<p style={styles.mainText}>{mainText}</p>

					{commentContent && (
						<div style={styles.commentBodyWrapper}>
							<p
								style={styles.commentBody}
								// biome-ignore lint/security/noDangerouslySetInnerHtml: required to render HTML content from sanitized comment
								dangerouslySetInnerHTML={{ __html: commentContentHtml }}
							/>
						</div>
					)}

					<div style={styles.buttonWrapper}>
						<a
							href={postUrl}
							target='_blank'
							rel='noopener noreferrer'
							style={styles.button}
							onMouseOver={(e) => {
								e.currentTarget.style.opacity = '0.85';
							}}
							onMouseOut={(e) => {
								e.currentTarget.style.opacity = '1';
							}}
						>
							{buttonText}
						</a>
					</div>
				</div>

				<div style={styles.footer}>
					<p style={styles.footerText}>
						Jung Archive 알림 메일입니다.
						<br />본 메일은 발신 전용입니다.
					</p>
				</div>
			</div>
		</div>
	);
}
