import { palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';

export const likeButton = style({
	width: '28px',
	height: '28px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: 'rgba(255, 255, 255, 0.6)',
	borderRadius: '50%',
	border: 'none',
	cursor: 'pointer',
	transition: 'all 0.2s ease',
	color: palette.primary,
	backdropFilter: 'blur(4px)',

	':hover': {
		transform: 'scale(1.1)',
		backgroundColor: 'rgba(255, 255, 255, 0.9)',
		color: palette.primary,
	},

	':active': {
		transform: 'scale(0.95)',
	},
});
