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
				boxShadow: '0 12px 24px rgba(1, 66, 192, 0.06)',
				// border: '1px solid rgba(1, 66, 192, 0.08)',
				overflow: 'hidden',

				':hover': {
					transition: 'all 0.3s ease',
					transform: 'translateY(-4px)',
					backgroundColor: 'rgba(1, 66, 192, 0.03)',
					// boxShadow: '0 12px 24px rgba(1, 66, 192, 0.06)',
					// borderColor: 'rgba(1, 66, 192, 0.12)',
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

export const postLink = style({
	display: 'contents',
	textDecoration: 'none',
	color: 'inherit',
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

				'@media': {
					'(max-width: 1024px)': {
						width: '200px',
						maxInlineSize: '200px',
						blockSize: 'auto',
					},
					'(max-width: 768px)': {
						width: '180px',
						maxInlineSize: '100%',
						height: 'auto',
					},
				},
			},
			grid: {
				width: 'auto',
				height: 'auto',
				borderRadius: '8px 8px 0 0',
				blockSize: 'auto',
				aspectRatio: '1.618/1',
				'@media': {
					'(max-width: 1024px)': {},
				},
			},
			table: {},
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

			table: {},
		},
	},
});

export const category = style({
	fontFamily: 'var(--font-bebas)',

	padding: '2px 8px',
	borderRadius: '4px',
});

export const tableNumber = style({
	transition: 'transform 0.15s ease, opacity 0.15s ease',
	selectors: {
		'article:hover &': {
			opacity: 0,
			transform: 'scale(0.8)',
		},
	},
});

export const playButton = style({
	transform: 'scale(0.8)',
	opacity: 0,
	transition: 'transform 0.15s ease, opacity 0.15s ease',

	selectors: {
		'article:hover &': {
			opacity: 1,
			transform: 'scale(1)',
			animation: `${fadeIn} 0.2s ease`,
		},
	},
});

export const title = style({
	transition: 'color 0.15s ease',
	':hover': {
		color: palette.primary,
	},
});
