import { mediaQueries, palette } from '@jung/design-system/tokens';
import { keyframes } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const slideUpAnimation = keyframes({
	'0%': { transform: 'translateY(100%)' },
	'100%': { transform: 'translateY(0)' },
});

export const placeList = recipe({
	base: {},

	variants: {
		variant: {
			grid: {
				display: 'grid',
				gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
				gap: '24px',
				'@media': {
					[mediaQueries.tablet]: {
						gap: '16px',
						gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
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
