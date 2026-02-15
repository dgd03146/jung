import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { unsubscribe } from '../server/subscribers';

export const Route = createFileRoute('/unsubscribe')({
	component: UnsubscribePage,
});

function UnsubscribePage() {
	const [isUnsubscribed, setIsUnsubscribed] = useState(false);
	const [email, setEmail] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleUnsubscribe = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setError(null);
		try {
			const result = await unsubscribe({ data: { email } });
			if (result.success) {
				setIsUnsubscribed(true);
			} else {
				setError(result.message);
			}
		} catch (err) {
			console.error('Unsubscribe error:', err);
			setError('Something went wrong. Please try again.');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div
			style={{
				minHeight: '100vh',
				background:
					'linear-gradient(135deg, var(--bg-page-from) 0%, var(--bg-page-mid) 50%, var(--bg-page-from) 100%)',
				position: 'relative',
				overflow: 'hidden',
				fontFamily: "'Poppins', sans-serif",
				transition: 'background 0.3s',
			}}
		>
			{/* Grid texture overlay */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					backgroundImage: `
            linear-gradient(var(--grid-color) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)
          `,
					backgroundSize: '60px 60px',
					pointerEvents: 'none',
				}}
			/>

			{/* Soft gradient orb */}
			<div
				style={{
					position: 'absolute',
					bottom: '-20%',
					right: '-10%',
					width: '50vw',
					height: '50vw',
					maxWidth: '500px',
					maxHeight: '500px',
					background:
						'radial-gradient(circle, var(--orb-color) 0%, transparent 70%)',
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
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					padding: 'clamp(1.5rem, 5vw, 3rem)',
				}}
			>
				<div
					style={{
						width: '100%',
						maxWidth: '400px',
						textAlign: 'center',
					}}
				>
					{isUnsubscribed ? (
						<>
							<div
								style={{
									width: '64px',
									height: '64px',
									margin: '0 auto 1.5rem',
									borderRadius: '50%',
									background: 'var(--bg-summary-card)',
									backdropFilter: 'blur(20px)',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									fontSize: '1.5rem',
									border: '1px solid var(--color-border-hover)',
								}}
							>
								✓
							</div>
							<h1
								style={{
									fontSize: '1.5rem',
									fontWeight: 700,
									color: 'var(--color-text)',
									marginBottom: '0.75rem',
								}}
							>
								Unsubscribed
							</h1>
							<p
								style={{
									color: 'var(--color-text-muted)',
									fontSize: '0.95rem',
									marginBottom: '2rem',
									lineHeight: 1.6,
								}}
							>
								You've been unsubscribed.
								<br />
								Hope to see you again!
							</p>
							<Link
								to='/'
								style={{
									color: '#6366f1',
									fontWeight: 600,
									fontSize: '0.9rem',
									textDecoration: 'none',
								}}
							>
								← Back to Home
							</Link>
						</>
					) : (
						<>
							<h1
								style={{
									fontSize: '1.5rem',
									fontWeight: 700,
									color: 'var(--color-text)',
									marginBottom: '0.5rem',
								}}
							>
								Unsubscribe
							</h1>
							<p
								style={{
									color: 'var(--color-text-muted)',
									fontSize: '0.95rem',
									marginBottom: '2rem',
								}}
							>
								Are you sure you want to unsubscribe?
							</p>

							<form onSubmit={handleUnsubscribe}>
								<div
									style={{
										padding: '1.5rem',
										background: 'var(--bg-summary-card)',
										backdropFilter: 'blur(20px)',
										borderRadius: '16px',
										border: '1px solid var(--color-border)',
										marginBottom: '1rem',
									}}
								>
									<input
										type='email'
										placeholder='your@email.com'
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required
										style={{
											width: '100%',
											padding: '0.875rem 1rem',
											border: '1px solid var(--color-border-hover)',
											borderRadius: '12px',
											fontSize: '0.95rem',
											marginBottom: '1rem',
											outline: 'none',
											background: 'var(--bg-card-hover)',
											color: 'var(--color-text)',
											fontFamily: "'Poppins', sans-serif",
											transition: 'border-color 0.2s',
										}}
										onFocus={(e) => {
											e.currentTarget.style.borderColor =
												'rgba(139, 92, 246, 0.4)';
										}}
										onBlur={(e) => {
											e.currentTarget.style.borderColor =
												'rgba(139, 92, 246, 0.15)';
										}}
									/>
									<button
										type='submit'
										disabled={isSubmitting}
										style={{
											width: '100%',
											padding: '0.875rem 1.5rem',
											background: '#ef4444',
											color: 'white',
											border: 'none',
											borderRadius: '12px',
											fontSize: '0.9rem',
											fontWeight: 600,
											fontFamily: "'Poppins', sans-serif",
											cursor: isSubmitting ? 'not-allowed' : 'pointer',
											opacity: isSubmitting ? 0.7 : 1,
											transition: 'all 0.2s',
										}}
										onMouseEnter={(e) => {
											if (!isSubmitting) {
												e.currentTarget.style.background = '#dc2626';
												e.currentTarget.style.transform = 'translateY(-1px)';
											}
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.background = '#ef4444';
											e.currentTarget.style.transform = 'translateY(0)';
										}}
									>
										{isSubmitting ? 'Processing...' : 'Unsubscribe'}
									</button>
								</div>
								{error && (
									<p
										style={{
											color: '#ef4444',
											fontSize: '0.85rem',
											marginTop: '0.5rem',
										}}
									>
										{error}
									</p>
								)}
							</form>

							<Link
								to='/'
								style={{
									display: 'inline-block',
									color: 'var(--color-text-muted)',
									fontSize: '0.85rem',
									textDecoration: 'none',
								}}
							>
								Cancel and go back
							</Link>
						</>
					)}
				</div>
			</div>
		</div>
	);
}
