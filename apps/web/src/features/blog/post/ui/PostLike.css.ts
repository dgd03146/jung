import { palette } from '@jung/design-system/tokens';
import { style } from '@vanilla-extract/css';

export const likeButton = style({
	width: '32px',
	height: '32px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: 'rgba(1, 66, 192, 0.05)',
	borderRadius: '10px',
	border: 'none',
	color: palette.primary,
	transition: 'all 0.2s ease',
	cursor: 'pointer',

	':hover': {
		backgroundColor: 'rgba(1, 66, 192, 0.1)',
		color: palette.primary200,
		transform: 'translateY(-1px)',
		boxShadow: '0 4px 12px rgba(1, 66, 192, 0.08)',
	},
});

export const likeCount = style({
	fontSize: '14px',
	fontWeight: '400',
});
