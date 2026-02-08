import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/')({
	component: HomePage,
});

function HomePage() {
	const [email, setEmail] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [subscribeMethod, setSubscribeMethod] = useState<'email' | 'kakao'>(
		'email',
	);
	const [category, setCategory] = useState<'frontend' | 'ai' | 'both'>('both');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		await new Promise((resolve) => setTimeout(resolve, 1000));
		setIsSuccess(true);
		setIsSubmitting(false);
	};

	const handleKakaoSubscribe = async () => {
		setIsSubmitting(true);
		// Phase 2: Redirect to Kakao Channel or open Kakao login
		await new Promise((resolve) => setTimeout(resolve, 1000));
		setIsSuccess(true);
		setIsSubmitting(false);
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
					top: '-20%',
					right: '-10%',
					width: '60vw',
					height: '60vw',
					maxWidth: '800px',
					maxHeight: '800px',
					background:
						'radial-gradient(circle, rgba(147, 112, 219, 0.15) 0%, transparent 70%)',
					filter: 'blur(60px)',
					borderRadius: '50%',
				}}
			/>
			<div
				style={{
					position: 'absolute',
					bottom: '-10%',
					left: '-15%',
					width: '50vw',
					height: '50vw',
					maxWidth: '600px',
					maxHeight: '600px',
					background:
						'radial-gradient(circle, rgba(100, 149, 237, 0.12) 0%, transparent 70%)',
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
					maxWidth: '1400px',
					margin: '0 auto',
				}}
			>
				{/* Header */}
				<header
					style={{
						display: 'flex',
						justifyContent: 'flex-end',
						alignItems: 'center',
						paddingBottom: '2rem',
					}}
				>
					<nav>
						<Link
							to='/articles'
							style={{
								fontSize: '0.85rem',
								color: '#475569',
								textDecoration: 'none',
								fontWeight: 500,
								transition: 'color 0.2s',
							}}
						>
							Articles
						</Link>
					</nav>
				</header>

				{/* Main Content */}
				<main
					style={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						gap: '3rem',
					}}
				>
					{/* Hero Section */}
					<div style={{ maxWidth: '1100px' }}>
						<p
							style={{
								fontSize: '0.85rem',
								fontWeight: 500,
								color: '#8b5cf6',
								letterSpacing: '0.1em',
								textTransform: 'uppercase',
								marginBottom: '1.5rem',
							}}
						>
							Level Up Weekly
						</p>
						<h1
							style={{
								fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
								fontWeight: 700,
								color: '#1e293b',
								lineHeight: 1.1,
								margin: 0,
								letterSpacing: '-0.03em',
							}}
						>
							Articles That
							<br />
							<span
								style={{
									background:
										'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
									WebkitBackgroundClip: 'text',
									WebkitTextFillColor: 'transparent',
									backgroundClip: 'text',
									display: 'inline-block',
									paddingBottom: '0.1em',
								}}
							>
								Actually Help
							</span>
						</h1>
						<p
							style={{
								fontSize: 'clamp(1rem, 2vw, 1.25rem)',
								color: '#64748b',
								lineHeight: 1.6,
								marginTop: '1.5rem',
								maxWidth: '700px',
							}}
						>
							Hand-picked reads for developers who want to grow.
						</p>
					</div>

					{/* Subscribe Form - Glassmorphism */}
					<div id='subscribe' style={{ maxWidth: '480px' }}>
						{isSuccess ? (
							<div
								style={{
									padding: '1.25rem 1.75rem',
									background: 'rgba(255, 255, 255, 0.7)',
									backdropFilter: 'blur(20px)',
									borderRadius: '16px',
									border: '1px solid rgba(139, 92, 246, 0.2)',
									boxShadow: '0 8px 32px rgba(99, 102, 241, 0.1)',
								}}
							>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										gap: '0.75rem',
									}}
								>
									<div
										style={{
											width: '24px',
											height: '24px',
											borderRadius: '50%',
											background:
												subscribeMethod === 'kakao'
													? '#FEE500'
													: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											color: subscribeMethod === 'kakao' ? '#3C1E1E' : 'white',
											fontSize: '0.75rem',
										}}
									>
										✓
									</div>
									<span
										style={{
											fontSize: '0.95rem',
											color: '#1e293b',
											fontWeight: 500,
										}}
									>
										Thanks for subscribing!
									</span>
								</div>
							</div>
						) : (
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									gap: '1rem',
								}}
							>
								{/* Method Toggle */}
								<div
									style={{
										display: 'flex',
										gap: '0.5rem',
										padding: '0.25rem',
										background: 'rgba(255, 255, 255, 0.5)',
										backdropFilter: 'blur(10px)',
										borderRadius: '12px',
										width: 'fit-content',
									}}
								>
									<button
										type='button'
										onClick={() => setSubscribeMethod('email')}
										style={{
											padding: '0.5rem 1rem',
											background:
												subscribeMethod === 'email' ? 'white' : 'transparent',
											border: 'none',
											borderRadius: '8px',
											fontSize: '0.8rem',
											fontWeight: 500,
											fontFamily: "'Poppins', sans-serif",
											color:
												subscribeMethod === 'email' ? '#6366f1' : '#64748b',
											cursor: 'pointer',
											transition: 'all 0.2s',
											boxShadow:
												subscribeMethod === 'email'
													? '0 2px 8px rgba(0,0,0,0.08)'
													: 'none',
										}}
									>
										Email
									</button>
									<button
										type='button'
										onClick={() => setSubscribeMethod('kakao')}
										style={{
											padding: '0.5rem 1rem',
											background:
												subscribeMethod === 'kakao' ? 'white' : 'transparent',
											border: 'none',
											borderRadius: '8px',
											fontSize: '0.8rem',
											fontWeight: 500,
											fontFamily: "'Poppins', sans-serif",
											color:
												subscribeMethod === 'kakao' ? '#3C1E1E' : '#64748b',
											cursor: 'pointer',
											transition: 'all 0.2s',
											boxShadow:
												subscribeMethod === 'kakao'
													? '0 2px 8px rgba(0,0,0,0.08)'
													: 'none',
											display: 'flex',
											alignItems: 'center',
											gap: '0.4rem',
										}}
									>
										<svg
											width='16'
											height='16'
											viewBox='0 0 24 24'
											fill='currentColor'
											aria-hidden='true'
										>
											<path d='M12 3C6.48 3 2 6.58 2 11c0 2.8 1.86 5.25 4.64 6.64-.15.54-.54 1.96-.62 2.27-.1.38.14.38.29.27.12-.08 1.87-1.26 2.63-1.77.7.1 1.4.15 2.06.15 5.52 0 10-3.58 10-8 0-4.42-4.48-8-10-8z' />
										</svg>
										KakaoTalk
									</button>
								</div>

								{/* Category Toggle */}
								<div
									style={{
										display: 'flex',
										gap: '0.5rem',
										padding: '0.25rem',
										background: 'rgba(255, 255, 255, 0.5)',
										backdropFilter: 'blur(10px)',
										borderRadius: '12px',
										width: 'fit-content',
									}}
								>
									<button
										type='button'
										onClick={() => setCategory('frontend')}
										style={{
											padding: '0.5rem 1rem',
											background:
												category === 'frontend' ? 'white' : 'transparent',
											border: 'none',
											borderRadius: '8px',
											fontSize: '0.8rem',
											fontWeight: 500,
											fontFamily: "'Poppins', sans-serif",
											color: category === 'frontend' ? '#6366f1' : '#64748b',
											cursor: 'pointer',
											transition: 'all 0.2s',
											boxShadow:
												category === 'frontend'
													? '0 2px 8px rgba(0,0,0,0.08)'
													: 'none',
										}}
									>
										Frontend
									</button>
									<button
										type='button'
										onClick={() => setCategory('ai')}
										style={{
											padding: '0.5rem 1rem',
											background: category === 'ai' ? 'white' : 'transparent',
											border: 'none',
											borderRadius: '8px',
											fontSize: '0.8rem',
											fontWeight: 500,
											fontFamily: "'Poppins', sans-serif",
											color: category === 'ai' ? '#8b5cf6' : '#64748b',
											cursor: 'pointer',
											transition: 'all 0.2s',
											boxShadow:
												category === 'ai'
													? '0 2px 8px rgba(0,0,0,0.08)'
													: 'none',
										}}
									>
										AI
									</button>
									<button
										type='button'
										onClick={() => setCategory('both')}
										style={{
											padding: '0.5rem 1rem',
											background: category === 'both' ? 'white' : 'transparent',
											border: 'none',
											borderRadius: '8px',
											fontSize: '0.8rem',
											fontWeight: 500,
											fontFamily: "'Poppins', sans-serif",
											color: category === 'both' ? '#6366f1' : '#64748b',
											cursor: 'pointer',
											transition: 'all 0.2s',
											boxShadow:
												category === 'both'
													? '0 2px 8px rgba(0,0,0,0.08)'
													: 'none',
										}}
									>
										Both
									</button>
								</div>

								{/* Email Form */}
								{subscribeMethod === 'email' ? (
									<form onSubmit={handleSubmit}>
										<div
											style={{
												display: 'flex',
												alignItems: 'center',
												gap: '0.5rem',
												padding: '0.5rem 0.5rem 0.5rem 1.5rem',
												background: 'rgba(255, 255, 255, 0.7)',
												backdropFilter: 'blur(20px)',
												borderRadius: '16px',
												border: '1px solid rgba(139, 92, 246, 0.15)',
												boxShadow: '0 8px 32px rgba(99, 102, 241, 0.08)',
												transition: 'all 0.3s ease',
											}}
										>
											<input
												type='email'
												placeholder='your@email.com'
												value={email}
												onChange={(e) => setEmail(e.target.value)}
												required
												style={{
													flex: 1,
													border: 'none',
													background: 'transparent',
													fontSize: '0.95rem',
													color: '#1e293b',
													outline: 'none',
													minWidth: '180px',
													fontFamily: "'Poppins', sans-serif",
												}}
											/>
											<button
												type='submit'
												disabled={isSubmitting}
												style={{
													padding: '0.875rem 1.5rem',
													background:
														'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
													color: 'white',
													border: 'none',
													borderRadius: '12px',
													fontSize: '0.9rem',
													fontWeight: 600,
													fontFamily: "'Poppins', sans-serif",
													cursor: isSubmitting ? 'not-allowed' : 'pointer',
													opacity: isSubmitting ? 0.7 : 1,
													whiteSpace: 'nowrap',
													transition: 'transform 0.2s, box-shadow 0.2s',
													boxShadow: '0 4px 14px rgba(99, 102, 241, 0.25)',
												}}
												onMouseEnter={(e) => {
													if (!isSubmitting) {
														e.currentTarget.style.transform =
															'translateY(-1px)';
														e.currentTarget.style.boxShadow =
															'0 6px 20px rgba(99, 102, 241, 0.35)';
													}
												}}
												onMouseLeave={(e) => {
													e.currentTarget.style.transform = 'translateY(0)';
													e.currentTarget.style.boxShadow =
														'0 4px 14px rgba(99, 102, 241, 0.25)';
												}}
											>
												{isSubmitting ? 'Subscribing...' : 'Subscribe'}
											</button>
										</div>
									</form>
								) : (
									/* Kakao Button */
									<button
										type='button'
										onClick={handleKakaoSubscribe}
										disabled={isSubmitting}
										style={{
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											gap: '0.75rem',
											padding: '1rem 2rem',
											background: '#FEE500',
											color: '#3C1E1E',
											border: 'none',
											borderRadius: '16px',
											fontSize: '0.95rem',
											fontWeight: 600,
											fontFamily: "'Poppins', sans-serif",
											cursor: isSubmitting ? 'not-allowed' : 'pointer',
											opacity: isSubmitting ? 0.7 : 1,
											transition: 'transform 0.2s, box-shadow 0.2s',
											boxShadow: '0 4px 14px rgba(254, 229, 0, 0.3)',
										}}
										onMouseEnter={(e) => {
											if (!isSubmitting) {
												e.currentTarget.style.transform = 'translateY(-1px)';
												e.currentTarget.style.boxShadow =
													'0 6px 20px rgba(254, 229, 0, 0.4)';
											}
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.transform = 'translateY(0)';
											e.currentTarget.style.boxShadow =
												'0 4px 14px rgba(254, 229, 0, 0.3)';
										}}
									>
										<svg
											width='20'
											height='20'
											viewBox='0 0 24 24'
											fill='currentColor'
											aria-hidden='true'
										>
											<path d='M12 3C6.48 3 2 6.58 2 11c0 2.8 1.86 5.25 4.64 6.64-.15.54-.54 1.96-.62 2.27-.1.38.14.38.29.27.12-.08 1.87-1.26 2.63-1.77.7.1 1.4.15 2.06.15 5.52 0 10-3.58 10-8 0-4.42-4.48-8-10-8z' />
										</svg>
										{isSubmitting ? 'Connecting...' : 'Subscribe via KakaoTalk'}
									</button>
								)}

								<p
									style={{
										fontSize: '0.8rem',
										color: '#94a3b8',
										paddingLeft: '0.25rem',
									}}
								>
									No spam · Unsubscribe anytime
								</p>
							</div>
						)}
					</div>
				</main>

				{/* Footer */}
				<footer
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						paddingTop: '2rem',
						borderTop: '1px solid rgba(148, 163, 184, 0.1)',
					}}
				>
					<p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
						© 2026 Curated by Jung
					</p>
					<Link
						to='/unsubscribe'
						style={{
							fontSize: '0.8rem',
							color: '#64748b',
							textDecoration: 'none',
						}}
					>
						Unsubscribe
					</Link>
				</footer>
			</div>
		</div>
	);
}
