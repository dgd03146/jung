import { mediaQueries, palette } from '@jung/design-system/tokens';
import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const slideUpAnimation = keyframes({
	'0%': { transform: 'translateY(100%)' },
	'100%': { transform: 'translateY(0)' },
});

export const masonryItem = style({
	breakInside: 'avoid',
	marginBottom: '24px',
});

export const featuredItem = style({
	columnSpan: 'all',
	marginBottom: '24px',
});

export const masonryGrid = style({
	columns: 1,
	columnGap: '24px',
	'@media': {
		[mediaQueries.tablet]: {
			columns: 2,
		},
	},
});

export const placeList = recipe({
	base: {},

	variants: {
		variant: {
			masonry: {
				columns: 1,
				columnGap: '24px',
				'@media': {
					'screen and (min-width: 640px)': {
						columns: 2,
					},
					'screen and (min-width: 1280px)': {
						columns: 3,
					},
				},
			},
			grid: {
				display: 'grid',
				gridTemplateColumns: '1fr',
				gap: '32px',
				'@media': {
					'screen and (min-width: 768px)': {
						gridTemplateColumns: 'repeat(2, 1fr)',
						gap: '40px',
					},
				},
			},
			slideUp: {
				position: 'absolute',
				bottom: 0,
				left: 0,
				right: 0,
				height: 'calc(100dvh - 220px)',
				backgroundColor: palette.white,
				borderRadius: '20px 20px 0 0',
				boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.1)',
				padding: '20px',
				overflowY: 'auto',
				zIndex: 2,
				animation: `${slideUpAnimation} 0.3s ease-out`,
				flexDirection: 'column',
				'@media': {
					'screen and (min-width: 1920px)': {
						left: '20px',
						maxWidth: '400px',
						height: 'calc(100dvh - 260px)',
						borderRadius: '20px',
						margin: '20px',
					},
					'screen and (min-width: 1440px) and (max-width: 1919px)': {
						left: '20px',
						maxWidth: '400px',
						height: 'calc(100dvh - 240px)',
						borderRadius: '20px',
						margin: '20px',
					},
					'screen and (min-width: 768px) and (max-width: 1439px)': {
						left: '20px',
						maxWidth: '400px',
						height: 'calc(100dvh - 220px)',
						borderRadius: '20px',
						margin: '20px',
					},
					'screen and (max-width: 768px)': {
						height: 'calc(100dvh - 260px)',
					},
					'screen and (max-width: 480px)': {
						height: 'calc(100dvh - 280px)',
					},
				},
			},
		},
	},

	defaultVariants: {
		variant: 'grid',
	},
});
