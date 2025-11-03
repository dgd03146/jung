import { palette } from '@jung/design-system/tokens';
import { keyframes, style } from '@vanilla-extract/css';

const shimmer = keyframes({
	'0%': {
		backgroundPosition: '-468px 0',
	},
	'100%': {
		backgroundPosition: '468px 0',
	},
});

export const skeletonItem = style({
	backgroundImage:
		'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
	backgroundSize: '800px 100%',
	animation: `${shimmer} 1.5s infinite linear`,
});

export const messageCardSkeleton = style({
	borderRadius: '12px',
	padding: '1rem',
	boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
	border: '1px solid #F0F0F0',
	position: 'relative',
	height: '100%',
	background: '#FFFFFF',
	display: 'flex',
	flexDirection: 'column',
});

export const messageEmoji = style([
	skeletonItem,
	{
		position: 'absolute',
		top: '1.5rem',
		right: '1.5rem',
		width: '28px',
		height: '28px',
		borderRadius: '8px',
		backgroundColor: palette.primary50,
	},
]);

export const avatar = style([
	skeletonItem,
	{
		width: '24px',
		height: '24px',
		borderRadius: '50%',
		flexShrink: 0,
	},
]);
