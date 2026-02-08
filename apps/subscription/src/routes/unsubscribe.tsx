import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/unsubscribe')({
	component: UnsubscribePage,
});

function UnsubscribePage() {
	const [isUnsubscribed, setIsUnsubscribed] = useState(false);
	const [email, setEmail] = useState('');

	const handleUnsubscribe = (e: React.FormEvent) => {
		e.preventDefault();
		// Will be replaced with actual API call in Phase 2
		setIsUnsubscribed(true);
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
									background: 'rgba(255, 255, 255, 0.7)',
									backdropFilter: 'blur(20px)',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									fontSize: '1.5rem',
									border: '1px solid rgba(139, 92, 246, 0.15)',
								}}
							>
								✓
							</div>
							<h1
								style={{
									fontSize: '1.5rem',
									fontWeight: 700,
									color: '#1e293b',
									marginBottom: '0.75rem',
								}}
							>
								Unsubscribed
							</h1>
							<p
								style={{
									color: '#64748b',
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
									color: '#1e293b',
									marginBottom: '0.5rem',
								}}
							>
								Unsubscribe
							</h1>
							<p
								style={{
									color: '#64748b',
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
										background: 'rgba(255, 255, 255, 0.7)',
										backdropFilter: 'blur(20px)',
										borderRadius: '16px',
										border: '1px solid rgba(139, 92, 246, 0.1)',
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
											border: '1px solid rgba(139, 92, 246, 0.15)',
											borderRadius: '12px',
											fontSize: '0.95rem',
											marginBottom: '1rem',
											outline: 'none',
											background: 'rgba(255, 255, 255, 0.8)',
											color: '#1e293b',
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
											cursor: 'pointer',
											transition: 'all 0.2s',
										}}
										onMouseEnter={(e) => {
											e.currentTarget.style.background = '#dc2626';
											e.currentTarget.style.transform = 'translateY(-1px)';
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.background = '#ef4444';
											e.currentTarget.style.transform = 'translateY(0)';
										}}
									>
										Unsubscribe
									</button>
								</div>
							</form>

							<Link
								to='/'
								style={{
									display: 'inline-block',
									color: '#64748b',
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
