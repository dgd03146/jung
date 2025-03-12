import { sprinkles } from '@jung/design-system/styles';
import { keyframes, style } from '@vanilla-extract/css';

const shimmer = keyframes({
	'0%': { backgroundPosition: '-468px 0' },
	'100%': { backgroundPosition: '468px 0' },
});

export const skeletonTag = style([
	sprinkles({
		borderRadius: 'full',
		padding: '2',
	}),
	{
		width: '80px',
		height: '32px',
		background: '#E2E8F0',
		backgroundImage:
			'linear-gradient(to right, #E2E8F0 0%, #EDF2F7 20%, #E2E8F0 40%, #E2E8F0 100%)',
		backgroundSize: '800px 104px',
		animationDuration: '1.5s',
		animationFillMode: 'forwards',
		animationIterationCount: 'infinite',
		animationName: shimmer,
		animationTimingFunction: 'linear',
	},
]);

export const container = style([
	sprinkles({
		padding: {
			mobile: '3', // 12px
			tablet: '4', // 16px
		},
		gap: {
			mobile: '2', // 8px
			tablet: '3', // 12px
		},
		marginTop: {
			mobile: '2', // 8px
			tablet: '4', // 16px
		},
		position: 'relative',
		display: 'flex',
		flexWrap: 'wrap',
		margin: 'auto',
		overflow: 'auto',
		width: 'full',
	}),
	{
		scrollbarWidth: 'none',
		'::-webkit-scrollbar': {
			display: 'none',
		},
		borderTop: '1px solid #E2E8F0',
		borderBottom: '1px solid #E2E8F0',
	},
]);
