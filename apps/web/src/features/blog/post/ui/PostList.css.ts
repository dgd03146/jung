import { palette } from '@jung/design-system/tokens';
import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const fadeIn = keyframes({
	from: {
		opacity: 0,
		transform: 'scale(0.8)',
	},
	to: {
		opacity: 1,
		transform: 'scale(1)',
	},
});

export const postList = recipe({
	base: {
		width: '100%',
	},
	variants: {
		viewMode: {
			list: {
				display: 'flex',
				flexDirection: 'column',
			},
			grid: {
				padding: '24px 0',
				display: 'grid',
				gap: '20px',
				gridTemplateColumns: ' repeat(3	, 1fr) ',
				'@media': {
					'(max-width: 1024px)': {
						padding: '12px 0',
						gridTemplateColumns: ' repeat(2, 1fr) ',
					},
					'(max-width: 768px)': {
						gridTemplateColumns: ' repeat(1, 1fr) ',
					},
				},
			},
			table: {
				display: 'flex',
				flexDirection: 'column',
				gap: '2px',

				margin: '0 auto',

				borderRadius: '8px',
				padding: '12px 0',
				'@media': {
					'(max-width: 1024px)': {
						padding: '8px 0',
					},
					'(max-width: 768px)': {
						padding: '4px 0',
					},
				},
			},
		},
	},
});

export const postCard = recipe({
	base: {
		cursor: 'pointer',
		transition: 'all 0.3s ease',
	},
	variants: {
		viewMode: {
			list: {
				display: 'flex',
				gap: '40px',
				padding: '24px 0',
				borderBottom: `1px solid ${palette.primary50}`,

				transition: 'all 0.3s ease',
				position: 'relative',
				':hover': {
					backgroundColor: 'rgba(1, 66, 192, 0.03)',
					transform: 'translateX(8px)',
				},
				'@media': {
					'(max-width: 768px)': {
						gap: '16px',
						padding: '18px 0',
					},
				},
			},
			grid: {
				display: 'flex',
				flexDirection: 'column',
				borderRadius: '8px',
				border: '1px solid rgba(1, 66, 192, 0.08)',
				overflow: 'hidden',
				transition: 'all 0.3s ease',
				':hover': {
					transform: 'translateY(-4px)',
					boxShadow: '0 12px 24px rgba(1, 66, 192, 0.06)',
					borderColor: 'rgba(1, 66, 192, 0.12)',
				},
			},
			table: {
				display: 'flex',
				alignItems: 'center',

				gap: '1rem',
				padding: '12px 0',
				backgroundColor: 'white',
				borderRadius: '4px',

				transition: 'all 0.3s ease',
				':hover': {
					backgroundColor: 'rgba(1, 66, 192, 0.02)',
					transform: 'translateX(4px)',
				},
				borderBottom: `1px solid ${palette.primary50}`,
			},
		},
	},
});

export const contentArea = recipe({
	base: {},
	variants: {
		viewMode: {
			list: {
				order: 0,
			},
			grid: {
				padding: '10px',
			},
		},
	},
});

export const category = style({
	fontFamily: 'var(--font-bebas)',
	// letterSpacing: '0.04em',
	backgroundColor: palette.primary50,
	padding: '2px 8px',
	borderRadius: '4px',
});

export const imageArea = recipe({
	base: {
		position: 'relative',
		overflow: 'hidden',
		borderRadius: '8px',
		backgroundColor: '#f8f9fa',
		transition: 'transform 0.3s ease',
	},
	variants: {
		viewMode: {
			list: {
				width: '200px',
				height: 'auto',
				maxInlineSize: '200px',
				blockSize: 'auto',
				aspectRatio: '5/4',
				'@media': {
					'(max-width: 1024px)': {
						width: '200px',
						maxInlineSize: '200px',
						blockSize: 'auto',
						aspectRatio: '5/4',
					},
					'(max-width: 768px)': {
						width: '180px',
						maxInlineSize: '100%',
						height: 'auto',
						aspectRatio: '16/9',
					},
				},
			},
			grid: {
				width: 'auto',
				height: 'auto',
				borderRadius: '8px 8px 0 0',
				blockSize: 'auto',
				aspectRatio: '16/9',
				'@media': {
					'(max-width: 1024px)': {},
				},
			},
			table: {},
		},
	},
});

export const cardWrapper = style({
	display: 'block',
	width: '100%',
	textDecoration: 'none',
	transition: 'all 0.3s ease',

	':hover': {
		transform: 'translateY(-4px)',
	},
});

export const tableNumber = style({
	selectors: {
		'article:hover &': {
			opacity: 0,
			transform: 'scale(0.8)',
		},
	},
});

export const playButton = style({
	transform: 'scale(0.8)',

	selectors: {
		'article:hover &': {
			opacity: 1,
			transform: 'scale(1)',
			animation: `${fadeIn} 0.2s ease`,
		},
	},
});

export const postLink = style({
	display: 'contents',
	textDecoration: 'none',
	color: 'inherit',
});
